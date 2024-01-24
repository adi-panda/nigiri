import { sortLayers } from "./utils";
import { animateLayer } from "./animate";

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
          if (layers[k].name == currentLayer.name) {
            let currLayerPos = currentLayer.property("Position");
            let oldLayerPos = layers[k].layer.property("Position");
            let currLayerScale = currentLayer.property("Scale");
            let oldLayerScale = layers[k].layer.property("Scale");
            let currLayerOpacity = currentLayer.property("Opacity");
            let oldLayerOpacity = layers[k].layer.property("Opacity");
            if (!(currLayerOpacity instanceof Property)) continue;
            if (!(oldLayerOpacity instanceof Property)) continue;
            if (!(currLayerPos instanceof Property)) continue;
            if (!(oldLayerPos instanceof Property)) continue;
            if (!(currLayerScale instanceof Property)) continue;
            if (!(oldLayerScale instanceof Property)) continue;
            let parentLayer = layers[k].layer.parent;
            let actualPosition = oldLayerPos.valueAtTime(15, true);
            if (parentLayer) {
              var childPosition = layers[k].layer.transform.position.value;
              var parentPosition = parentLayer.transform.position.value;
              actualPosition = [
                childPosition[0] + parentPosition[0],
                childPosition[1] + parentPosition[1],
              ];
            }
            currLayerPos.setValueAtTime(0, actualPosition);
            currLayerScale.setValueAtTime(
              0,
              oldLayerScale.valueAtTime(15, false)
            );
            currLayerOpacity.setValueAtTime(
              0,
              oldLayerOpacity.valueAtTime(15, false)
            );
          }
        }
      }
      return;
    }
    if (parentFolder.item(i) == comp) {
      pastCurrentComp = true;
    }
  }
  app.endUndoGroup();
};
