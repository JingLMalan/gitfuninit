const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files');
const inquirer  = require('./lib/inquirer');
const Configstore = require('configstore');
const CLI         = require('clui');
const Spinner     = CLI.Spinner;

clear();

console.log(
  chalk.blue(
    figlet.textSync('gitfuninit', { horizontalLayout: 'full' })
  )
);

console.log(`\n正在加载....\n`);


// if (files.directoryExists('.git')) {
//   console.log(chalk.red('git仓库已经存在了，创建失败，请检查!'));
//   process.exit();
// }

const run = async () => {
  const credentials = await inquirer.askGithubCredentials();
  const status = new Spinner('认证正在进行中，请稍后...');
  status.start();
  
}

run();

// const conf = new Configstore('ginit');
