import { LayerObj } from "./utils";

export const upOut = (
  layerArray: LayerObj[],
  slide: number,
  currLayer: AVLayer,
  layerPos: Property,
  prevPos: number[],
  layerOpacity: Property
) => {
  if (layerArray[slide].prev === "keep") {
    let newLayerHeight =
      layerArray[slide].layer.height * layerArray[slide].scaleFactor;
    let calcVal = prevPos[1] - newLayerHeight;
    layerPos.setValueAtTime(2, [prevPos[0], calcVal]);
  } else {
    layerPos.setValueAtTime(2, [
      prevPos[0],
      (-1 * layerArray[slide].layer.height) / 2,
    ]);
    layerOpacity.setValueAtTime(0, 100);
    layerOpacity.setValueAtTime(2, 0);
  }
};

export const downIn = (
  layerArray: LayerObj[],
  slide: number,
  currLayer: AVLayer,
  layerPos: Property,
  prevLayer: LayerObj
) => {
  layerPos.setValueAtTime(0, [540, 1920]);
  if (layerArray[slide].prev === "keep") {
    let prevLayerHeight = prevLayer.layer.height * prevLayer.scaleFactor;
    let currLayerHeight = currLayer.height * (currLayer.scale.value[1] / 100);
    let prevLayerPos = prevLayer.layer.position.value[1] - currLayerHeight;
    layerPos.setValueAtTime(2, [
      540,
      prevLayerPos + currLayerHeight / 2 + prevLayerHeight / 2,
    ]);
  } else {
    layerPos.setValueAtTime(2, [540, 960]);
  }
};

export const leftIn = (
  layerArray: LayerObj[],
  slide: number,
  currLayer: AVLayer,
  layerPos: Property,
  prevLayer: LayerObj
) => {
  if (layerArray[slide].prev === "keep") {
    let verticalHeight =
      1920 - (currLayer.height * (currLayer.scale.value[1] / 100)) / 2;
    layerPos.setValueAtTime(0, [-540, verticalHeight]);
    let calcVal = 0 + (currLayer.width * (currLayer.scale.value[0] / 100)) / 2;
    layerPos.setValueAtTime(2, [calcVal, verticalHeight]);
  } else {
    layerPos.setValueAtTime(0, [-540, 960]);
    layerPos.setValueAtTime(2, [540, 960]);
  }
};

export const rightOut = (
  layerArray: LayerObj[],
  slide: number,
  currLayer: AVLayer,
  layerPos: Property,
  prevPos: number[],
  layerOpacity: Property
) => {
  if (layerArray[slide].prev === "keep") {
    let newLayerWidth =
      layerArray[slide].layer.width * layerArray[slide].scaleFactor;
    let calcVal =
      prevPos[0] +
      (newLayerWidth -
        (1080 -
          layerArray[slide - 1].layer.position.valueAtTime(2, false)[0] -
          (layerArray[slide - 1].layer.width * layerArray[slide - 1].scaleFactor) /
            2));

    layerPos.setValueAtTime(2, [calcVal, prevPos[1]]);
  } else {
    layerPos.setValueAtTime(2, [
      1080 + (layerArray[slide].layer.width * layerArray[slide].scaleFactor) / 2,
      960,
    ]);
    layerOpacity.setValueAtTime(0, 100);
    layerOpacity.setValueAtTime(2, 0);
  }
};
