const moment = require("moment");
const _ = require("lodash");
const logFile = require("./data//k8s_container_cluster_name_dc-prod-cluster-1_namespace_name_idfy-ops-prod_container_name_idfy-app__logs__2021-08-20T11-44.json");

// console.log(logFile.textPayload);

const items = [];

function parseItem(item) {
  let parsedItem = item.split(" ").filter(Boolean);  // Remove empty strings
  return parsedItem;
}

function timeAndPath(item) {
  let timestamp = moment(item.timestamp).format('DD/MM/YY HH:mm:ss');
  let path = item.item[1].split("=")[1];

  let query = path ? path.split("/").filter(Boolean) : "";

  
  return {timestamp, path, query};
}

logFile.map((line) => {
    if (line.textPayload) {
      let item = line.textPayload.substr(line.textPayload.indexOf("stdout:") + 7);
      let parsedItem =  { 
        timestamp: line.timestamp,
        item: parseItem(item)
      }

      items.push(parsedItem);
    }
});

//console.log(items.map(timeAndPath));

const monthName = item => { 
  return moment(new Date(item.timestamp), 'YYYY-MM-DD').format('MMM-YYYY');
}
// console.log(monthName(items[0]));

// let result = 
//   _(items)
//     .groupBy(monthName)
//     .mapValues(items => _.map(items, 'timestamp'))
//     .value()

let results = 
  _(items)
    .groupBy(monthName)
    .mapValues(items => _.map(items, timeAndPath))
    .value();

console.log(results);


// module.exports = items.map(timeAndPath);
module.exports = results;


