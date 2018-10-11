#!/usr/bin/env node

const program = require('commander');

program
  .version('1.0.0')
  .description('CMD-Shortener');

program
  .command('define <shorthand> <command>')
  .alias('d')
  .description('Define shorthand')
  .action((shorthand, command) => console.log(shorthand, command));

program
  .command('run <shorthand>')
  .alias('r')
  .description('Execute command using shorthand')
  .action((shorthand) => console.log(shorthand));

program.parse(process.argv);