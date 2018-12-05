/*
 * 作者： jing.l.malan
 * 描述： 该文件作为与github进行交互的access token管理
 * 时间：2018年12月05日23:36:48
 */

const octokit     = require('@octokit/rest')();
const Configstore = require('configstore');
const pkg         = require('../package.json');
const _           = require('lodash');
const CLI         = require('clui');
const Spinner     = CLI.Spinner;
const chalk       = require('chalk');

const inquirer    = require('./inquirer');

const conf = new Configstore(pkg.name);
