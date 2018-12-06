/*
 * 作者： jing.l.malan
 * 描述： 该文件作为与github进行交互的access token管理
 * 时间：2018年12月05日23:36:48
 */

const octokit = require('@octokit/rest')();
const Configstore = require('configstore');
const pkg = require('../package.json');
const _ = require('lodash');
const CLI = require('clui');
const Spinner = CLI.Spinner;
const chalk = require('chalk');
const inquirer = require('./inquirer');
const conf = new Configstore(pkg.name);

// 异步获取github token, 更好的用户体验， 加载animation
// const run = async () => {
//   const credentials = await inquirer.askGithubCredentials();
//   const status = new Spinner('认证正在进行中，请稍后...');
//   status.start();
  
// }

// run();
module.exports = {

  getInstance: () => {
    return octokit;
  },

  getStoredGithubToken : () => {
    return conf.get('github.token');
  },

  setGithubCredentials : async () => {
    const credentials = await inquirer.askGithubCredentials();
    octokit.authenticate(
      _.extend(
        {
          type: 'basic',
        },
        credentials
      )
    );
  },

  registerNewToken : async () => {
    const status = new Spinner('正在用户身份确认，请稍后...');
    status.start();
    try {
      const response = await octokit.authorization.create({
        scopes: ['user', 'public_repo', 'repo', 'repo:status'],
        note: 'gitfuninit是一款node.js命令行工具帮助你初始化git'
      });
      const token = response.data.token;
      if(token) {
        conf.set('github.token', token);
        return token;
      } else {
        throw new Error("Token获取出错了","网络响应中没有获取到github token");
      }
    } catch (err) {
      throw err;
    } finally {
      status.stop();
    }
  },
  githubAuth : (token) => {
    octokit.authenticate({
      type : 'oauth',
      token : token
    });
  },

  getStoredGithubToken : () => {
    return conf.get('github.token');
  },
}