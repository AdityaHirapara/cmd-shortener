const chalk = require('chalk');

function mapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}

function jsonToMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

function display(obj) {
  obj = JSON.parse(obj);
  for (let k of Object.keys(obj)) {
    console.log(chalk`{bold ${k}}    ${obj[k]}`);
  }
}

module.exports = {
  mapToJson,
  jsonToMap,
  display
};