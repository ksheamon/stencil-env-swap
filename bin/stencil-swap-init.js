#! /usr/bin/env node
import { checkConfig, checkDirs, createEnvFile, promptUser } from "../src/util.js";
import { PATH_ENV, PATH_ENVCONFIG, PATH_ENVKEYS } from "../src/constants.js";

async function init() {
    // 1. Gather input from user
    const userInput = await promptUser();

    // If any input is missing, error and escape
    if (!(userInput.envType && userInput.hash && userInput.token && userInput.port)) {
        console.log('Please provide all input data');
        process.exit();
    }
    console.log(`Initializing ${userInput.envType} for store ${userInput.hash} with token ****** on port ${userInput.port}`);

    // 2. Check for required directories
    checkDirs(PATH_ENV, PATH_ENVKEYS, PATH_ENVCONFIG);

    // 3. Copy config file overwriting existing
    checkConfig(userInput);

    // 4. Create env file
    createEnvFile(userInput);
}

init();