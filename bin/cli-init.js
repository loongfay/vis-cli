#!/usr/bin/env node

const program = require('commander');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const download = require('../lib/download');
const inquirer = require('inquirer');
const chalk = require('chalk');

program.usage('<project-name>').parse(process.argv);

const input = program.args[0];

if (!input) {
    program.help();
    return;
}

const [moduleName, projectName] = input.split('/');

// console.log(moduleName, projectName);

if (!['card', 'atom-card', 'view'].includes(moduleName) || !projectName) {
    program.help();
    return;
}

const currPath = process.cwd();
const rootDir = path.basename(currPath);
const list = glob.sync('*');

// console.log(projectName, list);

let next = undefined;

if (list.length) {
    if (list.filter(name => {
        const filename = path.resolve(currPath, path.join('.', name));
        const isDir = fs.statSync(filename).isDirectory();
        return name.indexOf(projectName) !== -1 && isDir;
    }).length !== 0) {
        console.log(chalk.red(`【${projectName}】已经存在`));
        return;
    }
    next = Promise.resolve(projectName);
}
// else if (rootDir === projectName) {
//     next = inquirer.prompt([
//         {
//             name: 'buildInCurrent',
//             message: '当前目录为空，且目录名称和项目名称相同，是否直接在当前目录下创建新项目？',
//             type: 'confirm',
//             default: true
//         }
//     ]).then(answer => {
//         return Promise.resolve(answer.buildInCurrent ? '.' : projectName)
//     })
// }
else {
    next = Promise.resolve(projectName)
}

next && go();

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
