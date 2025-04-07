#! /usr/bin/env node
import { checkEnvList, getEnvList } from '../src/util.js';

// Backward compatibility
await checkEnvList()

setTimeout(() => {
    const allEnvs = getEnvList();

    allEnvs.forEach((envType) => {
        console.log(envType);
    });
}, 1000);
