(function (thisObj) {// ----- EXTENDSCRIPT INCLUDES ------ //"object"!=typeof JSON&&(JSON={}),function(){"use strict";var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta,rep;function f(t){return t<10?"0"+t:t}function this_value(){return this.valueOf()}function quote(t){return rx_escapable.lastIndex=0,rx_escapable.test(t)?'"'+t.replace(rx_escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var r,n,o,u,f,a=gap,i=e[t];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(t)),"function"==typeof rep&&(i=rep.call(e,t,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,f=[],"[object Array]"===Object.prototype.toString.apply(i)){for(u=i.length,r=0;r<u;r+=1)f[r]=str(r,i)||"null";return o=0===f.length?"[]":gap?"[\n"+gap+f.join(",\n"+gap)+"\n"+a+"]":"["+f.join(",")+"]",gap=a,o}if(rep&&"object"==typeof rep)for(u=rep.length,r=0;r<u;r+=1)"string"==typeof rep[r]&&(o=str(n=rep[r],i))&&f.push(quote(n)+(gap?": ":":")+o);else for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(o=str(n,i))&&f.push(quote(n)+(gap?": ":":")+o);return o=0===f.length?"{}":gap?"{\n"+gap+f.join(",\n"+gap)+"\n"+a+"}":"{"+f.join(",")+"}",gap=a,o}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value),"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,r){var n;if(gap="",indent="","number"==typeof r)for(n=0;n<r;n+=1)indent+=" ";else"string"==typeof r&&(indent=r);if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){var j;function walk(t,e){var r,n,o=t[e];if(o&&"object"==typeof o)for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(void 0!==(n=walk(o,r))?o[r]=n:delete o[r]);return reviver.call(t,e,o)}if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();// ---------------------------------- //// ----- EXTENDSCRIPT PONYFILLS -----function __objectFreeze(obj) { return obj; }function __isArray(arr) { try { return arr instanceof Array; } catch (e) { return false; } };// ---------------------------------- //var version = "0.0.1";

var config = {
  version: version,
  id: "com.toona.nigiri",
  displayName: "Nigiri",
  symlink: "local",
  port: 3005,
  servePort: 5000,
  startingDebugPort: 8860,
  extensionManifestVersion: 6.0,
  requiredRuntimeVersion: 9.0,
  hosts: [{
    name: "AEFT",
    version: "[0.0,99.9]"
  }],
  type: "Panel",
  iconDarkNormal: "./src/assets/light-icon.png",
  iconNormal: "./src/assets/dark-icon.png",
  iconDarkNormalRollOver: "./src/assets/light-icon.png",
  iconNormalRollOver: "./src/assets/dark-icon.png",
  parameters: ["--v=0", "--enable-nodejs", "--mixed-context"],
  width: 500,
  height: 550,
  panels: [{
    mainPath: "./main/index.html",
    name: "main",
    panelDisplayName: "Nigiri",
    autoVisible: true,
    width: 600,
    height: 650
  }],
  build: {
    jsxBin: "off",
    sourceMap: true
  },
  zxp: {
    country: "US",
    province: "CA",
    org: "MyCompany",
    password: "mypassword",
    tsa: "http://timestamp.digicert.com/",
    sourceMap: false,
    jsxBin: "off"
  },
  installModules: [],
  copyAssets: [],
  copyZipAssets: []
};

var ns = config.id;

var getLayers = function getLayers(comp, layerArray, parentFold) {
  var layers = [];
  var newComp = app.project.items.addComp("internal", 1080, 1920, 1, 15, 24);
  newComp.parentFolder = parentFold;
  for (var i = 1; i <= comp.numLayers; i++) {
    var currLayer = comp.layer(i);
    if (currLayer.name === "Background") continue;
    if (!(currLayer instanceof AVLayer)) continue;
    var newLayer = newComp.layers.add(currLayer.source);
    var scaleFactor = getScaleFactor(newLayer, newComp, layerArray[i - 1].pan);
    var layerObj = {
      name: comp.layer(i).name,
      index: i,
      layer: newLayer,
      count: layerArray[i - 1].count,
      "in": layerArray[i - 1]["in"],
      out: layerArray[i - 1].out,
      scaleFactor: scaleFactor,
      pan: layerArray[i - 1].pan,
      padding: layerArray[i - 1].padding,
      prev: layerArray[i - 1].prev,
      darken: layerArray[i - 1].darken
    };
    layers.push(layerObj);
  }
  return layers;
};
var getScaleFactor = function getScaleFactor(currLayer, comp, pan) {
  var layerScale = currLayer.property("Scale");
  if (!(layerScale instanceof Property)) return 1;
  var scaleFactorY = 100;
  var scaleFactorX = 100;
  if (currLayer.height > comp.height) {
    scaleFactorY = comp.height / currLayer.height;
  }
  if (currLayer.width > comp.width) {
    scaleFactorX = comp.width / currLayer.width;
  }
  var scaleFactor = Math.min(scaleFactorX, scaleFactorY, 1);
  var ratio = currLayer.width / currLayer.height;
  if (pan) scaleFactor = ((ratio - 1) / 2 + 1) * scaleFactor;
  return scaleFactor;
};
var shouldPan = function shouldPan(layer) {
  var ratio = layer.width / layer.height;
  return ratio > 1.5;
};
var getLayerProps = function getLayerProps(layer) {
  var layerOpacity = layer.property("Opacity");
  var layerPos = layer.property("Position");
  var layerScale = layer.property("Scale");
  return [layerOpacity, layerPos, layerScale];
};
var getAnimDirection = function getAnimDirection(layer) {
  var layerPos = layer.property("Position");
  if (!(layerPos instanceof Property)) return "none";
  var positionOne = layerPos.valueAtTime(0, false);
  var positionTwo = layerPos.valueAtTime(2, false);
  if (positionOne[0] !== positionTwo[0]) return "left";else if (positionOne[1] !== positionTwo[1]) return "down";
  return "none";
};
var realHeight = function realHeight(layer) {
  // alert(layer.height + " " + layer.scale.value[1] / 100 + " " + layer.name);
  return layer.height * (layer.scale.value[1] / 100);
};
var realWidth = function realWidth(layer) {
  return layer.width * (layer.scale.value[0] / 100);
};
var realHeightArr = function realHeightArr(layer) {
  return layer.layer.height * layer.scaleFactor;
};
var realWidthArr = function realWidthArr(layer) {
  return layer.layer.width * layer.scaleFactor;
};
var getNumRealLayers = function getNumRealLayers(comp) {
  var numLayers = 0;
  for (var i = 1; i <= comp.numLayers; i++) {
    if (comp.layer(i).name === "Background") {
      continue;
    }
    numLayers++;
  }
  return numLayers;
};

var SCREEN_HEIGHT = 1920;
var SCREEN_WIDTH = 1080;
var TRANSITION_TIME = 2;
var upOut = function upOut(layerArray, slide, currLayer, layerPos, prevPos, layerOpacity, padding) {
  if (layerArray[slide].prev === "keep") {
    var combinedHeight = realHeight(currLayer) + realHeightArr(layerArray[slide]);
    if (slide === 1 && combinedHeight < SCREEN_HEIGHT) {
      var screenCenter = SCREEN_HEIGHT / 2;
      var topPosition = screenCenter - combinedHeight / 2;
      var newCenter = topPosition + realHeight(currLayer) / 2 - padding;
      layerPos.setValueAtTime(TRANSITION_TIME, [prevPos[0], newCenter]);
    } else {
      var newLayerHeight = realHeightArr(layerArray[slide]);
      var bottomPanel = layerArray[slide - 1].layer;
      var bottomPanelPos = bottomPanel.position.valueAtTime(15, false);
      var bototomPanelParent = bottomPanel.parent;
      if (bototomPanelParent) {
        var childPosition = bottomPanel.position.valueAtTime(15, false);
        var parentPosition = bototomPanelParent.transform.position.value;
        bottomPanelPos = [childPosition[0] + parentPosition[0], childPosition[1] + parentPosition[1]];
      }
      var bottomPanelHeight = realHeight(bottomPanel);
      var newPos = prevPos[1] - (newLayerHeight - (SCREEN_HEIGHT - bottomPanelPos[1] - bottomPanelHeight / 2));
      layerPos.setValueAtTime(TRANSITION_TIME, [prevPos[0], newPos]);
    }
  } else if (layerArray[slide].prev === "flush") {
    layerPos.setValueAtTime(TRANSITION_TIME, [prevPos[0], -1 * realHeightArr(layerArray[slide]) / 2]);
    layerOpacity.setValueAtTime(0, 100);
    layerOpacity.setValueAtTime(TRANSITION_TIME, 0);
  }
};
var noneOut = function noneOut(layerPos, prevPos) {
  layerPos.setValueAtTime(TRANSITION_TIME, prevPos);
};
var downIn = function downIn(layerArray, slide, currLayer, layerPos, prevLayer) {
  layerPos.setValueAtTime(0, [SCREEN_WIDTH / 2, SCREEN_HEIGHT]);
  if (layerArray[slide].prev === "keep") {
    var combinedHeight = realHeight(currLayer) + realHeightArr(layerArray[slide - 1]);
    if (slide === 1 && combinedHeight < SCREEN_HEIGHT) {
      var screenCenter = SCREEN_HEIGHT / 2;
      var bottomPosition = screenCenter + combinedHeight / 2;
      var newCenter = bottomPosition - realHeight(currLayer) / 2;
      layerPos.setValueAtTime(TRANSITION_TIME, [SCREEN_WIDTH / 2, newCenter]);
    } else {
      var newPos = SCREEN_HEIGHT - realHeight(currLayer) / 2;
      layerPos.setValueAtTime(TRANSITION_TIME, [SCREEN_WIDTH / 2, newPos]);
    }
  } else {
    layerPos.setValueAtTime(TRANSITION_TIME, [SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2]);
  }
};
var leftIn = function leftIn(layerArray, slide, currLayer, layerPos, prevLayer) {
  if (layerArray[slide].prev === "keep") {
    var verticalHeight = SCREEN_HEIGHT - realHeight(currLayer) / 2;
    layerPos.setValueAtTime(0, [-540, verticalHeight]);
    var calcVal = realWidth(currLayer) / 2;
    layerPos.setValueAtTime(TRANSITION_TIME, [calcVal, verticalHeight]);
  } else {
    layerPos.setValueAtTime(0, [-1 * SCREEN_WIDTH, SCREEN_HEIGHT / 2]);
    layerPos.setValueAtTime(TRANSITION_TIME, [SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2]);
  }
};
var fadeOut = function fadeOut(layerOpacity) {
  layerOpacity.setValueAtTime(0, 100);
  layerOpacity.setValueAtTime(1, 0);
};
var fadeIn = function fadeIn(layerOpacity) {
  layerOpacity.setValueAtTime(0, 0);
  layerOpacity.setValueAtTime(1, 100);
};
var rightOut = function rightOut(layerArray, slide, currLayer, layerPos, prevPos, layerOpacity, padding) {
  if (layerArray[slide].prev === "keep") {
    var newLayerWidth = realWidthArr(layerArray[slide]);
    var leftPanel = layerArray[slide - 1].layer;
    var leftPanelPos = leftPanel.position.valueAtTime(2, false)[0];
    var leftPanelWidth = realWidth(leftPanel);
    var newPos = prevPos[0] + (newLayerWidth - (SCREEN_WIDTH - leftPanelPos - leftPanelWidth / 2));
    layerPos.setValueAtTime(TRANSITION_TIME, [newPos, prevPos[1]]);
  } else {
    layerPos.setValueAtTime(TRANSITION_TIME, [SCREEN_WIDTH + realWidth(currLayer) / 2, prevPos[1]]);
    layerOpacity.setValueAtTime(0, 100);
    layerOpacity.setValueAtTime(TRANSITION_TIME, 0);
  }
};

var fastSlowEase = [new KeyframeEase(0, 83.5), new KeyframeEase(0, 0.1), new KeyframeEase(11.5, 83.5), new KeyframeEase(0, 0.1)];
var slowFastSlow = [new KeyframeEase(0, 90), new KeyframeEase(0, 90), new KeyframeEase(0, 90), new KeyframeEase(0, 90)];

function _slicedToArray$1(arr, i) { return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1(); }
function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit$1(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles$1(arr) { if (__isArray(arr)) return arr; }
var animateLayer = function animateLayer(currLayer, slide, index, layerArray, newComp, darkenIndex) {
  if (slide === index) {
    animateLayerIn(currLayer, layerArray, index, slide);
    if (darkenIndex != -1 && darkenIndex <= slide) {
      var darkBG = newComp.layers.addSolid([0, 0, 0], "Darken", 1080, 1920, 55);
      var darkBGOpacity = darkBG.property("Opacity");
      if (!(darkBGOpacity instanceof Property)) return;
      darkBGOpacity.setValueAtTime(1.5, 55);
      if (darkenIndex === slide) {
        darkBGOpacity.setValueAtTime(0, 0);
      }
      darkBG.moveAfter(newComp.layer(slide - darkenIndex + 2));
    }
    if (layerArray[index].pan) {
      panLayer(currLayer, newComp);
    }
  } else {
    animateLayerOut(currLayer, layerArray, index, slide);
  }
};
var animateLayerIn = function animateLayerIn(currLayer, layerArray, index, slide) {
  var layerPos = currLayer.property("Position");
  var layerOpacity = currLayer.property("Opacity");
  var layerScale = currLayer.property("Scale");
  layerArray[index - 1];
  if (!(layerPos instanceof Property)) return;
  if (!(layerOpacity instanceof Property)) return;
  if (!(layerScale instanceof Property)) return;
  if (layerArray[slide]["in"] === "down") {
    downIn(layerArray, slide, currLayer, layerPos);
  } else if (layerArray[slide]["in"] === "left") {
    leftIn(layerArray, slide, currLayer, layerPos);
  } else if (layerArray[slide]["in"] === "fade") {
    fadeIn(layerOpacity);
    return;
  }
  // Set the ease to be a smooth bezier.
  layerPos.setTemporalEaseAtKey(1, [fastSlowEase[0]], [fastSlowEase[1]]);
  layerPos.setTemporalEaseAtKey(2, [fastSlowEase[2]], [fastSlowEase[3]]);
  fadeIn(layerOpacity);
};
var animateLayerOut = function animateLayerOut(currLayer, layerArray, index, slide) {
  var _getLayerProps = getLayerProps(currLayer),
    _getLayerProps2 = _slicedToArray$1(_getLayerProps, 3),
    layerOpacity = _getLayerProps2[0],
    layerPos = _getLayerProps2[1];
    _getLayerProps2[2];
  var prevPos = layerArray[index].layer.position.valueAtTime(15, false);
  var parentLayer = layerArray[index].layer.parent;
  if (parentLayer) {
    var childPosition = layerArray[index].layer.position.valueAtTime(15, false);
    var parentPosition = parentLayer.position.valueAtTime(15, false);
    prevPos = [childPosition[0] + parentPosition[0], childPosition[1] + parentPosition[1]];
  }
  layerPos.setValueAtTime(0, prevPos);
  if (layerArray[slide].darken) return;
  if (layerArray[index].out[slide - 1 - index] === "up") {
    upOut(layerArray, slide, currLayer, layerPos, prevPos, layerOpacity, layerArray[index].padding);
  } else if (layerArray[index].out[slide - 1 - index] === "right") {
    rightOut(layerArray, slide, currLayer, layerPos, prevPos, layerOpacity, layerArray[index].padding);
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
var panLayer = function panLayer(curr, compItem) {
  if (!curr) app.beginUndoGroup("Pan Layer");
  var comp = compItem;
  var activeComp = app.project.activeItem;
  if (!(activeComp instanceof CompItem)) return;
  if (!compItem) comp = activeComp;
  if (!curr) curr = comp.selectedLayers[0];
  if (!(curr instanceof AVLayer)) return;
  var newNull = comp.layers.addNull();
  var newNullPos = newNull.property("Position");
  var currPos = curr.property("Position");
  if (!(currPos instanceof Property)) return;
  if (!(newNullPos instanceof Property)) return;
  currPos.valueAtTime(15, true);
  curr.parent = newNull;
  // alert(oldPos[1] + " " + newNull.position.value[1] + " " + curr.position.value[1]);
  var myMarker = new MarkerValue("Pan End");
  myMarker.label = 4;
  comp.markerProperty.setValueAtTime(6, myMarker);
  newNullPos.setValueAtTime(0, [1080 - realWidth(curr) / 2, newNull.position.value[1]]);
  newNullPos.setValueAtTime(6, [curr.width * (curr.scale.value[0] / 100) / 2, newNull.position.value[1]]);
  newNullPos.setTemporalEaseAtKey(1, [slowFastSlow[0]], [slowFastSlow[1]]);
  newNullPos.setTemporalEaseAtKey(2, [slowFastSlow[2]], [slowFastSlow[3]]);
  if (!curr) app.endUndoGroup();
};

var forEachLayer = function forEachLayer(comp, callback) {
  var len = comp.numLayers;
  for (var i = 1; i < len + 1; i++) {
    callback(comp.layers[i], i);
  }
};

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (__isArray(arr)) return arr; }
var animatePhotoshop = function animatePhotoshop(layerArray) {
  app.beginUndoGroup("Split Comp");
  var comp = app.project.activeItem;
  if (!(comp instanceof CompItem)) return;
  var newFolder = app.project.items.addFolder("Page_" + comp.name);
  if (layerArray.length == 0) layerArray = getPanels();
  var layers = getLayers(comp, layerArray, newFolder);
  var currentCount = 1;
  var darkenIndex = -1;
  var comps = [];
  for (var i = 0; i < layers.length; i++) {
    for (var k = 0; k < layers[i].count; k++) {
      var newComp = app.project.items.addComp(comp.name + "_" + currentCount, 1080, 1920, 1, 15, 24);
      comps.push(newComp);
      newComp.parentFolder = newFolder;
      newComp.layers.addSolid([255, 255, 255], "Background", 1080, 1920, 1);
      var newMarker = new MarkerValue("Anim End");
      newMarker.label = 3;
      newComp.markerProperty.setValueAtTime(2, newMarker);
      for (var j = 0; j <= i; j++) {
        var currentLayer = layers[j].layer;
        if (!(currentLayer instanceof AVLayer)) continue;
        if (i != j && layerArray[j].out[i - 1 - j] === "x") {
          continue;
        }
        var newLayer = newComp.layers.add(currentLayer.source);
        var newLayerScale = newLayer.property("Scale");
        if (!(newLayerScale instanceof Property)) continue;
        newLayerScale.setValue([layers[j].scaleFactor * 100, layers[j].scaleFactor * 100]);
        if (layerArray[i].darken) darkenIndex = i;
        if (i != 0 && k == 0) animateLayer(newLayer, i, j, layers, newComp, darkenIndex);
        layers[j].layer = newLayer;
      }
      currentCount++;
    }
  }
  for (var _i = comps.length - 1; _i >= 0; _i--) {
    comps[_i].openInViewer();
  }
  app.endUndoGroup();
  return;
};
var render = function render() {
  var _app$project$file;
  var outputFolder = new Folder(((_app$project$file = app.project.file) === null || _app$project$file === void 0 ? void 0 : _app$project$file.parent.fsName) + "/output");
  outputFolder.create();
  for (var i = 1; i <= app.project.numItems; i++) {
    var currentFolder = app.project.item(i);
    if (!(currentFolder instanceof FolderItem)) continue;
    if (currentFolder.name.indexOf("Page_") < 0) continue;
    var _loop = function _loop() {
        var currentComp = currentFolder.item(j);
        if (!(currentComp instanceof CompItem)) return 0; // continue
        if (currentComp.name === "internal") return 0; // continue
        var greatest = 0;
        forEachLayer(currentComp, function (layer) {
          var layerOpacity = layer.property("Opacity");
          if (!(layerOpacity instanceof Property)) return;
          var layerPos = layer.property("Position");
          if (!(layerPos instanceof Property)) return;
          var layerScale = layer.property("Scale");
          if (!(layerScale instanceof Property)) return;
          var greateastTime = 0;
          for (var k = 1; k <= layerOpacity.numKeys; k++) {
            if (layerOpacity.keyTime(k) > greateastTime) greateastTime = layerOpacity.keyTime(k);
          }
          for (var _k = 1; _k <= layerPos.numKeys; _k++) {
            if (layerPos.keyTime(_k) > greateastTime) greateastTime = layerPos.keyTime(_k);
          }
          for (var _k2 = 1; _k2 <= layerScale.numKeys; _k2++) {
            if (layerScale.keyTime(_k2) > greateastTime) greateastTime = layerScale.keyTime(_k2);
          }
          greatest = Math.max(greatest, greateastTime);
        });
        if (greatest > 0) currentComp.workAreaDuration = greatest;else currentComp.workAreaDuration = 1;
        var newItem = app.project.renderQueue.items.add(currentComp);
        // newItem.outputModule(1).applyTemplate("H.264");
        newItem.outputModule(1).file = new File(outputFolder.fsName + "/" + currentComp.name + ".mov");
        newItem.outputModule(1).applyTemplate("H.264 - Match Render Settings -  5 Mbps");
      },
      _ret;
    for (var j = 1; j <= currentFolder.numItems; j++) {
      _ret = _loop();
      if (_ret === 0) continue;
    }
  }
};
var getPanels = function getPanels() {
  var comp = app.project.activeItem;
  if (!(comp instanceof CompItem)) return [];
  var layers = [];
  var numLayers = getNumRealLayers(comp);
  for (var i = 1; i <= numLayers; i++) {
    if (comp.layer(i).name === "Background") continue;
    var out = [];
    for (var j = numLayers; j > i; j--) {
      out.push("up");
    }
    var inAnim = "down";
    var currLayer = comp.layer(i);
    if (!(currLayer instanceof AVLayer)) continue;
    var pan = shouldPan(currLayer);
    if (currLayer.height > currLayer.width) {
      inAnim = "left";
      // if (prevLayer) prevLayer.out[0] = "right";
      for (var _j = 0; _j < layers.length; _j++) {
        layers[_j].out[i - _j - 2] = "right";
      }
    }
    var layerObj = {
      name: comp.layer(i).name,
      index: i,
      count: 1,
      "in": inAnim,
      out: out,
      prev: "keep",
      pan: pan,
      padding: 100,
      darken: false
    };
    layers.push(layerObj);
  }
  return layers;
};
var addAudios = function addAudios() {
  var _app$project$file2;
  //Import all files in the audio folder
  app.beginUndoGroup("Add Audio");
  var audioContainer = app.project.items.addFolder("Voice-Lines");
  var audioFolder = new Folder(((_app$project$file2 = app.project.file) === null || _app$project$file2 === void 0 ? void 0 : _app$project$file2.parent.fsName) + "/voice-lines");
  var audioFiles = audioFolder.getFiles();
  for (var i = 0; i < audioFiles.length; i++) {
    var currentFile = audioFiles[i];
    if (!(currentFile instanceof File)) continue;
    var audioImport = app.project.importFile(new ImportOptions(currentFile));
    audioImport.parentFolder = audioContainer;
  }
  for (var _i2 = 1; _i2 <= app.project.numItems; _i2++) {
    var currentFolder = app.project.item(_i2);
    if (!(currentFolder instanceof FolderItem)) continue;
    if (currentFolder.name.indexOf("Page_") < 0) continue;
    for (var j = 1; j <= currentFolder.numItems; j++) {
      var currentComp = currentFolder.item(j);
      if (!(currentComp instanceof CompItem)) continue;
      if (currentComp.name === "internal") continue;
      for (var k = 1; k <= audioContainer.numItems; k++) {
        var currentAudio = audioContainer.item(k);
        if (!(currentAudio instanceof FootageItem)) continue;
        if (currentAudio.name.indexOf(currentComp.name) < 0) continue;
        currentComp.layers.add(currentAudio);
      }
    }
  }
  app.endUndoGroup();
};
var updateValues = function updateValues() {
  app.beginUndoGroup("Update Values");
  var comp = app.project.activeItem;
  if (!(comp instanceof CompItem)) return;
  var layers = [];
  for (var i = 1; i <= comp.numLayers; i++) {
    var layerObj = {
      name: comp.layer(i).name,
      index: i,
      layer: comp.layer(i)
    };
    layers.push(layerObj);
  }
  var parentFolder = comp.parentFolder;
  var pastCurrentComp = false;
  for (var _i3 = 1; _i3 <= parentFolder.numItems; _i3++) {
    if (pastCurrentComp) {
      var currentComp = parentFolder.item(_i3);
      if (!(currentComp instanceof CompItem)) continue;
      for (var j = 1; j <= currentComp.numLayers; j++) {
        var currentLayer = currentComp.layer(j);
        for (var k = 0; k < layers.length; k++) {
          if (layers[k].name !== currentLayer.name) continue;
          var _getLayerProps = getLayerProps(currentLayer),
            _getLayerProps2 = _slicedToArray(_getLayerProps, 3),
            currOpacity = _getLayerProps2[0],
            currPos = _getLayerProps2[1],
            currScale = _getLayerProps2[2];
          var _getLayerProps3 = getLayerProps(layers[k].layer),
            _getLayerProps4 = _slicedToArray(_getLayerProps3, 3),
            oldOpacity = _getLayerProps4[0],
            oldPos = _getLayerProps4[1],
            oldScale = _getLayerProps4[2];
          var parentLayer = layers[k].layer.parent;
          var actualPosition = oldPos.valueAtTime(15, true);
          if (parentLayer) {
            var childPosition = layers[k].layer.transform.position.valueAtTime(15, false);
            var parentPosition = parentLayer.transform.position.valueAtTime(15, false);
            actualPosition = [childPosition[0] + parentPosition[0], childPosition[1] + parentPosition[1]];
          }
          var direction = getAnimDirection(currentLayer);
          var currPosPrev = currPos.valueAtTime(2, true);
          currPos.setValueAtTime(0, actualPosition);
          currScale.setValueAtTime(0, oldScale.valueAtTime(15, false));
          currOpacity.setValueAtTime(0, oldOpacity.valueAtTime(15, false));
          if (direction === "left") currPos.setValueAtTime(2, [currPosPrev[0], actualPosition[1]]);
          if (direction === "down") {
            currPos.setValueAtTime(2, [actualPosition[0], currPosPrev[1]]);
          }
        }
      }
      return;
    }
    if (parentFolder.item(_i3) == comp) pastCurrentComp = true;
  }
  app.endUndoGroup();
};

var aeft = /*#__PURE__*/__objectFreeze({
  __proto__: null,
  panLayer: panLayer,
  animatePhotoshop: animatePhotoshop,
  render: render,
  getPanels: getPanels,
  addAudios: addAudios,
  updateValues: updateValues
});

var host = typeof $ !== "undefined" ? $ : window;
switch (BridgeTalk.appName) {
  case "aftereffects":
  case "aftereffectsbeta":
    host[ns] = aeft;
    break;
}

// https://extendscript.docsforadobe.dev/interapplication-communication/bridgetalk-class.html?highlight=bridgetalk#appname
})(this);//# sourceMappingURL=index.js.map
