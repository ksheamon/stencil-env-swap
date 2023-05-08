/// //////////////////////////////////////   Stencil CLI   ///////////////////////////////////// ///

const PACKAGE_INFO = require('./package.json');

/// ////////////////////////////////////////   Themes   /////////////////////////////////////// ///

const ROOT_DIR = process.cwd();

const PATH_ENV = `${ROOT_DIR}/env`;
const PATH_ENVCONFIG = `${ROOT_DIR}/env/config`;
const PATH_ENVKEYS = `${ROOT_DIR}/env/keys`;

const BASE_CONFIG = `${ROOT_DIR}/config.json`;

const ALLENVS = ['dev','stage','uat','prod'];

const STENCIL_HOST = 'https://api.bigcommerce.com';

const ENVOPTS = ALLENVS.map((env) => {
    return {
        'name': env,
        'value': env
    }
});

module.exports = {
    ALLENVS,
    BASE_CONFIG,
    ENVOPTS,
    PACKAGE_INFO,
    ROOT_DIR,
    PATH_ENV,
    PATH_ENVCONFIG,
    PATH_ENVKEYS,
    STENCIL_HOST
}