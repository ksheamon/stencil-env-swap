#! /usr/bin/env node
import { exec } from 'child_process';
import * as dotenv from 'dotenv';

import { 
    ALLENVS,
    PATH_ENVCONFIG,
    PATH_ENVKEYS,
    ROOT_DIR,
    STENCIL_HOST
} from '../constants.cjs';

import { argv } from 'process';

// Error if env argument is missing
if (argv.length < 3) {
    console.log('Missing environment type! Enter \x1b[33mdev\x1b[0m, \x1b[33mstage\x1b[0m, or \x1b[33mprod\x1b[0m.');
    process.exit(1);
}

// Get environment type from CLI argument
const $ENV = argv[2];

// Error if invalid env was entered
if (!(ALLENVS.indexOf($ENV) > -1)) {
    console.log('\x1b[101mIncorrect environment type! Enter \x1b[1mdev, stage, uat, or prod.\x1b[0m');
    process.exit(1);
}

// Set .env file location
dotenv.config({ path: `${PATH_ENVKEYS}/${$ENV}.env` });

// Read environment variables from .env file
const { STORE_HASH, STENCIL_TOKEN, PORT } = process.env;

// Copy environment config.json file to root
exec(`cp ${PATH_ENVCONFIG}/${$ENV}.config.json ${ROOT_DIR}/config.json`);

// Initialize stencil
exec(`stencil init --url https://store-${STORE_HASH}.mybigcommerce.com/ --token ${STENCIL_TOKEN} --port ${PORT} --apiHost ${STENCIL_HOST}`);
