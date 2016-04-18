var path = Plugin.path;
const vulcan = require('vulcanize');
const crisper = require('crisper');
const babel = require('babel-core');
// import 'babel-preset-es2015';

global.Promise = Promise; // This is because of es6-promise polyfill used by vulcanize



class CompilerUtils {
    constructor() {}

    vulcanize(target, opt = {}) {

        return Async.runSync((done) => {
            // const Vulcan = require('vulcanize');
            vulcan.setOptions(opt);
            vulcan.process(target, (err, html) => done(err, html));
        })
    }

    crisper(html, jsFileName) {
        let out = crisper({
            source: html,
            jsFileName: jsFileName,
            scriptInHead: false
        });
        out.jsFileName = jsFileName;

        console.log('babel ...');
        // var babelOptions = Babel.getDefaultOptions();
        // babelOptions.compact = false;
        out.js = babel.transform(out.js, {compact: false}).code;

        global.Promise = Promise; // This is because of es6-promise polyfill used by vulcanize
        

        // babelOptions.presets = ['es2015'];
        // out.js = Babel.compile(out.js, babelOptions).code;
        return out;
    }

    addCompileResult(inputFile, compileResult) {

        let htmlPath = path.join(...inputFile.getPathInPackage().split(path.sep).slice(1)); // Relative to top level parent folder (client)
        let jsPath = path.join(path.dirname(htmlPath), compileResult.jsFileName || '');

        inputFile.addAsset({
            data: compileResult.html,
            path: htmlPath // the path is the full path if the file comes from a package
        });
        if (compileResult.js && compileResult.jsFileName) {
            inputFile.addAsset({
                data: compileResult.js,
                path: jsPath // the path is the full path if the file comes from a package
            });
        }
    }

}

export const Utils = new CompilerUtils();