const fs = require("fs");
const path = require("path");
const moment = require("moment");
const _ = require("lodash");

var items = [];


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
    controller: item[3],
    ip: item[11],
  }

  console.log(result);

  return {timestamp, path, query, method: item.item[0]};
}

const monthName = item => { 
  return moment(new Date(item.timestamp), 'YYYY-MM-DD').format('MMM-YYYY');
}

function scanIp(item) {
  // console.log("Scanning for IP...", item[11]);
  for(let i = 0; i < item.length; i++) {
    if (item[i].startsWith("ip=")) {
      // console.log("Found IP: ", item[i]);
      return item[i].split("=")[1];
    } 
  }
  return "<no ip address>";
}

function parseLogs(logs) {
  //items = [];
  items = logs.map((line) => {
    if (line.textPayload) {
      let item = _parseItem(line.textPayload.substr(line.textPayload.indexOf("stdout:") + 7));

      let query = item[1] ? item[1].split("/").filter(Boolean) : "";
      query = query ? query : "";
      
      ip = scanIp(item);


      let parsedItem =  { 
        timestamp:  moment.utc(line.timestamp).local().format('DD-MM-YYYY HH:mm:ss'),
        date:  moment.utc(line.timestamp).local().format('DD-MM-YYYY'),
        time:  moment.utc(line.timestamp).local().format('HH:mm:ss'),
        item: item,
        method: item[0].split("=")[1] ? item[0].split("=")[1] : "",
        path: item[1].split("=")[1] ? item[1].split("=")[1] : "",
        query: query,
        controller: item[3].split("=")[1] ? item[3].split("=")[1] : "",
        ip: ip
      }
      //items.push(parsedItem);
      return parsedItem;
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


