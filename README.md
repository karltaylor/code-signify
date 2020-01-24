# Code Signify 🗃

[![https://img.shields.io/npm/v/code-signify](https://img.shields.io/npm/v/code-signify)](https://www.npmjs.com/package/code-signify)

Easily select and change your Code Signing Identity via the command line.

## Usage

In the root of an Xcode project (not iOS folder) run:

```bash
$ code-signify
```

## The Issue

1. You have multiple environments for React Native / iOS applications.
2. You have multiple provisioning profiles.
3. You might even have multiple apps because of White Labels.
4. You need to switch between Apple Distribution and your own Certificates for device testing.
5. You run a build on Xcode ready to start coding your new feature but you're slapped with the following:


> Provisioning profile "XYZ" doesn't include signing certificate "123". 🛑

Enter Code Signify 🗃

If you know which certificate you want to use, you can run `code-signify`. This will list the Apple certificates that are currently in your keychain.

<img src="https://i.imgur.com/MlhJxgwg.jpg" width="450px">

After selecting which one you want to use it will update the `.pbxproj` with the new certificate name and voila. ✅


