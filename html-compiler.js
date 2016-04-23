var path = Plugin.path;
const fs = Plugin.fs;
const fsExtra = require('fs-extra');
import mkdirp from 'mkdirp';

import {
    Utils
} from './utils';

export class HtmlCompiler extends CachingCompiler {
    constructor() {
        super({
            compilerName: 'polyteor-html-compiler',
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
            Utils.log('skipping ' + inputFile.getPathInPackage());
            return;

        } else {
            Utils.log('Compiling web component: ' + inputFile.getPathInPackage());
            Utils.log('crisper ...');
            let jsFileName = path.basename(inputFile.getPathInPackage(), '.pt.html') + '.js';
            let out = Utils.crisper(inputFile.getContentsAsString(), jsFileName);

            return out;
        }

    }

    addCompileResult(inputFile, compileResult) {
        Utils.addCompileResult(inputFile, compileResult);
    }
}
