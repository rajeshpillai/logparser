const logFile = require("./data//k8s_container_cluster_name_dc-prod-cluster-1_namespace_name_idfy-ops-prod_container_name_idfy-app__logs__2021-08-20T11-44.json");

// console.log(logFile.textPayload);

const items = [];

function parseItem(item) {
  let parsedItem = item.split(" ").filter(Boolean);  // Remove empty strings
  return parsedItem;
}

function timeAndPath(item) {
  let time = item.timestamp;
  let path = item.item[1].split("=")[1];
  return {time, path};
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

// console.log(items);
console.log(items.map(timeAndPath));

module.exports = items.map(timeAndPath);


