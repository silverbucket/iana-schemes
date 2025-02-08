import * as fs from "node:fs";
import path from "node:path";
import get from "simple-get";
import cheerio from "cheerio";
import chalk from "chalk";
import arrayDiff from "simple-array-diff";
import deepEqual from "deep-equal";
import keyBy from "lodash.keyby";

const unofficial = await import("../lib/unofficial.json", {
  with: { type: "json" },
});

const unofficialMap = {};

unofficial.default.forEach(function (item: { scheme: string | number }) {
  unofficialMap[item.scheme] = item;
});

const sortFn = function (a: number, b: number) {
  a = a.scheme.toLowerCase();
  b = b.scheme.toLowerCase();

  return a === b ? 0 : a < b ? -1 : 1;
};

const sections = {};

get.concat(
  "http://www.iana.org/assignments/uri-schemes/uri-schemes.xml",
  function (err: any, res: any, data: { toString: () => any }) {
    if (err) {
      throw err;
    }

    const $ = cheerio.load(data.toString(), {
      xmlMode: true,
    });

    $("record").each(function (idx: any, el: any) {
      const status = $(el).find("status").text().toLowerCase();

      if (!sections[status]) {
        sections[status] = [];
      }

      const result = {
        scheme: $(el).find("value").text(),
        description: $(el).find("description").text(),
        reference: Array.prototype.map.call(
          $(el).find('> xref:not([type="person"])'),
          function (el) {
            const type = $(el).attr("type");
            let href;

            switch (type) {
              case "rfc":
              case "draft":
                href = "http://www.iana.org/go/" + $(el).attr("data");
                break;
              case "registry":
                href = "http://www.iana.org/assignments/" + $(el).attr("data");
                break;
              default:
                href = $(el).attr("data");
            }

            return {
              type: type,
              href: href,
            };
          },
        ),
      };

      if ($(el).find('file[type="template"]').length === 1) {
        result.template = "http://www.iana.org/assignments/uri-schemes/" +
          $(el).find('file[type="template"]').text();
      }

      if (unofficialMap[result.scheme]) {
        console.error(
          chalk.yellow(
            "WARN: Duplicate scheme in unofficial schemes list: " +
              result.scheme,
          ),
        );
        console.error(
          chalk.yellow("\t Already exists in iana " + status + "\n"),
        );
      }

      sections[status].push(result);
    });

    // Write out the results
    Object.keys(sections).forEach(function (key) {
      const newRecords = sections[key].slice().sort(sortFn);

      const fileName = path.join("lib", "iana-" + key) + ".json";

      fs.readFile(fileName, "utf8", function (err: any, data: string) {
        const oldRecords = JSON.parse(data).sort(sortFn);

        const diff = arrayDiff(oldRecords, newRecords, "scheme");

        const diffLog = [chalk.underline(key) + ":"];

        if (diff.added.length > 0) {
          diffLog.push(
            "\t" + chalk.green("Added") + ": " +
              diff.added.map(function (record: { scheme: any }) {
                return record.scheme;
              }).join(", "),
          );
        }

        if (diff.removed.length > 0) {
          diffLog.push(
            "\t" + chalk.red("Removed") + ": " +
              diff.removed.map(function (record: { scheme: any }) {
                return record.scheme;
              }).join(", "),
          );
        }

        // Figure out what common schemes have updated properties
        if (diff.common.length > 0) {
          const oldMap = keyBy(oldRecords, "scheme");
          const newMap = keyBy(newRecords, "scheme");

          const updated = diff.common.filter(
            function (record: { scheme: string | number }) {
              return !deepEqual(oldMap[record.scheme], newMap[record.scheme]);
            },
          );

          if (updated.length > 0) {
            diffLog.push(
              "\t" + chalk.yellow("Updated") + ": " +
                updated.map(function (record: { scheme: any }) {
                  return record.scheme;
                }).join(", "),
            );
          }
        }

        if (diffLog.length === 1) {
          diffLog.push("\tNo changes");
        }

        fs.writeFile(
          fileName,
          JSON.stringify(newRecords, undefined, 2),
          function (err: any) {
            if (err) {
              throw err;
            }

            console.log(diffLog.join("\n") + "\n");
          },
        );
      });
    });
  },
);
