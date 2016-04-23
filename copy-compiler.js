var path = Plugin.path;
const fs = Plugin.fs;
const fsExtra = require('fs-extra');
import mkdirp from 'mkdirp';
import _ from 'underscore';

import {
    Utils
}
from './utils';

export class CopyCompiler {
    processFilesForTarget(files) {
        files.forEach((inputFile) => {

            if (process.env.VULCANIZE) {
                Utils.log('processing  ', inputFile.getPathInPackage());
                var copy = {};
                try {
                    copy = JSON.parse(inputFile.getContentsAsString());
                } catch (e) {
                    inputFile.error({
                        message: e
                    });
                    return;
                }

                Utils.log('copying files into public...');
                _.each(copy.copy, (f) => {
                    let fo;
                    if (_.isObject(f)) {
                        fo = f
                    } else {
                        fo = {
                            src: f,
                            dest: f
                        }
                    }
                    let rcfile = Async.runSync((done) => {
                        fsExtra.remove(path.join('public', fo.dest), (err) => {
                            if (err) {
                                return done(err);
                            }
                            fsExtra.copy(path.join('.polyteor', fo.src), path.join('public', fo.dest),
                                (err) => done(err))
                        });
                    })
                    if (rcfile.error) {
                        inputFile.error({
                            message: rcfile.error
                        });
                        return;
                    }
                })

            }

        });
    }
}
