#!/usr/bin/env node

import * as yargs from 'yargs';
import serve from './serve/cli';

yargs
    .usage('Usage: $0 <command> [options]')
    .strict()
    .help();

serve(yargs);

if (yargs.argv._.length === 0) {
    yargs.showHelp();
}
