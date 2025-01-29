#! /usr/bin/env node
import PACKAGE_INFO from '../package.json' assert { type: "json" };
import * as path from 'path';
const ROOT_DIR = process.cwd();

// Derrived paths
const PATH_ENV = path.join(ROOT_DIR, '/env');
const PATH_ENVCONFIG = path.join(ROOT_DIR, '/env/config');
const PATH_ENVKEYS =  path.join(ROOT_DIR, '/env/keys');
const BASE_CONFIG = path.join(ROOT_DIR, '/config.json');

const ALLENVS = ['dev','stage','uat','prod'];
const ALLPMS = ['npm','yarn','pnpm'];
const STENCIL_HOST = 'https://api.bigcommerce.com';

// globalize the pattern for BC store URLs
const STOREURL_PATTERN = 'store-%%HASH%%.mybigcommerce.com';

// Name/Value combinations for env selection in CLI
const ENVOPTS = ALLENVS.map((env) => {
    return {
        'name': env,
        'value': env
    }
});

const PMOPTS = ALLPMS.map((pm) => {
    return {
        'name': pm,
        'value': pm
    }
});

export {
    ALLENVS,
    BASE_CONFIG,
    ENVOPTS,
    PACKAGE_INFO,
    ROOT_DIR,
    PATH_ENV,
    PATH_ENVCONFIG,
    PATH_ENVKEYS,
    PMOPTS,
    STENCIL_HOST,
    STOREURL_PATTERN
}
