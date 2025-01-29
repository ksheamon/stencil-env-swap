#! /usr/bin/env -S node --experimental-modules --no-warnings

import { Command } from 'commander';

import { PACKAGE_INFO } from '../src/constants.js';

const program = new Command();

program.name('stencil-swap')
    .description(PACKAGE_INFO.description)
    .version(PACKAGE_INFO.version);

program.command(
    'init',
    'Initializes the tool by adding a new Stencil environment to run a BigCommerce store locally.'
);

program.command(
    'set [env]',
    'Change the active environment'
);

program.command(
    'who',
    'Displays a list of all configured environment types'
)

program.command(
    'whoami',
    'Displays the currently active environment'
);

program.parse();
