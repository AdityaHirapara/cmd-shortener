#!/usr/bin/env node

const program = require('commander');
const execSh = require('exec-sh');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { prompt } = require('inquirer');
const { jsonToMap, mapToJson } = require('./utils');

if (process.env.HOME || process.env.HOMEPATH) {
  var HOME = path.resolve(process.env.HOME || process.env.HOMEPATH, '.csh');
  var STORE_PATH = path.resolve(HOME, 'store.json');
} else {
  console.error(chalk`{bgRed ERR} {bgYellow Initialization} Environment variable HOME (Linux) or HOMEPATH (Windows) are not set!`);
  console.error(chalk`{bgRed ERR} {bgYellow Initialization} Trying to use Environment variable USER (Linux) or USERPROFILE (Windows)`);

  if(process.env.USER) {
    var HOME = path.resolve('/home', process.env.USER, '.csh');
    var STORE_PATH = path.resolve(HOME, 'store.json');
  } else if (process.env.USERPROFILE) {
    var HOME = path.resolve(process.env.USERPROFILE, '.csh');
    var STORE_PATH = path.resolve(HOME, 'store.json');
  } else {
    console.error(chalk`{bgRed ERR} {bgYellow Initialization} Please set environment variable HOME (Linux) or HOMEPATH (Windows).`);
  }
}

if (!fs.existsSync(HOME)) {
  try {
    require('mkdirp').sync(HOME);
  } catch (e) {
    console.log(chalk`{bgRed ERR} Something went wrong while initialization!`);
  }
}

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
        } else {
          return console.log(chalk`{bgRed ERR} Something went wrong while saving your shorthands!`);
        }
      }

      let commands = jsonToMap(content);
      if (!commands.has(shorthand)) {
        commands.set(shorthand, command);

        content = mapToJson(commands);
        fs.writeFile(STORE_PATH, content, 'utf8', function (err) {
          if (err) {
            return console.log(chalk`{bgRed ERR} Something went wrong while saving your shorthands!`);
          }
        });
      } else {
        let question = [{
          type: 'confirm',
          name: 'overwrite',
          message: `You have already defined "${shorthand}" shorthand, Are you sure you want to overwrite it?`
        }];
        prompt(question).then((answer) => {
          if (!answer) {
            return;
          }
          commands.set(shorthand, command);

          content = mapToJson(commands);
          fs.writeFile(STORE_PATH, content, 'utf8', function (err) {
            if (err) {
              return console.log(chalk`{bgRed ERR} Something went wrong while saving your shorthands!`);
            }
          });
        });
      }
    });
  });

program
  .command('run <shorthand>')
  .alias('r')
  .description('Execute command using shorthand')
  .action((shorthand) => {
    fs.readFile(STORE_PATH, 'utf8', function (err, content) {
      if (err) {
        if (err.code === 'ENOENT') {
          content = "{}";
        } else {
          return console.log(chalk`{bgRed ERR} Something went wrong while getting your shorthands!`);
        }
      }

      let commands = jsonToMap(content);
      if (commands.has(shorthand)) {
        execSh(commands.get(shorthand));
      } else {
        console.log(chalk`{bgYellow WARN} shorthand:${shorthand} is not defined!\n You can define it by hitting {bold csh d ${shorthand} <command>}.`)
      }
    });
  });

program.parse(process.argv);