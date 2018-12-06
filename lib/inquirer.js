/*
 * 作者： jing.l.malan
 * 描述： 该文件作为命令行交互
 * 时间： 2018年12月05日23:36:55
 */
const inquirer   = require('inquirer');
const files      = require('./files');

module.exports = {
  askGithubCredentials: () => {
    const questions = [
      {
        name: '用户名',
        type: 'input',
        message: '请输入您的github用户名或者邮箱:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return '请输入您的github用户名或者邮箱:';
          }
        }
      },
      {
        name: '密码',
        type: 'password',
        message: '输入您的密码:',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return '请输入您的密码:';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
  askRepoDetails: () => {
    const argv = require('minimist')(process.argv.slice(2));

    const questions = [
      {
        type: 'input',
        name: '名字',
        message: '请输入仓库的名字:',
        default: argv._[0] || files.getCurrentDirectoryBase(),
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return '请输入仓库的名字:';
          }
        }
      },
      {
        type: 'input',
        name: '描述',
        default: argv._[1] || null,
        message: '请输入仓库的描述:'
      },
      {
        type: 'list',
        name: 'visibility',
        message: 'Public or private:',
        choices: [ 'public', 'private' ],
        default: 'public'
      }
    ];
    return inquirer.prompt(questions);
  },
  askIgnoreFiles: (filelist) => {
    const questions = [
      {
        type: 'checkbox',
        name: 'ignore',
        message: 'Select the files and/or folders you wish to ignore:',
        choices: filelist,
        default: ['node_modules', 'bower_components']
      }
    ];
    return inquirer.prompt(questions);
  },
}