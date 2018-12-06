#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files');
const inquirer  = require('./lib/inquirer');
const Configstore = require('configstore');
const github = require('./lib/github');
clear();

console.log(
  chalk.blue(
    figlet.textSync('gitfuninit', { horizontalLayout: 'full' })
  )
);

console.log(`\n正在加载....\n`);

const run = async () => {
  // let token = github.getStoredGithubToken();
  // if(!token) {
  //   await github.setGithubCredentials();
  //   token = await github.registerNewToken();    
  // }
  // console.log(token);
   try {
    // Retrieve & Set Authentication Token
    const token = await getGithubToken();
    github.githubAuth(token);

    // Create remote repository
    const url = await repo.createRemoteRepo();

    // Create .gitignore file
    await repo.createGitignore();

    // Set up local repository and push to remote
    const done = await repo.setupRepo(url);
    if(done) {
      console.log(chalk.green('All done!'));
    }
  } catch(err) {
      if (err) {
        switch (err.code) {
          case 401:
            console.log(chalk.red('登陆失败，请提供正确的资格认证token'));
            break;
          case 422:
            console.log(chalk.red('非常抱歉，已经存在同名的仓库了，根据规定，仓库名称不允许同名'));
            break;
          default:
            console.log(err);
        }
      }
  }
}

const getGithubToken = async () => {
  // Fetch token from config store
  let token = github.getStoredGithubToken();
  if(token) {
    return token;
  }

  // No token found, use credentials to access GitHub account
  await github.setGithubCredentials();

  // register new token
  token = await github.registerNewToken();
  return token;
}
run();

// if (files.directoryExists('.git')) {
//   console.log(chalk.red('git仓库已经存在了，创建失败，请检查!'));
//   process.exit();
// }


// const conf = new Configstore('ginit');
