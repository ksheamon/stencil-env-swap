#! /usr/bin/env node
import { appendEnvList, checkConfig, checkDirs, checkEnvList, createEnvFile, promptUser } from "../src/util.js";
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

    // 3. Backward compatibility - create if not exist
    await checkEnvList();

    // 4. Copy config file overwriting existing
    checkConfig(userInput);

    // 5. Create env file
    createEnvFile(userInput);

    // 6. Add env to types list
    appendEnvList(userInput);
}

init();
