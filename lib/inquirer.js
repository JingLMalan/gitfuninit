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
}