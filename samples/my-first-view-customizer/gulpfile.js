'use strict';

const gulp = require('gulp');

const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

build.initialize(require('gulp'));

// copied from
// https://spblog.net/post/2019/01/02/sharepoint-framework-development-some-gotchas-and-how-to-solve-them
let args = build.getConfig().args;
let isProductionBundle = args._.indexOf('bundle') !== -1 && (args.ship || args.production || args.p);

if (isProductionBundle) {
  build.addSuppression(/Warning - \[sass\] The local CSS class/gi);
  // OR
  build.addSuppression(/Warning/gi);
}

// Copied from 
// https://www.eliostruyf.com/how-to-let-the-warnings-not-fail-the-sharepoint-framework-build-process/
// Retrieve the current build config and check if there is a `warnoff` flag set
const crntConfig = build.getConfig();
const warningLevel = crntConfig.args["warnoff"];

// Extend the SPFx build rig, and overwrite the `shouldWarningsFailBuild` property
if (warningLevel) {
  class CustomSPWebBuildRig extends build.SPWebBuildRig {
    setupSharedConfig() {
      build.log("IMPORTANT: Warnings will not fail the build.")
      build.mergeConfig({
        shouldWarningsFailBuild: false
      });
      super.setupSharedConfig();
    }
  }

  build.rig = new CustomSPWebBuildRig();
}

build.initialize(gulp);