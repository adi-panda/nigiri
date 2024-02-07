import {
  getAnimDirection,
  getLayerProps,
  getNumRealLayers,
  getLayers,
} from "./utils";
import { animateLayer, panLayer } from "./animate";
export { panLayer };
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
  let layers = getLayers(comp, layerArray, newFolder);
  let currentCount = 1;
  let darkenIndex = -1;
  let comps = [];
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
      comps.push(newComp);
      newComp.parentFolder = newFolder;
      newComp.layers.addSolid([255, 255, 255], "Background", 1080, 1920, 1);
      const newMarker = new MarkerValue("Anim End");
      newMarker.label = 3;
      newComp.markerProperty.setValueAtTime(2, newMarker);
      for (let j = 0; j <= i; j++) {
        let currentLayer = layers[j].layer;
        if (!(currentLayer instanceof AVLayer)) continue;
        if (i != j && layerArray[j].out[i - 1 - j] === "x") {
          continue;
        }
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
  for (let i = comps.length - 1; i >= 0; i--) {
    comps[i].openInViewer();
  }
  app.endUndoGroup();
  return;
};

export const render = () => {
  let outputFolder = new Folder(app.project.file?.parent.fsName + "/output");
  outputFolder.create();
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
      let newItem = app.project.renderQueue.items.add(currentComp);
      // newItem.outputModule(1).applyTemplate("H.264");
      newItem.outputModule(1).file = new File(
        outputFolder.fsName + "/" + currentComp.name + ".mov"
      );
      newItem
        .outputModule(1)
        .applyTemplate("H.264 - Match Render Settings -  5 Mbps");
    }
  }
};

export const getPanels = (): LayerObj[] => {
  let comp = app.project.activeItem;
  if (!(comp instanceof CompItem)) return [];
  let layers = [];
  const numLayers = getNumRealLayers(comp);
  for (let i = 1; i <= numLayers; i++) {
    if (comp.layer(i).name === "Background") continue;
    let out = [];
    for (let j = numLayers; j > i; j--) {
      out.push("up");
    }
    let inAnim = "down";
    const currLayer = comp.layer(i);
    if (!(currLayer instanceof AVLayer)) continue;
    if (currLayer.height > currLayer.width) {
      inAnim = "left";
      // if (prevLayer) prevLayer.out[0] = "right";
      for (let j = 0; j < layers.length; j++) {
        layers[j].out[i - j - 2] = "right";
      }
    }
    let layerObj = {
      name: comp.layer(i).name,
      index: i,
      count: 1,
      scaleFactor: 1,
      in: inAnim,
      out: out,
      prev: "keep",
      darken: false,
    };
    layers.push(layerObj);
  }
  return layers;
};

export const addAudios = () => {
  //Import all files in the audio folder
  app.beginUndoGroup("Add Audio");
  let audioContainer = app.project.items.addFolder("Voice-Lines");
  let audioFolder = new Folder(app.project.file?.parent.fsName + "/voice-lines");
  let audioFiles = audioFolder.getFiles();
  for (let i = 0; i < audioFiles.length; i++) {
    let currentFile = audioFiles[i];
    if (!(currentFile instanceof File)) continue;
    let audioImport = app.project.importFile(new ImportOptions(currentFile));
    audioImport.parentFolder = audioContainer;
  }
  for (let i = 1; i <= app.project.numItems; i++) {
    let currentFolder = app.project.item(i);
    if (!(currentFolder instanceof FolderItem)) continue;
    if (currentFolder.name.indexOf("Page_") < 0) continue;
    for (let j = 1; j <= currentFolder.numItems; j++) {
      let currentComp = currentFolder.item(j);
      if (!(currentComp instanceof CompItem)) continue;
      if (currentComp.name === "internal") continue;
      for (let k = 1; k <= audioContainer.numItems; k++) {
        let currentAudio = audioContainer.item(k);
        if (!(currentAudio instanceof FootageItem)) continue;
        if (currentAudio.name.indexOf(currentComp.name) < 0) continue;
        currentComp.layers.add(currentAudio);
      }
    }
  }
  app.endUndoGroup();
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
