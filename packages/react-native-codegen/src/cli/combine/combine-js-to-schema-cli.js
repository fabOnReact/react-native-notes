/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 * @oncall react_native
 */

'use strict';

const combine = require('./combine-js-to-schema');
const {filterJSFile, parseArgs} = require('./combine-utils');
const fs = require('fs');
const glob = require('glob');
const path = require('path');

const {platform, outfile, fileList} = parseArgs(process.argv);

const allFiles = [];
fileList.forEach(file => {
  if (fs.lstatSync(file).isDirectory()) {
    const filePattern = path.sep === '\\' ? file.replace(/\\/g, '/') : file;
    const dirFiles = glob
      .sync(`${filePattern}/**/*.{js,ts,tsx}`, {
        nodir: true,
        // TODO: This will remove the need of slash substitution above for Windows,
        // but it requires glob@v9+; with the package currenlty relying on
        // glob@7.1.1; and flow-typed repo not having definitions for glob@9+.
        // windowsPathsNoEscape: true,
      })
      .filter(element => filterJSFile(element, platform));
    allFiles.push(...dirFiles);
  } else if (filterJSFile(file)) {
    allFiles.push(file);
  }
});

const combined = combine(allFiles);

// Warn users if there is no modules to process
if (Object.keys(combined.modules).length === 0) {
  console.error(
    'No modules to process in combine-js-to-schema-cli. If this is unexpected, please check if you set up your NativeComponent correctly. See combine-js-to-schema.js for how codegen finds modules.',
  );
}
const formattedSchema = JSON.stringify(combined, null, 2);

if (outfile != null) {
  fs.writeFileSync(outfile, formattedSchema);
} else {
  console.log(formattedSchema);
}
