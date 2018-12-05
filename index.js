const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files');
const inquirer  = require('./lib/inquirer');
const Configstore = require('configstore');

clear();

console.log(
  chalk.blue(
    figlet.textSync('gitfuninit', { horizontalLayout: 'full' })
  )
);

console.log(`\n\n正在加载....\n\n`);


// if (files.directoryExists('.git')) {
//   console.log(chalk.red('git仓库已经存在了，创建失败，请检查!'));
//   process.exit();
// }

const run = async () => {
  const credentials = await inquirer.askGithubCredentials();
  console.log(credentials);
}

run();

const conf = new Configstore('ginit');