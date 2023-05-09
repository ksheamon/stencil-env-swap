#! /usr/bin/env node
import { readdir } from 'fs';

import { PATH_ENVKEYS } from '../src/constants.js';

readdir(PATH_ENVKEYS, async function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    files.forEach((filename) => {
        const envType = filename.replace('.env','');
        console.log(envType);
    });
});
