#! /usr/bin/env node
import * as path from 'path';
import { createReadStream, readdir, readFile } from 'fs';
import { Stream } from 'stream';
import readLine from 'readline';

import { PATH_ENVKEYS, ROOT_DIR, STOREURL_PATTERN } from '../src/constants.js';

const storeUrlParts = STOREURL_PATTERN.split('%%HASH%%', 2);

const PREHASH = storeUrlParts[0];
const POSTHASH = storeUrlParts[1];

const _fileURL = path.join(ROOT_DIR, '/config.stencil.json');

readFile(`${_fileURL}`, 'utf-8', (async (_err, data) => {
    const activeHash = await new Promise((resolve) => {
        const { normalStoreUrl: url } = JSON.parse(data);

        const startIdx = url.indexOf(PREHASH) + (PREHASH.length);
        const endIdx = url.indexOf(POSTHASH);

        const hash = url.substring(startIdx, endIdx);

        resolve(activeHash);
    }).then((activeHash) => {
        readdir(PATH_ENVKEYS, async function (err, files) {
            if (err) {
                console.log('Unable to scan directory: ' + err);
                process.exit();
            }

        const activeEnv = await getActiveEnv(files, activeHash);

            if (!activeEnv) {
                console.log(`\x1b[33mUnable to identify environment for store hash ${activeHash}. Did you run stencil-swap init?\x1b[0m`)
                process.exit();
            }

        console.log(activeEnv);
    });
}));

function getActiveEnv(files, activeHash) {
    return new Promise((resolve) => {
        const fileCount = files.length;
        files.forEach((file, i) => {
            const env = file.replace('.env', '');
            let hash = false;

            const filePath = `${PATH_ENVKEYS}/${file}`;

            const inStream = createReadStream(filePath);
            const outStream = new Stream();
            const rl = readLine.createInterface(inStream, outStream);
            const regEx = new RegExp('STORE_HASH', "i");

            rl.on('line', function (line) {
                if (line && line.search(regEx) >= 0) {
                    hash = line.replace('STORE_HASH =', '').trim();
                }
            });

            rl.on('close', function () {
                if (hash === activeHash) {
                    resolve(env);
                } else {
                    if ((i + 1) === fileCount) {
                        resolve(false);
                    }
                }
            });
        });
    });
}
