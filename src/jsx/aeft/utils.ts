export type LayerObj = {
  name: string;
  index: number;
  layer: AVLayer;
  count: number;
  scaleFactor: number;
  pan: boolean;
  in: string;
  out: string;
  prev: string;
  darken: boolean;
  padding: number;
};

export const getLayers = (
  comp: CompItem,
  layerArray: any[],
  parentFold: FolderItem
): LayerObj[] => {
  let layers = [];
  let newComp = app.project.items.addComp("internal", 1080, 1920, 1, 15, 24);
  newComp.parentFolder = parentFold;
  for (let i = 1; i <= comp.numLayers; i++) {
    let currLayer = comp.layer(i);
    if (currLayer.name === "Background") continue;
    if (!(currLayer instanceof AVLayer)) continue;
    let newLayer = newComp.layers.add(currLayer.source);
    const scaleFactor = getScaleFactor(newLayer, newComp, layerArray[i - 1].pan);
    let layerObj = {
      name: comp.layer(i).name,
      index: i,
      layer: newLayer,
      count: layerArray[i - 1].count,
      in: layerArray[i - 1].in,
      out: layerArray[i - 1].out,
      scaleFactor: scaleFactor,
      pan: layerArray[i - 1].pan,
      padding: layerArray[i - 1].padding,
      prev: layerArray[i - 1].prev,
      darken: layerArray[i - 1].darken,
    };
    layers.push(layerObj);
  }
  return layers;
};

export const getScaleFactor = (currLayer: AVLayer, comp: CompItem, pan: boolean) => {
  let layerScale = currLayer.property("Scale");
  if (!(layerScale instanceof Property)) return 1;
  let scaleFactorY = 100;
  let scaleFactorX = 100;
  if (currLayer.height > comp.height) {
    scaleFactorY = comp.height / currLayer.height;
  }
  if (currLayer.width > comp.width) {
    scaleFactorX = comp.width / currLayer.width;
  }
  let scaleFactor = Math.min(scaleFactorX, scaleFactorY, 1);
  const ratio = currLayer.width / currLayer.height;
  if (pan) scaleFactor = ((ratio - 1) / 2 + 1) * scaleFactor;
  return scaleFactor;
};

export const shouldPan = (layer: AVLayer) => {
  const ratio = layer.width / layer.height;
  return ratio > 1.5;
};

// ALERT EASE VALUES
const alertEaseValues = (comp: CompItem) => {
  let layerPos = comp.selectedLayers[0].property("Position");
  if (layerPos instanceof Property) {
    for (let j = 1; j <= layerPos.numKeys; j++) {
      for (let i = 0; i < layerPos.keyInTemporalEase(1).length; i++) {
        alert(
          j +
            " Ease In: " +
            layerPos.keyInTemporalEase(j)[i].influence +
            " " +
            layerPos.keyInTemporalEase(j)[i].speed
        );
      }
    }

    for (let j = 1; j <= layerPos.numKeys; j++) {
      for (let i = 0; i < layerPos.keyOutTemporalEase(1).length; i++) {
        alert(
          j +
            " Ease Out: " +
            layerPos.keyOutTemporalEase(j)[i].influence +
            " " +
            layerPos.keyOutTemporalEase(j)[i].speed
        );
      }
    }
  }
};

export const getLayerProps = (layer: Layer) => {
  let layerOpacity = layer.property("Opacity");
  let layerPos = layer.property("Position");
  let layerScale = layer.property("Scale");
  return [layerOpacity as Property, layerPos as Property, layerScale as Property];
};

export const getAnimDirection = (layer: Layer) => {
  let layerPos = layer.property("Position");
  if (!(layerPos instanceof Property)) return "none";
  const positionOne = layerPos.valueAtTime(0, false);
  const positionTwo = layerPos.valueAtTime(2, false);
  if (positionOne[0] !== positionTwo[0]) return "left";
  else if (positionOne[1] !== positionTwo[1]) return "down";
  return "none";
};

export const realHeight = (layer: AVLayer) => {
  // alert(layer.height + " " + layer.scale.value[1] / 100 + " " + layer.name);
  return layer.height * (layer.scale.value[1] / 100);
};

export const realWidth = (layer: AVLayer) => {
  return layer.width * (layer.scale.value[0] / 100);
};

export const realHeightArr = (layer: LayerObj) => {
  return layer.layer.height * layer.scaleFactor;
};

export const realWidthArr = (layer: LayerObj) => {
  return layer.layer.width * layer.scaleFactor;
};

export const getNumRealLayers = (comp: CompItem) => {
  let numLayers = 0;
  for (let i = 1; i <= comp.numLayers; i++) {
    if (comp.layer(i).name === "Background") {
      continue;
    }
    numLayers++;
  }
  return numLayers;
};
