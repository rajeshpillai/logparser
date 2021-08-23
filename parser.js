const fs = require("fs");
const path = require("path");
const moment = require("moment");
const _ = require("lodash");
//const logFile = require("./data//k8s_container_cluster_name_dc-prod-cluster-1_namespace_name_idfy-ops-prod_container_name_idfy-app__logs__2021-08-20T11-44.json");
// const logFile = require("./data/hrportal-prod_2021-08-23T11-20.json");

const items = [];


function _parseItem(item) {
  let parsedItem = item.split(" ").filter(Boolean);  // Remove empty strings
  return parsedItem;
}

function _timeAndPath(item) {
  let timestamp = moment(item.timestamp).format('DD/MM/YY HH:mm:ss');
  let path = item.item[1].split("=")[1];

  let query = path ? path.split("/").filter(Boolean) : "";

  let result = {
    timestamp: timestamp,
    path: path,
    query: query,
    method: item[0],
    controller: item[3]
  }

  console.log(result);

  return {timestamp, path, query, method: item.item[0]};
}

const monthName = item => { 
  return moment(new Date(item.timestamp), 'YYYY-MM-DD').format('MMM-YYYY');
}

function parseLogs(logs) {
  logs.map((line) => {
    if (line.textPayload) {
      let item = _parseItem(line.textPayload.substr(line.textPayload.indexOf("stdout:") + 7));
      let parsedItem =  { 
        timestamp:  moment.utc(line.timestamp).local().format('DD-MM-YYYY HH:mm:ss'),
        date:  moment.utc(line.timestamp).local().format('DD-MM-YYYY'),
        time:  moment.utc(line.timestamp).local().format('HH:mm:ss'),
        item: item,
        method: item[0].split("=")[1],
        path: item[1].split("=")[1],
        query: item[1] && item[1].split("=")[1]?.split("/").filter(Boolean),
        controller: item[3].split("=")[1]
      }
      items.push(parsedItem);
    }
  });

  // let results = 
  // _(items)
  //   .groupBy(monthName)
  //   .mapValues(items => _.map(items, _timeAndPath))
  //   .value();

  return items;
}
module.exports = parseLogs;


