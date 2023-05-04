import { exec } from 'child_process';
import * as dotenv from 'dotenv';

const configPath = `${process.cwd()}/env/keys/${process.env.APP_ENV}.env`;
dotenv.config({ path: configPath });
const _ENVS_ = ['dev','stage','prod'];

const $ENV = process.env.APP_ENV;

if(!$ENV) {
    console.log('Missing environment type! Enter \x1b[33mdev\x1b[0m, \x1b[33mstage\x1b[0m, or \x1b[33mprod\x1b[0m.');
    process.exit(1);
} else if (!(_ENVS_.indexOf($ENV) > -1)) {
    console.log('\x1b[101mIncorrect environment type! Enter \x1b[1mdev, stage, \x1b[101mor \x1b[101;1mprod.\x1b[0m');
    process.exit(1);
} else {
    const { STORE_HASH, STENCIL_TOKEN } = process.env;
    
    const normalStoreUrl = `https://store-${STORE_HASH}.mybigcommerce.com/`;
    const accessToken = `${STENCIL_TOKEN}`;
    const host = 'https://api.bigcommerce.com';
    const port = 3000;

    exec(`cp ./config/${$ENV}.config.json ../config.json`);

    exec(`stencil init --url ${normalStoreUrl} --token ${accessToken} --port ${port} --apiHost ${host}`);
}