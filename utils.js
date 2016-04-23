var path = Plugin.path;
const crisper = require('crisper');
const babel = require('babel-core');
const es2015 = require('babel-preset-es2015-script');
const htmlMinifier = require('html-minifier');
const UglifyJS = require("uglify-js");

import _ from 'underscore';


const vulcan = require('vulcanize');
global.Promise = Promise; // This is because of es6-promise polyfill used by vulcanize



class CompilerUtils {
    constructor() {}

    vulcanize(target, opt = {}) {

        return Async.runSync((done) => {

            vulcan.setOptions(opt);
            vulcan.process(target, (err, html) => done(err, html));
        })
    }

    crisper(html, jsFileName, compact) {
        let out = crisper({
            source: html,
            jsFileName: jsFileName,
            scriptInHead: false
        });
        out.jsFileName = jsFileName;

        this.log('babel ...');

        out.js = this.transpile(out.js, compact);

        return out;
    }
    transpile(js, compact) {
        return babel.transform(js, {
            compact: compact,
            presets: [es2015]
        }).code;
    }

    minifyHtml(html) {
        let options = {
            removeComments: true,
            minifyCSS: true,
            collapseWhitespace: true
        }
        return htmlMinifier.minify(html, options)
    }

    minifyJs(js) {
        let options = {
            fromString: true
        }
        let result = UglifyJS.minify(js, options);
        return result.code;
    }

    log(...args) {
        console.log("=> Polyteor:", ...args);
    }


    addCompileResult(inputFile, compileResult) {


        let htmlPath = path.join(...inputFile.getPathInPackage().split(path.sep).slice(
            1)); // Relative to top level parent folder (client)
        let jsPath = path.join(path.dirname(htmlPath), compileResult.jsFileName ||
            '');

        if (compileResult.html) {
            inputFile.addAsset({
                data: compileResult.html,
                path: htmlPath
            });
        }
        if (compileResult.js && compileResult.jsFileName) {
            inputFile.addAsset({
                data: compileResult.js,
                path: jsPath 
            });
        }
    }

}

export const Utils = new CompilerUtils();
