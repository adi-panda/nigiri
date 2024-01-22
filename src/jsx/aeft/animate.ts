const layerEaseValues = [
  new KeyframeEase(0, 83.5),
  new KeyframeEase(0, 0.1),
  new KeyframeEase(11.5, 83.5),
  new KeyframeEase(0, 0.1),
];

export const animateLayer = (
  currLayer: AVLayer,
  slide: number, // current slide, e.g 7_1, 7_2, 7_3
  index: number, // current layer index, e.g 0, 1, 2
  layerArray: any[]
) => {
  if (slide === index) {
    animateLayerIn(currLayer, layerArray, index, slide);
  } else if (slide == index + 1) {
    animateLayerOut(currLayer, layerArray, index, slide);
  } else {
    let layerPos = currLayer.property("Position");
    if (!(layerPos instanceof Property)) return;
    layerPos.setValue([
      540,
      (currLayer.height * (currLayer.scale.value[1] / 100)) / 2,
    ]);
  }
};

const animateLayerIn = (
  currLayer: AVLayer,
  layerArray: any[],
  index: number,
  slide: number
) => {
  let layerPos = currLayer.property("Position");
  let layerOpacity = currLayer.property("Opacity");
  let layerScale = currLayer.property("Scale");
  let prevLayer = layerArray[index - 1].layer;

  if (!(prevLayer instanceof AVLayer)) return;
  if (!(layerPos instanceof Property)) return;
  if (!(layerOpacity instanceof Property)) return;
  if (!(layerScale instanceof Property)) return;

  layerScale.setValueAtTime(2, [
    currLayer.scale.value[0],
    currLayer.scale.value[0],
  ]);

  alert(
    (prevLayer.height * (prevLayer.scale.value[1] / 100)) / 2 + " prev " + index
  );
  layerPos.setValueAtTime(0, [540, 1920]);
  layerPos.setValueAtTime(2, [
    540,
    (prevLayer.height * (prevLayer.scale.value[1] / 100)) / 2,
  ]);

  // currLayer.height * (currLayer.scale.value[1] / 100);

  // Set the ease to be a smooth bezier.
  layerPos.setTemporalEaseAtKey(1, [layerEaseValues[0]], [layerEaseValues[1]]);
  layerPos.setTemporalEaseAtKey(2, [layerEaseValues[2]], [layerEaseValues[3]]);

  layerOpacity.setValueAtTime(0, 0);
  layerOpacity.setValueAtTime(1, 100);
};

const animateLayerOut = (
  currLayer: AVLayer,
  layerArray: any[],
  index: number,
  slide: number
) => {
  let layerPos = currLayer.property("Position");
  let layerOpacity = currLayer.property("Opacity");
  let layerScale = currLayer.property("Scale");

  if (!(layerPos instanceof Property)) return;
  if (!(layerOpacity instanceof Property)) return;
  if (!(layerScale instanceof Property)) return;

  alert(
    (currLayer.height * (currLayer.scale.value[1] / 100)) / 2 + " curr " + index
  );
  layerPos.setValueAtTime(0, [540, 960]);
  layerPos.setValueAtTime(2, [
    540,
    (currLayer.height * (currLayer.scale.value[1] / 100)) / 2,
  ]);
  // layerPos.setValueAtTime(2, [
  //   540,
  //   (currLayer.height * (currLayer.scale.value[1] / 100)) / 2,
  // ]);
  // Set the ease to be a smooth bezier.
  layerPos.setTemporalEaseAtKey(1, [layerEaseValues[0]], [layerEaseValues[1]]);
  layerPos.setTemporalEaseAtKey(2, [layerEaseValues[2]], [layerEaseValues[3]]);
};
