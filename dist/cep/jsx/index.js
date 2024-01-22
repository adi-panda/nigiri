(function (thisObj) {// ----- EXTENDSCRIPT INCLUDES ------ //"object"!=typeof JSON&&(JSON={}),function(){"use strict";var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta,rep;function f(t){return t<10?"0"+t:t}function this_value(){return this.valueOf()}function quote(t){return rx_escapable.lastIndex=0,rx_escapable.test(t)?'"'+t.replace(rx_escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var r,n,o,u,f,a=gap,i=e[t];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(t)),"function"==typeof rep&&(i=rep.call(e,t,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,f=[],"[object Array]"===Object.prototype.toString.apply(i)){for(u=i.length,r=0;r<u;r+=1)f[r]=str(r,i)||"null";return o=0===f.length?"[]":gap?"[\n"+gap+f.join(",\n"+gap)+"\n"+a+"]":"["+f.join(",")+"]",gap=a,o}if(rep&&"object"==typeof rep)for(u=rep.length,r=0;r<u;r+=1)"string"==typeof rep[r]&&(o=str(n=rep[r],i))&&f.push(quote(n)+(gap?": ":":")+o);else for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(o=str(n,i))&&f.push(quote(n)+(gap?": ":":")+o);return o=0===f.length?"{}":gap?"{\n"+gap+f.join(",\n"+gap)+"\n"+a+"}":"{"+f.join(",")+"}",gap=a,o}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value),"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,r){var n;if(gap="",indent="","number"==typeof r)for(n=0;n<r;n+=1)indent+=" ";else"string"==typeof r&&(indent=r);if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){var j;function walk(t,e){var r,n,o=t[e];if(o&&"object"==typeof o)for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(void 0!==(n=walk(o,r))?o[r]=n:delete o[r]);return reviver.call(t,e,o)}if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();// ---------------------------------- //// ----- EXTENDSCRIPT PONYFILLS -----function __objectFreeze(obj) { return obj; }// ---------------------------------- //var version = "0.0.1";

var config = {
  version: version,
  id: "com.toona.nigiri",
  displayName: "Nigiri",
  symlink: "local",
  port: 3000,
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
    centerLayerPosition(newLayer, newComp);
    var layerObj = {
      name: comp.layer(i).name,
      index: i,
      layer: comp.layer(i),
      count: layerArray[i - 1].count,
      "in": layerArray[i - 1]["in"],
      out: layerArray[i - 1].out,
      prev: layerArray[i - 1].prev
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
var centerLayerPosition = function centerLayerPosition(currLayer, comp) {
  var layerPos = currLayer.property("Position");
  var layerScale = currLayer.property("Scale");
  if (!(layerPos instanceof Property)) return;
  if (!(layerScale instanceof Property)) return;
  layerPos.setValue([540, 960]);
  var scaleFactorY = 100;
  var scaleFactorX = 100;
  if (currLayer.height > comp.height) {
    scaleFactorY = comp.height / currLayer.height * 100;
  }
  if (currLayer.width > comp.width) {
    scaleFactorX = comp.width / currLayer.width * 100;
  }
  var scaleFactor = Math.min(scaleFactorX, scaleFactorY);
  layerScale.setValue([scaleFactor, scaleFactor]);
};

var layerEaseValues = [new KeyframeEase(0, 83.5), new KeyframeEase(0, 0.1), new KeyframeEase(11.5, 83.5), new KeyframeEase(0, 0.1)];
var animateLayer = function animateLayer(currLayer, slide, index, layerArray) {
  if (slide === index) {
    animateLayerIn(currLayer, layerArray, index);
  } else if (slide == index + 1) {
    animateLayerOut(currLayer, layerArray, index);
  } else {
    var layerPos = currLayer.property("Position");
    if (!(layerPos instanceof Property)) return;
    layerPos.setValue([540, currLayer.height * (currLayer.scale.value[1] / 100) / 2]);
  }
};
var animateLayerIn = function animateLayerIn(currLayer, layerArray, index, slide) {
  var layerPos = currLayer.property("Position");
  var layerOpacity = currLayer.property("Opacity");
  var layerScale = currLayer.property("Scale");
  var prevLayer = layerArray[index - 1].layer;
  if (!(prevLayer instanceof AVLayer)) return;
  if (!(layerPos instanceof Property)) return;
  if (!(layerOpacity instanceof Property)) return;
  if (!(layerScale instanceof Property)) return;
  layerScale.setValueAtTime(2, [currLayer.scale.value[0], currLayer.scale.value[0]]);
  alert(prevLayer.height * (prevLayer.scale.value[1] / 100) / 2 + " prev " + index);
  layerPos.setValueAtTime(0, [540, 1920]);
  layerPos.setValueAtTime(2, [540, prevLayer.height * (prevLayer.scale.value[1] / 100) / 2]);

  // currLayer.height * (currLayer.scale.value[1] / 100);

  // Set the ease to be a smooth bezier.
  layerPos.setTemporalEaseAtKey(1, [layerEaseValues[0]], [layerEaseValues[1]]);
  layerPos.setTemporalEaseAtKey(2, [layerEaseValues[2]], [layerEaseValues[3]]);
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
  alert(currLayer.height * (currLayer.scale.value[1] / 100) / 2 + " curr " + index);
  layerPos.setValueAtTime(0, [540, 960]);
  layerPos.setValueAtTime(2, [540, currLayer.height * (currLayer.scale.value[1] / 100) / 2]);
  // layerPos.setValueAtTime(2, [
  //   540,
  //   (currLayer.height * (currLayer.scale.value[1] / 100)) / 2,
  // ]);
  // Set the ease to be a smooth bezier.
  layerPos.setTemporalEaseAtKey(1, [layerEaseValues[0]], [layerEaseValues[1]]);
  layerPos.setTemporalEaseAtKey(2, [layerEaseValues[2]], [layerEaseValues[3]]);
};

var animatePhotoshop = function animatePhotoshop(layerArray) {
  app.beginUndoGroup("Split Comp");
  var comp = app.project.activeItem;
  if (!(comp instanceof CompItem)) return;
  var newFolder = app.project.items.addFolder("Page_" + comp.name);
  if (layerArray.length == 0) layerArray = getPanels();
  var layers = sortLayers(comp, layerArray, newFolder);
  var currentCount = 1;
  for (var i = 0; i < layers.length; i++) {
    for (var k = 0; k < layerArray[i].count; k++) {
      var newComp = app.project.items.addComp(comp.name + "_" + currentCount, 1080, 1920, 1, 15, 24);
      newComp.parentFolder = newFolder;
      newComp.layers.addSolid([255, 255, 255], "Background", 1080, 1920, 1);
      for (var j = 0; j <= i; j++) {
        var currentLayer = layers[j].layer;
        if (!(currentLayer instanceof AVLayer)) continue;
        var newLayer = newComp.layers.add(currentLayer.source);
        if (i != 0 && k == 0) animateLayer(newLayer, i, j, layerArray);
      }
      currentCount++;
    }
  }
  app.endUndoGroup();
  return;
};
var getPanels = function getPanels() {
  var comp = app.project.activeItem;
  if (!(comp instanceof CompItem)) return [];
  var layers = [];
  for (var i = 1; i <= comp.numLayers; i++) {
    var layerObj = {
      name: comp.layer(i).name,
      index: i,
      count: 1,
      "in": "down",
      out: "up",
      prev: "flush"
    };
    layers.push(layerObj);
  }
  return layers;
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
  for (var _i = 1; _i <= parentFolder.numItems; _i++) {
    if (pastCurrentComp) {
      var currentComp = parentFolder.item(_i);
      if (!(currentComp instanceof CompItem)) continue;
      for (var j = 1; j <= currentComp.numLayers; j++) {
        var currentLayer = currentComp.layer(j);
        for (var k = 0; k < layers.length; k++) {
          if (layers[k].name == currentLayer.name) {
            var currLayerPos = currentLayer.property("Position");
            var oldLayerPos = layers[k].layer.property("Position");
            var currLayerScale = currentLayer.property("Scale");
            var oldLayerScale = layers[k].layer.property("Scale");
            var currLayerOpacity = currentLayer.property("Opacity");
            var oldLayerOpacity = layers[k].layer.property("Opacity");
            if (!(currLayerOpacity instanceof Property)) continue;
            if (!(oldLayerOpacity instanceof Property)) continue;
            if (!(currLayerPos instanceof Property)) continue;
            if (!(oldLayerPos instanceof Property)) continue;
            if (!(currLayerScale instanceof Property)) continue;
            if (!(oldLayerScale instanceof Property)) continue;
            var parentLayer = layers[k].layer.parent;
            var actualPosition = oldLayerPos.valueAtTime(15, true);
            if (parentLayer) {
              var childPosition = layers[k].layer.transform.position.value;
              var parentPosition = parentLayer.transform.position.value;
              actualPosition = [childPosition[0] + parentPosition[0], childPosition[1] + parentPosition[1]];
            }
            currLayerPos.setValueAtTime(0, actualPosition);
            currLayerPos.setValueAtTime(2, actualPosition);
            currLayerScale.setValueAtTime(0, oldLayerScale.valueAtTime(15, false));
            currLayerOpacity.setValueAtTime(0, oldLayerOpacity.valueAtTime(15, false));
          }
        }
      }
    }
    if (parentFolder.item(_i) == comp) {
      pastCurrentComp = true;
    }
  }
  app.endUndoGroup();
};

var aeft = /*#__PURE__*/__objectFreeze({
  __proto__: null,
  animatePhotoshop: animatePhotoshop,
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
