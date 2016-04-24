Package.describe({
  name: 'jonatan:polyteor-compiler',
  version: '0.9.0',
  // Brief, one-line summary of the package.
  summary: 'Compiler for polymer inside meteor.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/stomybexy/polyteor-compiler.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

// Package.onUse(function(api) {
//   api.versionsFrom('1.2.1');
// //   api.use('ecmascript');
//   api.use("isobuild:compiler-plugin");
// //   api.mainModule('polyteor-compiler.js');
// });

// Npm.depends({
//     'vulcanize': '1.14.8'
// })

Package.onUse(function(api) {
  api.versionsFrom('1.3.1');
  // api.use('ecmascript');
  api.use('isobuild:compiler-plugin@1.0.0');
  // api.use('promise');
});

Package.registerBuildPlugin({
  name: "polyteor-compiler",
  use: [

    'ecmascript@0.4..3',
    'promise@0.6.7',
    'caching-compiler@1.0.4',
    "meteorhacks:async@1.0.0",

  ],
  npmDependencies: {
    'mkdirp': '0.5.1',
    'fs-extra': '0.26.7',
    'vulcanize': '1.14.8',
    'crisper': '2.0.2',
    'babel-core': '6.7.4',
    'babel-preset-es2015-script': '1.0.0',
    'html-minifier': '2.0.0',
    'uglify-js': '2.6.2'
  },
  sources: [
    "polyteor-compiler.js",
    "utils.js",
    "html-compiler.js",
    "vulcanizer.js",
    "js-compiler.js",
    "copy-compiler.js"
  ]
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('jonatan:polyteor-compiler');
  api.mainModule('polyteor-compiler-tests.js');
});
