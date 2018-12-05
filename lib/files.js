/*
 * 作者： jing.l.malan
 * 描述： 该文件作为基本的文件管理
 * 时间： 2018年12月05日23:36:38
 */

const fs = require('fs');
const path = require('path');

module.exports = {
  getCurrentDirectoryBase : () => {
    return path.basename(process.cwd());
  },

  directoryExists : (filePath) => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  }
};

// 仅仅在当前目录中生效
// path.basename(path.dirname(fs.realpathSync(__filename)))
