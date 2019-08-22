#!/usr/bin/env node

const fs = require('fs');
const inquirer = require('inquirer');
const ora = require('ora');
const chalk = require('chalk');
const child_process = require('child_process');
const root = process.cwd();

const next = inquirer.prompt([
    {
        type: 'checkbox',
        name: 'modules',
        message: '请选择模块',
        choices: ['card', 'atom-card', 'view'],
        // default: ['card'],
        validate: function (opts) {
            if (opts.length) {
                return true;
            } else {
                return '至少选择一个模块'
            }
        }
    },
    {
        type: 'input',
        name: 'project',
        message: '请输入目录名',
        validate: function (input) {
            if (input) {
                return true;
            } else {
                return '输入不合法';
            }
        }
    }
]).then(answer => {
    return Promise.resolve(answer);
});

next.then(answer => {
    createProject(answer.modules, answer.project);
});

/**
 * 创建项目
 * @param {string} mod 模块名
 * @param {string} pro 项目名
 */
function createProject(mods, pro) {
    const spinner = ora('正在生成项目模板...')
    spinner.start();

    let src = child_process.execSync('npm config get prefix').toString().trim() + '/bin/vis-cli/template';
    let dist = root;

    mods.forEach(mod => {
        if (mod === 'card') {
            src += `/card`;
            dist += `/src/card/normal/${pro}`;
        } else if (mod === 'atom-card') {
            src += `/atom-card`;
            dist += `/src/atom-card/${pro}`;
        } else if (mod === 'view') {
            src += '/view';
            dist += `/src/view/${pro}`;
        }
    
        if (fs.existsSync(dist)) {
            console.log(chalk.red(`【${dist}】已经存在`));
            return;
        }

        copyDir(src, dist);
    });

    spinner.succeed();
}

/**
 * 复制文件
 * @param {string} src 源目录
 * @param {sring} dist 目标目录
 */
function copyDir(src, dist) {
    child_process.spawn('cp', ['-r', src, dist]);
}