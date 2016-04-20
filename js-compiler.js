var path = Plugin.path;
const fs = Plugin.fs;
const fsExtra = require('fs-extra');
import mkdirp from 'mkdirp';

import {
    Utils
} from './utils';

export class JsCompiler extends CachingCompiler {
    constructor() {
        super({
            compilerName: 'polyteor-js-compiler',
            defaultCacheSize: 1024 * 1024 * 10
        });

    }

    getCacheKey(inputFile) {
        return inputFile.getSourceHash();
    }
    compileResultSize(result) {
        return result.length;
    }

    compileOneFile(inputFile) {


        if (process.env.VULCANIZE) {
            console.log('skipping ' + inputFile.getPathInPackage());
            return;

        } else {
            console.log('Compiling web component js: ' + inputFile.getPathInPackage());
            let out = {
                js: Utils.transpile(inputFile.getContentsAsString()),
                jsFileName: path.basename(inputFile.getPathInPackage())
            };


            // console.log('Compile result: ', out);

            // Just pass through the file, without any modifications, we do not need to modify it at all at the moment.
            return out;
        }

    }

    addCompileResult(inputFile, compileResult) {
        Utils.addCompileResult(inputFile, compileResult);
    }
}
