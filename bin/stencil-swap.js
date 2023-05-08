#! /usr/bin/env node
import { Command } from 'commander';

import { PACKAGE_INFO } from '../constants.cjs';

const program = new Command();

program.name('stencil-swap')
    .description(PACKAGE_INFO.description)
    .version(PACKAGE_INFO.version);

program.command(
    'init',
    'Initialize the tool by adding a new Stencil environment to run a BigCommerce store locally.'
);

program.command(
    'which',
    'Output the currently active environment'
)

program.command(
    'set [env]',
    'Change the active environment'
);

program.parse();