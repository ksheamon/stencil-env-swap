#! /usr/bin/env node
import { input, password, select  } from '@inquirer/prompts';
import { copyFile, existsSync, mkdirSync, writeFile } from 'fs';

import {
    BASE_CONFIG,
    ENVOPTS,
    PATH_ENV,
    PATH_ENVCONFIG,
    PATH_ENVKEYS
} from '../constants.cjs';

async function promptUser() {
    const envType = await select({
        message: 'Select an environment type: ',
        choices: ENVOPTS
    });

    const hash = await input({
        message: "What is your BigCommerce store hash?",
    });

    const token = await password({
        message: "What is your Stencil OAuth Access Token?"
    });

    const port = await input({
        message: "What port would you like to run the server on?",
        default: 3000
    });

    return {
        envType,
        hash,
        token,
        port
    }
}

function checkDirs() {
    if (!(existsSync(PATH_ENV))) {
        // Env folder does not exist. Create.
        mkdirSync(PATH_ENV);

        // Create child dirs
        mkdirSync(PATH_ENVKEYS, { recursive: true });
        mkdirSync(PATH_ENVCONFIG, { recursive: true });
    } else {
        // Env folder exists. Check child dirs.
        if (!(existsSync(PATH_ENVKEYS))) {
            // Keys folder does not exist. Create.
            mkdirSync(PATH_ENVKEYS, { recursive: true });
        }

        if (!(existsSync(PATH_ENVCONFIG))) {
            // Config folder does not exist. Create.
            mkdirSync(PATH_ENVCONFIG, { recursive: true });
        }
    }
}

function checkConfig({ envType }) {
    const envConfigFile = `${PATH_ENVCONFIG}/${envType}.config.json`;

    if (!(existsSync(envConfigFile))) {
        // Config folder does not exist. Create.
        if (!(existsSync(BASE_CONFIG))) {
            // No base config to copy. Exit with error.
        } else {
            console.log(`Copying ${BASE_CONFIG} to ${envConfigFile}`);
            copyFile(BASE_CONFIG, envConfigFile, (err) => {
                if (err) throw err;
            });
        }
    }
}

function createEnvFile({ envType, hash, port, token }) {
    const envKeyFile = `${PATH_ENVKEYS}/${envType}.env`;

    const configText = `PORT = ${port}
    STENCIL_TOKEN = ${token} 
    STORE_HASH = ${hash}`;

    writeFile(envKeyFile, configText, (err) => {
        if (err) {
            throw err;
        }
    });
}

// 1. Gather input from user
const userInput = await promptUser();

console.log(`Initializing ${userInput.envType} for store ${userInput.hash} with token ${userInput.token} on port ${userInput.port}`);

// 2. Check for required directories
checkDirs();

// 3. Copy config file overwriting existing
checkConfig(userInput);

// 4. Create env file
createEnvFile(userInput);
