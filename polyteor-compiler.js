// Write your package code here!

// Variables exported by this module can be imported by other packages and
// applications. See polyteor-compiler-tests.js for an example of importing.

import {
    HtmlCompiler
} from './html-compiler';
import {
    JsCompiler
} from './js-compiler';
import {
    Vulcanizer
} from './vulcanizer';
import {
    CopyCompiler
} from './copy-compiler';


Plugin.registerCompiler({
    extensions: ['pt.html'],
}, () => new HtmlCompiler());

Plugin.registerCompiler({
    extensions: ['pt.js'],
}, () => new JsCompiler());

Plugin.registerCompiler({
    extensions: ['vul.html'],
}, () => new Vulcanizer());

Plugin.registerCompiler({
    extensions: ['pt.json'],
}, () => new CopyCompiler());
