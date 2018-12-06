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
        message: '仓库公开还是私有？(请注意：github中，私有化仓库需要付费，请确认您有权限构造私有仓库)':',
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
        message: '请选择您想要忽略的文件或者文件夹:',
        choices: filelist,
        default: ['node_modules', 'bower_components']
      }
    ];
    return inquirer.prompt(questions);
  },
}