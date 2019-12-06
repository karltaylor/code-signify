const fs = require("fs");
const glob = require("glob")

module.exports = (filePath, regex, replacement) =>
  new Promise((yep, nope) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return nope(err);
      }
      if (!data) {
        return nope("no data");
      }
      const result = data.replace(new RegExp(regex), replacement);
      fs.writeFile(filePath, result, "utf8", writeError => {
        if (writeError) {
          nope(writeError);
        }
        yep();
      });
    });
  });
