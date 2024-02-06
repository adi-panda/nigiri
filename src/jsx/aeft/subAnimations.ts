import {
  LayerObj,
  realHeight,
  realHeightArr,
  realWidth,
  realWidthArr,
} from "./utils";
const SCREEN_HEIGHT = 1920;
const SCREEN_WIDTH = 1080;
const TRANSITION_TIME = 2;

export const upOut = (
  layerArray: LayerObj[],
  slide: number,
  currLayer: AVLayer,
  layerPos: Property,
  prevPos: number[],
  layerOpacity: Property
) => {
  if (layerArray[slide].prev === "keep") {
    if (slide === 1) {
      let topAligned = realHeight(currLayer) / 2;
      layerPos.setValueAtTime(TRANSITION_TIME, [prevPos[0], topAligned]);
    } else {
      const newLayerHeight = realHeightArr(layerArray[slide]);
      const bottomPanel = layerArray[slide - 1].layer;
      const bottomPanelPos = bottomPanel.position.valueAtTime(
        TRANSITION_TIME,
        false
      )[1];
      const bottomPanelHeight = realHeight(bottomPanel);
      let newPos =
        prevPos[1] -
        (newLayerHeight - (SCREEN_HEIGHT - bottomPanelPos - bottomPanelHeight / 2));
      layerPos.setValueAtTime(TRANSITION_TIME, [prevPos[0], newPos]);
    }
  } else if (layerArray[slide].prev === "flush") {
    layerPos.setValueAtTime(TRANSITION_TIME, [
      prevPos[0],
      (-1 * realHeightArr(layerArray[slide])) / 2,
    ]);
    layerOpacity.setValueAtTime(0, 100);
    layerOpacity.setValueAtTime(TRANSITION_TIME, 0);
  }
};

export const noneOut = (layerPos: Property, prevPos: number[]) => {
  layerPos.setValueAtTime(TRANSITION_TIME, prevPos);
};

export const downIn = (
  layerArray: LayerObj[],
  slide: number,
  currLayer: AVLayer,
  layerPos: Property,
  prevLayer: LayerObj
) => {
  layerPos.setValueAtTime(0, [SCREEN_WIDTH / 2, SCREEN_HEIGHT]);
  if (layerArray[slide].prev === "keep") {
    if (slide === 1) {
      layerPos.setValueAtTime(TRANSITION_TIME, [
        SCREEN_WIDTH / 2,
        realHeightArr(prevLayer) + realHeight(currLayer) / 2,
      ]);
    } else {
      let newPos = SCREEN_HEIGHT - realHeight(currLayer) / 2;
      layerPos.setValueAtTime(TRANSITION_TIME, [SCREEN_WIDTH / 2, newPos]);
    }
  } else {
    layerPos.setValueAtTime(TRANSITION_TIME, [SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2]);
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
    let verticalHeight = SCREEN_HEIGHT - realHeight(currLayer) / 2;
    layerPos.setValueAtTime(0, [-540, verticalHeight]);
    let calcVal = realWidth(currLayer) / 2;
    layerPos.setValueAtTime(TRANSITION_TIME, [calcVal, verticalHeight]);
  } else {
    layerPos.setValueAtTime(0, [-1 * SCREEN_WIDTH, SCREEN_HEIGHT / 2]);
    layerPos.setValueAtTime(TRANSITION_TIME, [SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2]);
  }
};

export const fadeOut = (layerOpacity: Property) => {
  layerOpacity.setValueAtTime(0, 100);
  layerOpacity.setValueAtTime(1, 0);
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
    const newLayerWidth = realWidthArr(layerArray[slide]);
    const leftPanel = layerArray[slide - 1].layer;
    const leftPanelPos = leftPanel.position.valueAtTime(2, false)[0];
    const leftPanelWidth = realWidth(leftPanel);
    const newPos =
      prevPos[0] +
      (newLayerWidth - (SCREEN_WIDTH - leftPanelPos - leftPanelWidth / 2));
    layerPos.setValueAtTime(TRANSITION_TIME, [newPos, prevPos[1]]);
  } else {
    layerPos.setValueAtTime(TRANSITION_TIME, [
      SCREEN_WIDTH + realWidth(currLayer) / 2,
      prevPos[1],
    ]);
    layerOpacity.setValueAtTime(0, 100);
    layerOpacity.setValueAtTime(TRANSITION_TIME, 0);
  }
};
