const download = require('download-git-repo');
const path = require('path');
const ora = require('ora');

module.exports = function (target) {
    target = path.join(target || '.', '')
    return new Promise((resolve, reject) => {
        const spinner = ora(`正在下载项目模板...`);
        spinner.start();

        download('https://github.com:izhaolongfei/vis-template#master', target, {clone: true}, err => {
            if (err) {
                spinner.fail();
                reject(err);
            } else {
                spinner.succeed();
                resolve(target);
            }
        });
    })
}
