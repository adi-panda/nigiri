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

var sortLayers = function sortLayers(comp, layerArray, parentFold) {
  var layers = [];
  var newComp = app.project.items.addComp("internal", 1080, 1920, 1, 15, 24);
  newComp.parentFolder = parentFold;
  for (var i = 1; i <= comp.numLayers; i++) {
    var currLayer = comp.layer(i);
    if (!(currLayer instanceof AVLayer)) continue;
    var newLayer = newComp.layers.add(currLayer.source);
    var scaleFactor = getScaleFactor(newLayer, newComp);
    var layerObj = {
      name: comp.layer(i).name,
      index: i,
      layer: newLayer,
      count: layerArray[i - 1].count,
      "in": layerArray[i - 1]["in"],
      out: layerArray[i - 1].out,
      scaleFactor: scaleFactor,
      prev: layerArray[i - 1].prev,
      darken: layerArray[i - 1].darken
    };
    layers.push(layerObj);
  }
  layers.sort(function (a, b) {
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
var getScaleFactor = function getScaleFactor(currLayer, comp) {
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
  return scaleFactor;
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

var upOut = function upOut(layerArray, slide, currLayer, layerPos, prevPos, layerOpacity) {
  if (layerArray[slide].prev === "keep") {
    if (slide === 1) {
      var topAligned = currLayer.height * (currLayer.scale.value[1] / 100) / 2;
      layerPos.setValueAtTime(2, [prevPos[0], topAligned]);
    } else {
      var newLayerHeight = layerArray[slide].layer.height * layerArray[slide].scaleFactor;
      var calcVal = prevPos[1] - (newLayerHeight - (1920 - layerArray[slide - 1].layer.position.valueAtTime(2, false)[1] - layerArray[slide - 1].layer.height * layerArray[slide - 1].scaleFactor / 2));
      layerPos.setValueAtTime(2, [prevPos[0], calcVal]);
    }
  } else {
    layerPos.setValueAtTime(2, [prevPos[0], -1 * layerArray[slide].layer.height / 2]);
    layerOpacity.setValueAtTime(0, 100);
    layerOpacity.setValueAtTime(2, 0);
  }
};
var downIn = function downIn(layerArray, slide, currLayer, layerPos, prevLayer) {
  layerPos.setValueAtTime(0, [540, 1920]);
  if (layerArray[slide].prev === "keep") {
    if (slide === 1) {
      layerPos.setValueAtTime(2, [540, prevLayer.layer.height * prevLayer.scaleFactor + currLayer.height * (currLayer.scale.value[1] / 100) / 2]);
    } else {
      var calcVal = 1920 - currLayer.height * (currLayer.scale.value[1] / 100) / 2;
      layerPos.setValueAtTime(2, [540, calcVal]);
    }
  } else {
    layerPos.setValueAtTime(2, [540, 960]);
  }
};
var leftIn = function leftIn(layerArray, slide, currLayer, layerPos, prevLayer) {
  if (layerArray[slide].prev === "keep") {
    var verticalHeight = 1920 - currLayer.height * (currLayer.scale.value[1] / 100) / 2;
    layerPos.setValueAtTime(0, [-540, verticalHeight]);
    var calcVal = 0 + currLayer.width * (currLayer.scale.value[0] / 100) / 2;
    layerPos.setValueAtTime(2, [calcVal, verticalHeight]);
  } else {
    layerPos.setValueAtTime(0, [-540, 960]);
    layerPos.setValueAtTime(2, [540, 960]);
  }
};
var rightOut = function rightOut(layerArray, slide, currLayer, layerPos, prevPos, layerOpacity) {
  if (layerArray[slide].prev === "keep") {
    var newLayerWidth = layerArray[slide].layer.width * layerArray[slide].scaleFactor;
    var calcVal = prevPos[0] + (newLayerWidth - (1080 - layerArray[slide - 1].layer.position.valueAtTime(2, false)[0] - layerArray[slide - 1].layer.width * layerArray[slide - 1].scaleFactor / 2));
    layerPos.setValueAtTime(2, [calcVal, prevPos[1]]);
  } else {
    layerPos.setValueAtTime(2, [1080 + layerArray[slide].layer.width * layerArray[slide].scaleFactor / 2, 960]);
    layerOpacity.setValueAtTime(0, 100);
    layerOpacity.setValueAtTime(2, 0);
  }
};

var fastSlowEase = [new KeyframeEase(0, 83.5), new KeyframeEase(0, 0.1), new KeyframeEase(11.5, 83.5), new KeyframeEase(0, 0.1)];
var slowFastSlow = [new KeyframeEase(0, 90), new KeyframeEase(0, 90), new KeyframeEase(0, 90), new KeyframeEase(0, 90)];

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
  } else {
    animateLayerOut(currLayer, layerArray, index, slide);
  }
};
var animateLayerIn = function animateLayerIn(currLayer, layerArray, index, slide) {
  var layerPos = currLayer.property("Position");
  var layerOpacity = currLayer.property("Opacity");
  var layerScale = currLayer.property("Scale");
  var prevLayer = layerArray[index - 1];
  if (!(layerPos instanceof Property)) return;
  if (!(layerOpacity instanceof Property)) return;
  if (!(layerScale instanceof Property)) return;
  layerScale.setValueAtTime(2, [currLayer.scale.value[0], currLayer.scale.value[0]]);
  if (layerArray[slide]["in"] === "down") {
    downIn(layerArray, slide, currLayer, layerPos, prevLayer);
  } else if (layerArray[slide]["in"] === "left") {
    leftIn(layerArray, slide, currLayer, layerPos);
  }

  // currLayer.height * (currLayer.scale.value[1] / 100);

  // Set the ease to be a smooth bezier.
  layerPos.setTemporalEaseAtKey(1, [fastSlowEase[0]], [fastSlowEase[1]]);
  layerPos.setTemporalEaseAtKey(2, [fastSlowEase[2]], [fastSlowEase[3]]);
  layerOpacity.setValueAtTime(0, 0);
  layerOpacity.setValueAtTime(1, 100);
};
var animateLayerOut = function animateLayerOut(currLayer, layerArray, index, slide) {
  var layerPos = currLayer.property("Position");
  var layerOpacity = currLayer.property("Opacity");
  var layerScale = currLayer.property("Scale");
  if (!(layerPos instanceof Property)) return;
  if (!(layerOpacity instanceof Property)) return;
  if (!(layerScale instanceof Property)) return;
  var prevPos = layerArray[index].layer.position.valueAtTime(2, false);
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
  var layers = sortLayers(comp, layerArray, newFolder);
  var currentCount = 1;
  var darkenIndex = -1;
  for (var i = 0; i < layers.length; i++) {
    for (var k = 0; k < layers[i].count; k++) {
      var newComp = app.project.items.addComp(comp.name + "_" + currentCount, 1080, 1920, 1, 15, 24);
      newComp.parentFolder = newFolder;
      newComp.layers.addSolid([255, 255, 255], "Background", 1080, 1920, 1);
      for (var j = 0; j <= i; j++) {
        var currentLayer = layers[j].layer;
        if (!(currentLayer instanceof AVLayer)) continue;
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
  app.endUndoGroup();
  return;
};
var render = function render() {
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
        app.project.renderQueue.items.add(currentComp);
      },
      _ret;
    for (var j = 1; j <= currentFolder.numItems; j++) {
      _ret = _loop();
      if (_ret === 0) continue;
    }
  }
};
var panLayer = function panLayer() {
  app.beginUndoGroup("Pan Layer");
  var comp = app.project.activeItem;
  if (!(comp instanceof CompItem)) return;
  var curr = comp.selectedLayers[0];
  if (!(curr instanceof AVLayer)) return;
  var newNull = comp.layers.addNull();
  var newNullPos = newNull.property("Position");
  var currPos = curr.property("Position");
  if (!(currPos instanceof Property)) return;
  if (!(newNullPos instanceof Property)) return;
  currPos.valueAtTime(0, true);
  curr.parent = newNull;
  newNullPos.setValueAtTime(0, [1080 - curr.width * (curr.scale.value[0] / 100) / 2, newNull.position.value[1]]);
  newNullPos.setValueAtTime(6, [curr.width * (curr.scale.value[0] / 100) / 2, newNull.position.value[1]]);
  newNullPos.setTemporalEaseAtKey(1, [slowFastSlow[0]], [slowFastSlow[1]]);
  newNullPos.setTemporalEaseAtKey(2, [slowFastSlow[2]], [slowFastSlow[3]]);
  app.endUndoGroup();
};
var getPanels = function getPanels() {
  var comp = app.project.activeItem;
  if (!(comp instanceof CompItem)) return [];
  var layers = [];
  for (var i = 1; i <= comp.numLayers; i++) {
    var out = [];
    for (var j = comp.numLayers; j > i; j--) {
      out.push("up");
    }
    var layerObj = {
      name: comp.layer(i).name,
      index: i,
      count: 1,
      scaleFactor: 1,
      "in": "down",
      out: out,
      prev: "keep",
      darken: false
    };
    layers.push(layerObj);
  }
  return layers;
};
var updateValues = function updateValues() {
  app.beginUndoGroup("Update Values");
  alert("This will update all values in the comp to the current time");
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
  for (var _i = 1; _i <= parentFolder.numItems; _i++) {
    if (pastCurrentComp) {
      var currentComp = parentFolder.item(_i);
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
            var childPosition = layers[k].layer.transform.position.value;
            var parentPosition = parentLayer.transform.position.value;
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
    if (parentFolder.item(_i) == comp) pastCurrentComp = true;
  }
  app.endUndoGroup();
};

var aeft = /*#__PURE__*/__objectFreeze({
  __proto__: null,
  animatePhotoshop: animatePhotoshop,
  render: render,
  panLayer: panLayer,
  getPanels: getPanels,
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
