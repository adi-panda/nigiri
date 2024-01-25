import { LayerObj, getScaleFactor } from "./utils";
import { downIn, leftIn, rightOut, upOut } from "./subAnimations";
import { fastSlowEase } from "./easeValues";

export const animateLayer = (
  currLayer: AVLayer,
  slide: number, // current slide, e.g 7_1, 7_2, 7_3
  index: number, // current layer index, e.g 0, 1, 2
  layerArray: LayerObj[],
  newComp: CompItem,
  darkenIndex: number
) => {
  if (slide === index) {
    animateLayerIn(currLayer, layerArray, index, slide);
    if (darkenIndex != -1 && darkenIndex <= slide) {
      let darkBG = newComp.layers.addSolid([0, 0, 0], "Darken", 1080, 1920, 55);
      let darkBGOpacity = darkBG.property("Opacity");
      if (!(darkBGOpacity instanceof Property)) return;
      if (darkenIndex === slide) {
        darkBGOpacity.setValueAtTime(0, 0);
        darkBGOpacity.setValueAtTime(1.5, 55);
      }
      darkBG.moveAfter(newComp.layer(slide - darkenIndex + 2));
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

  layerScale.setValueAtTime(2, [
    currLayer.scale.value[0],
    currLayer.scale.value[0],
  ]);

  if (layerArray[slide].in === "down") {
    downIn(layerArray, slide, currLayer, layerPos, prevLayer);
  } else if (layerArray[slide].in === "left") {
    leftIn(layerArray, slide, currLayer, layerPos, prevLayer);
  }

  // currLayer.height * (currLayer.scale.value[1] / 100);

  // Set the ease to be a smooth bezier.
  layerPos.setTemporalEaseAtKey(1, [fastSlowEase[0]], [fastSlowEase[1]]);
  layerPos.setTemporalEaseAtKey(2, [fastSlowEase[2]], [fastSlowEase[3]]);

  layerOpacity.setValueAtTime(0, 0);
  layerOpacity.setValueAtTime(1, 100);
};

const animateLayerOut = (
  currLayer: AVLayer,
  layerArray: LayerObj[],
  index: number,
  slide: number
) => {
  let layerPos = currLayer.property("Position");
  let layerOpacity = currLayer.property("Opacity");
  let layerScale = currLayer.property("Scale");

  if (!(layerPos instanceof Property)) return;
  if (!(layerOpacity instanceof Property)) return;
  if (!(layerScale instanceof Property)) return;

  let prevPos = layerArray[index].layer.position.valueAtTime(2, false);
  layerPos.setValueAtTime(0, prevPos);
  if (layerArray[slide].darken) return;

  if (layerArray[index].out[slide - 1 - index] === "up") {
    upOut(layerArray, slide, currLayer, layerPos, prevPos, layerOpacity);
  } else if (layerArray[index].out[slide - 1 - index] === "right") {
    rightOut(layerArray, slide, currLayer, layerPos, prevPos, layerOpacity);
  }

  // Set the ease to be a smooth bezier.
  layerPos.setTemporalEaseAtKey(1, [fastSlowEase[0]], [fastSlowEase[1]]);
  layerPos.setTemporalEaseAtKey(2, [fastSlowEase[2]], [fastSlowEase[3]]);
};
