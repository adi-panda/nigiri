import {
  LayerObj,
  getLayerProps,
  getScaleFactor,
  realHeight,
  realWidth,
} from "./utils";
import {
  downIn,
  fadeIn,
  fadeOut,
  leftIn,
  noneOut,
  rightOut,
  upOut,
} from "./subAnimations";
import { fastSlowEase, slowFastSlow } from "./easeValues";

export const animateLayer = (
  currLayer: AVLayer,
  slide: number, // current slide, e.g 7_1, 7_2, 7_3
  index: number, // current layer index, e.g 0, 1, 2
  layerArray: LayerObj[],
  newComp: CompItem,
  darkenIndex: number,
  noPan: boolean
) => {
  if (slide === index) {
    animateLayerIn(currLayer, layerArray, index, slide);
    if (darkenIndex != -1 && darkenIndex <= slide) {
      let darkBG = newComp.layers.addSolid([0, 0, 0], "Darken", 1080, 1920, 55);
      let darkBGOpacity = darkBG.property("Opacity");
      if (!(darkBGOpacity instanceof Property)) return;
      darkBGOpacity.setValueAtTime(1.5, 55);
      if (darkenIndex === slide) {
        darkBGOpacity.setValueAtTime(0, 0);
      }
      darkBG.moveAfter(newComp.layer(slide - darkenIndex + 2));
    }
    if (layerArray[index].pan && !noPan) {
      panLayer(currLayer, newComp);
    }
  } else {
    animateLayerOut(currLayer, layerArray, index, slide);
  }
};

const animateLayerIn = (
  currLayer: AVLayer,
  layerArray: LayerObj[],
  index: number,
  slide: number
) => {
  let layerPos = currLayer.property("Position");
  let layerOpacity = currLayer.property("Opacity");
  let layerScale = currLayer.property("Scale");
  let prevLayer = layerArray[index - 1];

  if (!(layerPos instanceof Property)) return;
  if (!(layerOpacity instanceof Property)) return;
  if (!(layerScale instanceof Property)) return;

  if (layerArray[slide].in === "down") {
    downIn(layerArray, slide, currLayer, layerPos, prevLayer);
  } else if (layerArray[slide].in === "left") {
    leftIn(layerArray, slide, currLayer, layerPos, prevLayer);
  } else if (layerArray[slide].in === "fade") {
    fadeIn(layerOpacity);
    return;
  }
  // Set the ease to be a smooth bezier.
  layerPos.setTemporalEaseAtKey(1, [fastSlowEase[0]], [fastSlowEase[1]]);
  layerPos.setTemporalEaseAtKey(2, [fastSlowEase[2]], [fastSlowEase[3]]);
  fadeIn(layerOpacity);
};

const animateLayerOut = (
  currLayer: AVLayer,
  layerArray: LayerObj[],
  index: number,
  slide: number
) => {
  const [layerOpacity, layerPos, layerScale] = getLayerProps(currLayer);

  let prevPos = layerArray[index].layer.position.valueAtTime(15, false);
  let parentLayer = layerArray[index].layer.parent;
  if (parentLayer) {
    let childPosition = layerArray[index].layer.position.valueAtTime(15, false);
    let parentPosition = parentLayer.position.valueAtTime(15, false);
    prevPos = [
      childPosition[0] + parentPosition[0],
      childPosition[1] + parentPosition[1],
    ];
  }
  layerPos.setValueAtTime(0, prevPos);
  if (layerArray[slide].darken) return;

  if (layerArray[index].out[slide - 1 - index] === "up") {
    upOut(layerArray, slide, currLayer, layerPos, prevPos, layerOpacity);
  } else if (layerArray[index].out[slide - 1 - index] === "right") {
    rightOut(layerArray, slide, currLayer, layerPos, prevPos, layerOpacity);
  } else if (layerArray[index].out[slide - 1 - index] === "fade") {
    fadeOut(layerOpacity);
  } else if (layerArray[index].out[slide - 1 - index] === "none") {
    noneOut(layerPos, prevPos);
  } else if (layerArray[index].out[slide - 1 - index] === "x") {
    alert("bruh");
  }

  // Set the ease to be a smooth bezier.
  if (layerArray[index].out[slide - 1 - index] !== "fade") {
    layerPos.setTemporalEaseAtKey(1, [fastSlowEase[0]], [fastSlowEase[1]]);
    layerPos.setTemporalEaseAtKey(2, [fastSlowEase[2]], [fastSlowEase[3]]);
  }
};

export const panLayer = (curr: Layer, compItem: CompItem) => {
  if (!curr) app.beginUndoGroup("Pan Layer");
  let comp = compItem;
  let activeComp = app.project.activeItem;
  if (!(activeComp instanceof CompItem)) return;
  if (!compItem) comp = activeComp;
  if (!curr) curr = comp.selectedLayers[0];
  if (!(curr instanceof AVLayer)) return;
  let newNull = comp.layers.addNull();
  let newNullPos = newNull.property("Position");
  let currPos = curr.property("Position");
  if (!(currPos instanceof Property)) return;
  if (!(newNullPos instanceof Property)) return;
  let oldPos = currPos.valueAtTime(15, true);
  curr.parent = newNull;
  // alert(oldPos[1] + " " + newNull.position.value[1] + " " + curr.position.value[1]);
  const myMarker = new MarkerValue("Pan End");
  myMarker.label = 4;
  comp.markerProperty.setValueAtTime(6, myMarker);
  newNullPos.setValueAtTime(0, [
    1080 - realWidth(curr) / 2,
    newNull.position.value[1],
  ]);
  newNullPos.setValueAtTime(6, [
    (curr.width * (curr.scale.value[0] / 100)) / 2,
    newNull.position.value[1],
  ]);
  newNullPos.setTemporalEaseAtKey(1, [slowFastSlow[0]], [slowFastSlow[1]]);
  newNullPos.setTemporalEaseAtKey(2, [slowFastSlow[2]], [slowFastSlow[3]]);
  if (!curr) app.endUndoGroup();
};
