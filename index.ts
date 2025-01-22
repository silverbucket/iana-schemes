import extend from "extend";

type DataSchemas = {
  [key: string]: any;
};

const data: DataSchemas = {
  permanent: await import("./lib/iana-permanent.json", {
    with: { type: "json" },
  }),
  provisional: await import("./lib/iana-provisional.json", {
    with: { type: "json" },
  }),
  historical: await import("./lib/iana-historical.json", {
    with: { type: "json" },
  }),
  unofficial: [],
};

const unofficial = await import("./lib/unofficial.json", {
  with: { type: "json" },
});

const allByName: DataSchemas = {};

Object.keys(data).forEach(function (type) {
  data[type].forEach(function (schemeObj: { scheme: string | number }) {
    allByName[schemeObj.scheme] = extend(schemeObj, { type: type });
  });
});

data.unofficial = unofficial.default.filter(
  function (item: { scheme: string | number }) {
    return !allByName[item.scheme];
  },
);

data.unofficial.forEach(function (schemeObj: { scheme: string | number }) {
  allByName[schemeObj.scheme] = extend(schemeObj, { type: "unofficial" });
});

export default extend(data, { allByName: allByName });
