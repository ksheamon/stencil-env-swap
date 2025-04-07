#! /usr/bin/env node
import { checkEnvList, getEnvList } from '../src/util.js';

// Backward compatibility - create if not exist
checkEnvList();

const allEnvs = getEnvList();

allEnvs.forEach((envType) => {
    console.log(envType);
});
