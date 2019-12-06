const { execSync } = require("child_process");
const glob = require("glob");
const inquirer = require("inquirer");

const getCertStrings = require("./getCertStrings");
const findAndReplace = require("./findAndReplace");

module.exports = async () => {
  const xcodeProj = "./ios/*.xcodeproj/project.pbxproj";
  glob(xcodeProj, async (er, files) => {
    if (files.length === 0) {
      return console.log(
        "No .pbxproj file found. Are you sure you are in the root of your iOS project?"
      );
    } else {
      const choices = await getCertStrings();
      const regex = /(CODE_SIGN_IDENTITY+.+=\s")(.+)(";)/g;
      inquirer
        .prompt({
          message:
            "Please select Code Signing Certificate you would like to use",
          name: "code_signing_cert",
          type: "rawlist",
          choices: choices
        })
        .then(({ code_signing_cert }) => {
          findAndReplace(files[0], regex, `$1${code_signing_cert}$3`)
            .then(() =>
              console.log(
                `Switched Code Signing Identity to: ${code_signing_cert}`
              )
            )
            .catch(err => console.log(err));
        });
    }
  });
};
