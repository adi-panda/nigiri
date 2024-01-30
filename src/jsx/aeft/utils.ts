export type LayerObj = {
  name: string;
  index: number;
  layer: AVLayer;
  count: number;
  scaleFactor: number;
  in: string;
  out: string;
  prev: string;
  darken: boolean;
};

export const sortLayers = (
  comp: CompItem,
  layerArray: any[],
  parentFold: FolderItem
): LayerObj[] => {
  let layers = [];
  let newComp = app.project.items.addComp("internal", 1080, 1920, 1, 15, 24);
  newComp.parentFolder = parentFold;
  for (let i = 1; i <= comp.numLayers; i++) {
    let currLayer = comp.layer(i);
    if (!(currLayer instanceof AVLayer)) continue;
    let newLayer = newComp.layers.add(currLayer.source);
    let scaleFactor = getScaleFactor(newLayer, newComp);
    let layerObj = {
      name: comp.layer(i).name,
      index: i,
      layer: newLayer,
      count: layerArray[i - 1].count,
      in: layerArray[i - 1].in,
      out: layerArray[i - 1].out,
      scaleFactor: scaleFactor,
      prev: layerArray[i - 1].prev,
      darken: layerArray[i - 1].darken,
    };
    layers.push(layerObj);
  }
  layers.sort((a, b) => {
    if (parseInt(a.name) < parseInt(b.name)) {
      return -1;
    }
    if (parseInt(a.name) > parseInt(b.name)) {
      return 1;
    }
    return 0;
  });
  return layers;
};

export const getScaleFactor = (currLayer: AVLayer, comp: CompItem) => {
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
  return scaleFactor;
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
