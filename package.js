Package.describe({
  name: 'jonatan:polyteor-compiler',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Compiler for polymer inside meteor.',
  // URL to the Git repository containing the source code for this package.
  git: '',
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

Package.onUse(function (api) {
    api.versionsFrom('1.2.1');
    api.use('ecmascript');
    api.use('isobuild:compiler-plugin@1.0.0');
    api.use('promise') ;
});

Package.registerBuildPlugin({
    name: "polyteor-compiler"
    , use: [

        'ecmascript',
         'caching-compiler@1.0.0',
         "meteorhacks:async@1.0.0",
         
    ]
    , npmDependencies: {
         'mkdirp':'0.5.1',
         'fs-extra': '0.26.7',
         'vulcanize': '1.14.0'
    }
    , 
    sources: [
        "polyteor-compiler.js"
    ]
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('jonatan:polyteor-compiler');
  api.mainModule('polyteor-compiler-tests.js');
});
