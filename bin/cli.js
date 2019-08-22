#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');

program
	.version(require('../package.json').version)
	.usage('<command> [options]');

program
	.command('init')
	.description('创建新项目')
	.action(_ => {
		require('./cli-init.js');
	});

program
	.command('list [cmd]')
	.alias('l')
	.description('显示所有模板')
	.option('-r, --recursive', 'List templates recursively')
	.action((cmd, options) => {
		console.log(cmd, options);
	});

program.on('--help', function () {
	console.log();
	console.log(chalk.yellow('Examples:'));
	console.log();
	console.log('  # 使用npm模板创建');
	console.log('   vis-cli init my-project');
	console.log();
});

program.parse(process.argv)

const input = program.args[0];

if (!input) {
	program.help();
	return;
}
