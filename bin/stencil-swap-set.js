#! /usr/bin/env node
import { exec } from 'child_process';
import * as dotenv from 'dotenv';
import * as path from 'path';

import { 
    ALLENVS,
    PATH_ENVCONFIG,
    PATH_ENVKEYS,
    ROOT_DIR,
    STENCIL_HOST
} from '../src/constants.js';

import { argv } from 'process';
import { existsSync } from 'fs';

// Error if env argument is missing
if (argv.length < 3) {
    console.log('Missing environment type! Enter \x1b[33mdev\x1b[0m, \x1b[33mstage\x1b[0m, or \x1b[33mprod\x1b[0m.');
    process.exit();
}

// Get environment type from CLI argument
const $ENV = argv[2];

// Error if invalid env was entered
if (!(ALLENVS.indexOf($ENV) > -1)) {
    console.log('\x1b[101mIncorrect environment type! Enter \x1b[1mdev, stage, uat, or prod.\x1b[0m');
    process.exit();
}

// Check for presence of config and key files
if (!(existsSync(`${PATH_ENVCONFIG}/${$ENV}.config.json`))) {
    console.log(`\x1b[31mMissing theme config file for environment ${$ENV}. Did you run stencil-swap init?\x1b[0m`);
    process.exit();
}

if (!(existsSync(`${PATH_ENVKEYS}/${$ENV}.env`))) {
    console.log(`\x1b[31mMissing env file for environment ${$ENV}. Did you run stencil-swap init?\x1b[0m`);
    process.exit();
}

// Set .env file location
dotenv.config({ path: `${PATH_ENVKEYS}/${$ENV}.env` });

// Read environment variables from .env file
const { STORE_HASH, STENCIL_TOKEN, PORT } = process.env;

// Check env data for invalid chars
// [CWE-78, CWE-88]
const regEx = new RegExp('[^a-zA-Z0-9]');
if ((regEx.test(STORE_HASH)) || (regEx.test(STENCIL_TOKEN)) || (regEx.test(STENCIL_HOST)) || (regEx.test(PATH_ENVCONFIG) || (regEx.test($ENV)))) {
    console.log('Error! Malformed config data');
    process.exit(1);
}

const sourcePath = path.join(`${PATH_ENVCONFIG}`, `/${$ENV}.config.json`);
const destPath = path.join(`${ROOT_DIR}`, `/config.json`);

// Copy environment config.json file to root
exec(`cp ${sourcePath} ${destPath}`);

// Initialize stencil
exec(`stencil init --url https://store-${STORE_HASH}.mybigcommerce.com/ --token ${STENCIL_TOKEN} --port ${PORT} --apiHost ${STENCIL_HOST}`);
