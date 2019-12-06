const inquirer = require("inquirer");
const { spawn } = require("child_process");

module.exports = () => {
  return new Promise((yep, nope) => {
    const security = spawn("security", ["find-certificate", "-a"]);
    const grep = spawn("grep", ['labl"<blob>="Apple D']);

    security.stdout.on("data", data => {
      grep.stdin.write(data);
    });

    security.on("close", code => {
      if (code !== 0) {
        console.log(`ps process exited with code ${code}`);
      }
      grep.stdin.end();
    });

    grep.stdout.on("data", data => {
      const rawCertificateStrings = data.toString();
      const splitStrings = rawCertificateStrings.split(/\n/);
      const cleanStrings = splitStrings
        .filter(cert => cert.length !== 0)
        .map(cert => {
          const trimmed = cert.trim();
          const certName = /blob>="(\w+.+)"/.exec(trimmed);
          return certName[1];
        });
      yep(cleanStrings);
    });

    grep.stderr.on("data", data => {
      console.error(`grep stderr: ${data}`);
      nope(data);
    });

    grep.on("close", code => {
      if (code !== 0) {
        console.log(`grep process exited with code ${code}`);
      }
    });
  });
};
