import { getAnimDirection, getLayerProps, sortLayers } from "./utils";
import { animateLayer } from "./animate";
import { slowFastSlow } from "./easeValues";
import { forEachLayer } from "./aeft-utils";

type LayerObj = {
  name: string;
  index: number;
  count: number;
  in: string;
  out: string[];
  prev: string;
  darken: boolean;
};

export const animatePhotoshop = (layerArray: LayerObj[]) => {
  app.beginUndoGroup("Split Comp");
  let comp = app.project.activeItem;
  if (!(comp instanceof CompItem)) return;
  let newFolder = app.project.items.addFolder("Page_" + comp.name);
  if (layerArray.length == 0) layerArray = getPanels();
  let layers = sortLayers(comp, layerArray, newFolder);
  let currentCount = 1;
  let darkenIndex = -1;
  for (let i = 0; i < layers.length; i++) {
    for (let k = 0; k < layers[i].count; k++) {
      let newComp = app.project.items.addComp(
        comp.name + "_" + currentCount,
        1080,
        1920,
        1,
        15,
        24
      );
      newComp.parentFolder = newFolder;
      newComp.layers.addSolid([255, 255, 255], "Background", 1080, 1920, 1);
      for (let j = 0; j <= i; j++) {
        let currentLayer = layers[j].layer;
        if (!(currentLayer instanceof AVLayer)) continue;
        let newLayer = newComp.layers.add(currentLayer.source);
        let newLayerScale = newLayer.property("Scale");
        if (!(newLayerScale instanceof Property)) continue;
        newLayerScale.setValue([
          layers[j].scaleFactor * 100,
          layers[j].scaleFactor * 100,
        ]);
        if (layerArray[i].darken) darkenIndex = i;
        if (i != 0 && k == 0)
          animateLayer(newLayer, i, j, layers, newComp, darkenIndex);
        layers[j].layer = newLayer;
      }
      currentCount++;
    }
  }
  app.endUndoGroup();
  return;
};

export const render = () => {
  for (let i = 1; i <= app.project.numItems; i++) {
    let currentFolder = app.project.item(i);
    if (!(currentFolder instanceof FolderItem)) continue;
    if (currentFolder.name.indexOf("Page_") < 0) continue;
    for (let j = 1; j <= currentFolder.numItems; j++) {
      let currentComp = currentFolder.item(j);
      if (!(currentComp instanceof CompItem)) continue;
      if (currentComp.name === "internal") continue;
      let greatest = 0;
      forEachLayer(currentComp, (layer) => {
        let layerOpacity = layer.property("Opacity");
        if (!(layerOpacity instanceof Property)) return;
        let layerPos = layer.property("Position");
        if (!(layerPos instanceof Property)) return;
        let layerScale = layer.property("Scale");
        if (!(layerScale instanceof Property)) return;
        let greateastTime = 0;
        for (let k = 1; k <= layerOpacity.numKeys; k++) {
          if (layerOpacity.keyTime(k) > greateastTime)
            greateastTime = layerOpacity.keyTime(k);
        }
        for (let k = 1; k <= layerPos.numKeys; k++) {
          if (layerPos.keyTime(k) > greateastTime)
            greateastTime = layerPos.keyTime(k);
        }
        for (let k = 1; k <= layerScale.numKeys; k++) {
          if (layerScale.keyTime(k) > greateastTime)
            greateastTime = layerScale.keyTime(k);
        }
        greatest = Math.max(greatest, greateastTime);
      });
      if (greatest > 0) currentComp.workAreaDuration = greatest;
      else currentComp.workAreaDuration = 1;
      app.project.renderQueue.items.add(currentComp);
    }
  }
};

export const panLayer = () => {
  app.beginUndoGroup("Pan Layer");
  let comp = app.project.activeItem;
  if (!(comp instanceof CompItem)) return;
  let curr = comp.selectedLayers[0];
  if (!(curr instanceof AVLayer)) return;
  let newNull = comp.layers.addNull();
  let newNullPos = newNull.property("Position");
  let currPos = curr.property("Position");
  if (!(currPos instanceof Property)) return;
  if (!(newNullPos instanceof Property)) return;
  let oldPos = currPos.valueAtTime(0, true);
  curr.parent = newNull;
  newNullPos.setValueAtTime(0, [
    1080 - (curr.width * (curr.scale.value[0] / 100)) / 2,
    newNull.position.value[1],
  ]);
  newNullPos.setValueAtTime(6, [
    (curr.width * (curr.scale.value[0] / 100)) / 2,
    newNull.position.value[1],
  ]);
  newNullPos.setTemporalEaseAtKey(1, [slowFastSlow[0]], [slowFastSlow[1]]);
  newNullPos.setTemporalEaseAtKey(2, [slowFastSlow[2]], [slowFastSlow[3]]);
  app.endUndoGroup();
};

export const getPanels = (): LayerObj[] => {
  let comp = app.project.activeItem;
  if (!(comp instanceof CompItem)) return [];
  let layers = [];
  for (let i = 1; i <= comp.numLayers; i++) {
    let out = [];
    for (let j = comp.numLayers; j > i; j--) {
      out.push("up");
    }
    let layerObj = {
      name: comp.layer(i).name,
      index: i,
      count: 1,
      scaleFactor: 1,
      in: "down",
      out: out,
      prev: "keep",
      darken: false,
    };
    layers.push(layerObj);
  }
  return layers;
};

export const updateValues = () => {
  app.beginUndoGroup("Update Values");
  let comp = app.project.activeItem;
  if (!(comp instanceof CompItem)) return;
  let layers = [];
  for (let i = 1; i <= comp.numLayers; i++) {
    let layerObj = {
      name: comp.layer(i).name,
      index: i,
      layer: comp.layer(i),
    };
    layers.push(layerObj);
  }

  const parentFolder = comp.parentFolder;
  let pastCurrentComp = false;
  for (let i = 1; i <= parentFolder.numItems; i++) {
    if (pastCurrentComp) {
      let currentComp = parentFolder.item(i);
      if (!(currentComp instanceof CompItem)) continue;
      for (let j = 1; j <= currentComp.numLayers; j++) {
        let currentLayer = currentComp.layer(j);
        for (let k = 0; k < layers.length; k++) {
          if (layers[k].name !== currentLayer.name) continue;
          const [currOpacity, currPos, currScale] = getLayerProps(currentLayer);
          const [oldOpacity, oldPos, oldScale] = getLayerProps(layers[k].layer);
          let parentLayer = layers[k].layer.parent;
          let actualPosition = oldPos.valueAtTime(15, true);
          if (parentLayer) {
            var childPosition = layers[k].layer.transform.position.value;
            var parentPosition = parentLayer.transform.position.value;
            actualPosition = [
              childPosition[0] + parentPosition[0],
              childPosition[1] + parentPosition[1],
            ];
          }
          const direction = getAnimDirection(currentLayer);
          if (direction == "none") continue;
          let currPosPrev = currPos.valueAtTime(2, true);
          currPos.setValueAtTime(0, actualPosition);
          currScale.setValueAtTime(0, oldScale.valueAtTime(15, false));
          currOpacity.setValueAtTime(0, oldOpacity.valueAtTime(15, false));
          if (direction === "left")
            currPos.setValueAtTime(2, [currPosPrev[0], actualPosition[1]]);
          if (direction === "down") {
            currPos.setValueAtTime(2, [actualPosition[0], currPosPrev[1]]);
          }
        }
      }
      return;
    }
    if (parentFolder.item(i) == comp) pastCurrentComp = true;
  }
  app.endUndoGroup();
};
