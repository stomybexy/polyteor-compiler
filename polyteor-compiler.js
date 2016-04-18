// Write your package code here!

// Variables exported by this module can be imported by other packages and
// applications. See polyteor-compiler-tests.js for an example of importing.

import {HtmlCompiler} from './html-compiler';
import {Vulcanizer} from './vulcanizer';


Plugin.registerCompiler({
    extensions: ['pt.html']
, }, () => new HtmlCompiler());

Plugin.registerCompiler({
    extensions: ['vul.html']
, }, () => new Vulcanizer());
