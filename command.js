#!/usr/bin/env node

const program = require('commander');
const execSh = require('exec-sh');
const fs = require('fs');
const path = require('path');
const { jsonToMap, mapToJson } = require('./utils');

const HOME = path.resolve(process.env.HOME, '.csh');
const STORE_PATH = path.resolve(HOME, 'store.json');

program
  .version('1.0.0')
  .description('CMD-Shortener');

program
  .command('define <shorthand> <command>')
  .alias('d')
  .description('Define shorthand')
  .action((shorthand, command) => {
    fs.readFile(STORE_PATH, 'utf8', function (err, content) {
      if (err) {
        if (err.code === 'ENOENT') {
          content = "{}";
        }
        else {
          console.log("An error occured while reading File.");
          return console.log(err);
        }
      }

      let commands = jsonToMap(content);
      commands.set(shorthand, command);

      content = mapToJson(commands);
      fs.writeFile(STORE_PATH, content, 'utf8', function (err) {
        if (err) {
          console.log("An error occured while writing File.");
          return console.log(err);
        }
      });
    });
  });

program
  .command('run <shorthand>')
  .alias('r')
  .description('Execute command using shorthand')
  .action((shorthand) => {
    fs.readFile(STORE_PATH, 'utf8', function (err, content) {
      if (err) {
        console.log("An error occured while reading File.");
        return console.log(err);
      }

      let commands = jsonToMap(content);
      if (commands.has(shorthand)) {
        execSh(commands.get(shorthand));
      }
    });
  });

program.parse(process.argv);