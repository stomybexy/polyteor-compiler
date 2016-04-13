// Write your package code here!

// Variables exported by this module can be imported by other packages and
// applications. See polyteor-compiler-tests.js for an example of importing.

var path = Plugin.path;
const fs = Plugin.fs;
const fsExtra = require('fs-extra');
import mkdirp from 'mkdirp';


 const vulcan = require('vulcanize')
 
global.Promise=Promise; // This is because of es6-promise polyfill used by vulcanize

class PolyteorCompiler extends CachingCompiler {
    constructor() {
        super({
            compilerName: 'polyteor-compiler'
            , defaultCacheSize: 1024 * 1024 * 10
         });
         
    }
    vulcanize(target, opt={}){ 
       
          return Async.runSync((done)=>{
            // const Vulcan = require('vulcanize');
            vulcan.setOptions(opt);
            vulcan.process(target, (err, html)=>done(err, html));
        })
    }
    getCacheKey(inputFile) {
        return inputFile.getSourceHash();
    }
    compileResultSize(result) {
        return result.length;
    }

    compileOneFile(inputFile) {
        console.log('Compiling web component: ' + inputFile.getPathInPackage());
        if (process.env.VULCANIZE) {
            // On production we copy to .polyteor folder
           var rcdir = Async.runSync((done)=>{
               mkdirp(path.join('.polyteor', path.dirname(path.join(...inputFile.getPathInPackage().split(path.sep).slice(1)))), (err)=>done(err))
           })
           if(rcdir.error){
               console.log('Error', rcdir.error);
               return;
           }
           console.log('copying file...');
           var rcfile = Async.runSync((done)=>{
               fsExtra.copy(inputFile.getPathInPackage(), path.join('.polyteor',...inputFile.getPathInPackage().split(path.sep).slice(1)), 
               (err)=>done(err) )
           })
           if(rcfile.error){
               console.log('Error', rcfile.error);
               return;
           }
           if(path.basename(inputFile.getPathInPackage())!== 'elements.pt.html'){
               return;
           }
           console.log('Vulcanizing elements.pt.html ...')
           return this.vulcanize('.polyteor/elements/elements.pt.html').result;
           
        } else {
            // Just pass through the file, without any modifications, we do not need to modify it at all at the moment.
            return inputFile.getContentsAsString();
        }
       
    }

    addCompileResult(inputFile, compileResult) {

        var filePath = path.join(...inputFile.getPathInPackage().split(path.sep).slice(1)); // Relative to top level parent folder (client)

        inputFile.addAsset({
            data: compileResult
            , path: filePath // the path is the full path if the file comes from a package
        });

    }
}
Plugin.registerCompiler({
    extensions: ['pt.html']
, }, () => new PolyteorCompiler());
