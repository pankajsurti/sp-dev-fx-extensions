'use strict';

const gulp = require('gulp');

const build = require('@microsoft/sp-build-web');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

build.initialize(require('gulp'));

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