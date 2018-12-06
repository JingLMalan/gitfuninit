/*
 * 作者： jing.l.malan
 * 描述： 该文件作为git仓库管理
 * 时间：2018年12月05日23:37:04
 */
const _ = require('lodash');
const fs = require('fs');
const git = require('simple-git')();
const CLI = require('clui')
const Spinner = CLI.Spinner;

const inquirer = require('./inquirer');
const gh = require('./github');

module.exports = {
  createRemoteRepo: async () => {
    const github = gh.getInstance();
    const answers = await inquirer.askRepoDetails();

    const data = {
      name : answers.name,
      description : answers.description,
      private : (answers.visibility === 'private')
    };

    const status = new Spinner('正在创建远程仓库...');
    status.start();

    try {
      const response = await github.repos.create(data);
      return response.data.ssh_url;
    } catch(err) {
      throw err;
    } finally {
      status.stop();
    }
  },
  createGitignore: async () => {
    const filelist = _.without(fs.readdirSync('.'), '.git', '.gitignore');

    if (filelist.length) {
      const answers = await inquirer.askIgnoreFiles(filelist);
      if (answers.ignore.length) {
        fs.writeFileSync( '.gitignore', answers.ignore.join( '\n' ) );
      } else {
        touch( '.gitignore' );
      }
    } else {
        touch('.gitignore');
    }
  },
   setupRepo: async (url) => {
    const status = new Spinner('Initializing local repository and pushing to remote...');
    status.start();

    try {
      await git
        .init()
        .add('.gitignore')
        .add('./*')
        .commit('Initial commit')
        .addRemote('origin', url)
        .push('origin', 'master');
      return true;
    } catch(err) {
      throw err;
    } finally {
      status.stop();
    }
  },
}