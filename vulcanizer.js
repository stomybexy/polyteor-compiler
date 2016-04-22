var path = Plugin.path;
const fs = Plugin.fs;
const fsExtra = require('fs-extra');
import mkdirp from 'mkdirp';

import {
  Utils
}
from './utils';

export class Vulcanizer {
  processFilesForTarget(files) {
    files.forEach((inputFile) => {
      console.log('Compiling ', inputFile.getPathInPackage());
      if (process.env.VULCANIZE) {
        // On production we copy to .polyteor folder
        var rcdir = Async.runSync((done) => {
          mkdirp(path.join('.polyteor', path.dirname(path.join(...inputFile
              .getPathInPackage().split(path.sep).slice(1)))), (err) =>
            done(err))
        })
        if (rcdir.error) {
          console.log('Error', rcdir.error);
          return;
        }
        console.log('copying files into .polyteor...');
        var rcfile = Async.runSync((done) => {
          fsExtra.copy(path.dirname(inputFile.getPathInPackage()),
            path.dirname(path.join('.polyteor', ...inputFile.getPathInPackage()
              .split(path.sep).slice(1))), (err) => done(err))
        })
        if (rcfile.error) {
          console.log('Error', rcfile.error);
          return;
        }
        //  if(path.basename(inputFile.getPathInPackage())!== 'elements.pt.html'){
        //      return;
        //  }
        console.log('Vulcanizing  ...')
        let el = Utils.vulcanize(path.join('.polyteor', path.join(...inputFile
          .getPathInPackage().split(path.sep).slice(1))), {
          inlineScripts: true
        });
        console.log('crisper ...');

        let jsFileName = path.basename(inputFile.getPathInPackage(),
          '.vul.html') + '.js';

        let out = Utils.crisper(el.result, jsFileName, true);

        console.log('minification ...')


        this.addCompileResult(inputFile, out);
      } else {
        // Just pass through the file, without any modifications, we do not need to modify it at all at the moment.
        console.log('crisper ...');

        let jsFileName = path.basename(inputFile.getPathInPackage(),
          '.vul.html') + '.js';
        let out = Utils.crisper(inputFile.getContentsAsString(),
          jsFileName);

        this.addCompileResult(inputFile, out);
      }
    })
  }

  addCompileResult(inputFile, compileResult) {
    Utils.addCompileResult(inputFile, compileResult);
  }
}
