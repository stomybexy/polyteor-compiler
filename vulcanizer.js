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
      Utils.log('Compiling ', inputFile.getPathInPackage());
      if (process.env.VULCANIZE) {
        // On production we copy to .polyteor folder
        var rcdir = Async.runSync((done) => {
          mkdirp(path.join('.polyteor', path.dirname(path.join(...inputFile
              .getPathInPackage().split(path.sep).slice(1)))), (err) =>
            done(err))
        })
        if (rcdir.error) {
          // console.log('Error', rcdir.error);
          inputFile.error({message: rcdir.error});
          return;
        }
        Utils.log('copying files into .polyteor...');
        var rcfile = Async.runSync((done) => {
          fsExtra.copy(path.dirname(inputFile.getPathInPackage()),
            path.dirname(path.join('.polyteor', ...inputFile.getPathInPackage()
              .split(path.sep).slice(1))), (err) => done(err))
        })
        if (rcfile.error) {
          // console.log('Error', rcfile.error);
          inputFile.error({message: rcfile.error});
          return;
        }
        //  if(path.basename(inputFile.getPathInPackage())!== 'elements.pt.html'){
        //      return;
        //  }
        Utils.log('Vulcanizing ', inputFile.getPathInPackage(),' ...')
        let el = Utils.vulcanize(path.join('.polyteor', path.join(...inputFile
          .getPathInPackage().split(path.sep).slice(1))), {
          inlineScripts: true
        });
        Utils.log('crispering',inputFile.getPathInPackage(),' ...');

        let jsFileName = path.basename(inputFile.getPathInPackage(),
          '.vul.html') + '.js';

        let out = Utils.crisper(el.result, jsFileName, true);

        Utils.log('minification ...')
        out.html = Utils.minifyHtml(out.html);
        out.js = Utils.minifyJs(out.js);

        this.addCompileResult(inputFile, out);
      } else {
        
        Utils.log('crispering',inputFile.getPathInPackage() ,' ...');

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
