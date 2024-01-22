export const sortLayers = (
  comp: CompItem,
  layerArray: any[],
  parentFold: FolderItem
) => {
  let layers = [];
  let newComp = app.project.items.addComp("internal", 1080, 1920, 1, 15, 24);
  newComp.parentFolder = parentFold;
  for (let i = 1; i <= comp.numLayers; i++) {
    let currLayer = comp.layer(i);
    if (!(currLayer instanceof AVLayer)) continue;
    let newLayer = newComp.layers.add(currLayer.source);
    centerLayerPosition(newLayer, newComp);
    let layerObj = {
      name: comp.layer(i).name,
      index: i,
      layer: comp.layer(i),
      count: layerArray[i - 1].count,
      in: layerArray[i - 1].in,
      out: layerArray[i - 1].out,
      prev: layerArray[i - 1].prev,
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

export const centerLayerPosition = (currLayer: AVLayer, comp: CompItem) => {
  let layerPos = currLayer.property("Position");
  let layerScale = currLayer.property("Scale");
  if (!(layerPos instanceof Property)) return;
  if (!(layerScale instanceof Property)) return;
  layerPos.setValue([540, 960]);
  let scaleFactorY = 100;
  let scaleFactorX = 100;
  if (currLayer.height > comp.height) {
    scaleFactorY = (comp.height / currLayer.height) * 100;
  }
  if (currLayer.width > comp.width) {
    scaleFactorX = (comp.width / currLayer.width) * 100;
  }
  let scaleFactor = Math.min(scaleFactorX, scaleFactorY);
  layerScale.setValue([scaleFactor, scaleFactor]);
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
