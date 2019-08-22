#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
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
        choices: ['card', 'card-atom', 'view'],
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

    let src = child_process.execSync('npm config get prefix').toString().trim() + '/lib/node_modules/vis-cli/templates';
    let dist = root;

    mods.forEach(mod => {
        if (mod === 'card') {
            src += `/card`;
            dist += `/src/card/normal/${pro}`;
        } else if (mod === 'card-atom') {
            src += `/card-atom`;
            dist += `/src/card-atom/${pro}`;
        } else if (mod === 'view') {
            src += '/view';
            dist += `/src/view/${pro}`;
        }

        const dir = path.dirname(dist);
        if (!fs.existsSync(dir)) {
            console.log(chalk.red(`\n路径错误：【${dir}】`));
            return;
        }

        if (fs.existsSync(dist)) {
            console.log(chalk.red(`\n【${mod}:${pro}】已经存在`));
            return;
        }

        copyDir(src, dist);
    });

    spinner.succeed('模版创建完毕');
}

/**
 * 复制文件
 * @param {string} src 源目录
 * @param {sring} dist 目标目录
 */
function copyDir(src, dist) {
    child_process.spawn('cp', ['-r', src, dist]);
}