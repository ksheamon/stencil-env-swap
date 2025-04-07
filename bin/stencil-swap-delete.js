#! /usr/bin/env node
import { exec } from 'child_process';
import * as dotenv from 'dotenv';
import * as path from 'path';

import {
    ALLENVS,
    ENVOPTS,
    PATH_ENVCONFIG,
    PATH_ENVKEYS,
    ROOT_DIR,
    STENCIL_HOST
} from '../src/constants.js';

import { existsSync } from 'fs';

async function promptUser() {
    const envType = await select({
        message: 'Select an environment: ',
        choices: ENVOPTS
    });

    const confirm = await confirm({
        message: `Are you sure you want to delete the ${envType} environment?`,
        initialValue: false
    });

    if (!confirm) {
        process.exit();
    }

    return {
        envType
    }
}

async function deleteEnv() {
    const userInput = await promptUser();

    if (!userInput) {
        process.exit();
    }

    const { envType } = userInput;

    // Delete config json
    if (existsSync(`${PATH_ENVCONFIG}/${envType}.config.json`)) {
        exec(`rm ${PATH_ENVCONFIG}/${envType}.config.json`);
    }

    // Delete .env
    if (existsSync(`${PATH_ENVKEYS}/${envType}.env`)) {
        exec(`rm ${PATH_ENVKEYS}/${envType}.env`);
    }
}

deleteEnv();
