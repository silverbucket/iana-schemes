type DataSchemas = {
  [key: string]: any;
};

const permanentData = await import("./lib/iana-permanent.json", {
  with: { type: "json" },
});
const provisionalData = await import("./lib/iana-provisional.json", {
    with: { type: "json" },
});

const historicalData = await import("./lib/iana-historical.json", {
    with: { type: "json" },
});

const data: DataSchemas = {
  permanent: permanentData.default,
  provisional: provisionalData.default,
  historical: historicalData.default,
  unofficial: [],
};

const unofficial = await import("./lib/unofficial.json", {
  with: { type: "json" },
});

const allByName: DataSchemas = {};

Object.keys(data).forEach(function (type) {
  data[type].forEach(function (schemeObj: { scheme: string | number, type: string }) {
    schemeObj.type = type;
    allByName[schemeObj.scheme] = schemeObj;
  });
});

data.unofficial = unofficial.default.filter(
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
