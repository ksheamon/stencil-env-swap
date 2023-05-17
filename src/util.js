#! /usr/bin/env node
import { input, password, select } from '@inquirer/prompts';
import { copyFile, existsSync, mkdirSync, writeFile } from 'fs';

import {
    BASE_CONFIG,
    ENVOPTS,
    PATH_ENV,
    PATH_ENVCONFIG,
    PATH_ENVKEYS
} from './constants.js';

/**
 * @typedef {Object} UserInput
 * @property {String} envType - Environment (dev, stage, uat, prod)
 * @property {String} hash - Store hash
 * @property {String} token - BigCommerce Stencil access token
 * @property {Number} port - Port to run Stencil on 
*/

/**
 * Prompts user for environment info. Called by `init` command
 * @return {UserInput}
*/
export async function promptUser() {
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

/**
 * Checks whether necessary local directories exist, creating if not
 * @param {String} envRoot - 
 * @param {String} keys
 * @param {String} config
 * @return {Void}
*/
export function checkDirs(envRoot, keys, config) {
    if (!(existsSync(envRoot))) {
        // Root /env folder does not exist. Create.
        mkdirSync(envRoot);

        // Create child dirs
        mkdirSync(keys, { recursive: true });
        mkdirSync(config, { recursive: true });
    } else {
        // Root /env folder exists. Check child dirs.
        if (!(existsSync(keys))) {
            // Keys subfolder does not exist. Create.
            mkdirSync(keys, { recursive: true });
        }

        if (!(existsSync(config))) {
            // Config subfolder does not exist. Create.
            mkdirSync(config, { recursive: true });
        }
    }

    // Add .gitignore file to env directory
    const ignoreFile = `${PATH_ENV}/.gitignore`;
    if (!(existsSync(ignoreFile))) {
        createIgnoreFile(ignoreFile);
    }
}

/**
 * Creates a copy of base config.json for environment. Called by `init` command.
 * @param {UserInput} envType - Destructured from `UserInput` (dev | stage | uat | prod)
 * @return {Void}
*/
export function checkConfig({ envType }) {
    const envConfigFile = `${PATH_ENVCONFIG}/${envType}.config.json`;

    if (!(existsSync(envConfigFile))) {
        // Config folder does not exist. Create.
        if (!(existsSync(BASE_CONFIG))) {
            // No base config to copy. Exit with error.
            return console.log(`\x1b[31mMissing theme config file at ${BASE_CONFIG}.\x1b[0m`);
        } else {
            console.log(`Copying ${BASE_CONFIG} to ${envConfigFile}`);
            copyFile(BASE_CONFIG, envConfigFile, (err) => {
                if (err) throw err;
            });
        }
    }
}

/**
 * Creates an environment-specific .env file from `UserInput`. Called by `init` function.
 * @param {String} envType - Environment (dev, stage, uat, prod)
 * @param {String} hash - BigCommerce store hash
 * @param {String} token - BigCommerce Stencil access token
 * @param {Number} port - Port to run Stencil on 
 * @return {Void}
*/
export function createEnvFile({ envType, hash, port, token }) {
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

export function createIgnoreFile(ignoreFile) {
    const ignoreText = "*";

    writeFile(ignoreFile, ignoreText, (err) => {
        if (err) {
            throw err;
        }
    });
}