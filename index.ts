type DataSchemas = {
  [key: string]: any;
};

import permanentData from "./lib/iana-permanent.json" with { type: "json" };
import provisionalData from "./lib/iana-provisional.json" with { type: "json" };
import historicalData from "./lib/iana-historical.json" with { type: "json" };
import unofficial from "./lib/unofficial.json" with { type: "json" };

const data: DataSchemas = {
  permanent: permanentData,
  provisional: provisionalData,
  historical: historicalData,
  unofficial: [],
};

const allByName: DataSchemas = {};

Object.keys(data).forEach(function (type) {
  data[type].forEach(function (schemeObj: { scheme: string | number, type: string }) {
    schemeObj.type = type;
    allByName[schemeObj.scheme] = schemeObj;
  });
});

data.unofficial = unofficial.filter(
  function (item: { scheme: string | number }) {
    return !allByName[item.scheme];
  },
);

data.unofficial.forEach(function (schemeObj: { scheme: string | number, type: string }) {
  schemeObj.type = "unofficial";
  allByName[schemeObj.scheme] = schemeObj;
});

data.allByName = allByName;
export default data;
