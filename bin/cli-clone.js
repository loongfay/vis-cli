#!/usr/bin/env node

const glob = require('glob');
const download = require('../lib/download');

function go() {
    next.then(projectRoot => {
        // if (projectRoot !== '.') {
        //     fs.mkdirSync(projectRoot)
        // }
        return download(projectRoot).then(target => {
            if (moduleName !== 'card') {
                removeDir(`${currPath}/${projectRoot}/card`);
            }
            if (moduleName !== 'atom-card') {
                removeDir(`${currPath}/${projectRoot}/atom-card`);
            }
            if (moduleName !== 'view') {
                removeDir(`${currPath}/${projectRoot}/view`);
            }
            moveFiles(`${currPath}/${projectRoot}/${moduleName}`, `${currPath}/${projectRoot}`);
            return {
                projectRoot,
                downloadTemp: target
            }
        })
    })
}

function removeDir(dir) {
    let files = fs.readdirSync(dir)
    for (var i = 0; i < files.length; i++) {
        let newPath = path.join(dir, files[i]);
        if (fs.statSync(newPath).isDirectory()) {
            // 如果是文件夹就递归下去
            removeDir(newPath);
        } else {
            // 删除文件
            fs.unlinkSync(newPath);
        }
    }
    fs.rmdirSync(dir); // 如果文件夹是空的，就将自己删除掉
}

function moveFiles(dirFrom, dirTo) {
    let files = fs.readdirSync(dirFrom)
    for (let i = 0; i < files.length; i++) {
        let oldPath = path.join(dirFrom, files[i]);
        let newPath = path.join(dirTo, files[i]);
        fs.renameSync(oldPath, newPath);
    }
    fs.rmdirSync(dirFrom);
}
