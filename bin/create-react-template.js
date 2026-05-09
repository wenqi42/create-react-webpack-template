#!/usr/bin/env node
import fse from 'fs-extra';
import fg from 'fast-glob';
import path from 'path';
import prompts from 'prompts';
import * as commander from 'commander';
import {exec} from 'child_process';
import mergeConfigJson from './template.config.json' with {type: 'json'};
const templateFiles = fse.readdirSync(path.resolve(import.meta.dirname, '../template'));

const absolutePath = p => path.resolve(import.meta.dirname, p);
const program = new commander.Command();

const execPath = process.cwd();

const __replace__placeholder__name__ = '__replace__placeholder__name__';

program
  .name('create-react-template')
  .description('quickly create react template app with config file')
  .version('0.0.1')
  .argument('[projectName]', 'project name')
  .option('-n, --name <projectName>')
  .option('-t, --template <template>')
  .option('-d, --dir <dir>')
  .option('--eslint <eslint>')
  .option('--prettier <prettier>')
  .allowUnknownOption(false)
  .allowExcessArguments(false);

const args = program.parse(process.argv);
/**
 * @type {Parameters<typeof prompts>[0]}
 */
const asks = [
  {type: 'text', name: 'projectName', message: "what's your project name?"},
  {
    type: 'select',
    name: 'template',
    message: 'please choose a template',
    choices: templateFiles.map(file => ({title: file, value: file})),
  },
  {type: 'confirm', name: 'eslint', message: 'need eslint?'},
  {type: 'confirm', name: 'prettier', message: 'need prettier'},
];

/**
 *
 * @param { {
 * scripts:(Record<string,string>|null)[];
 * dependencies:(Record<string,string>|null)[];
 * devDependencies:(Record<string,string>|null)[];
 * name:string
 * } } params
 */
const createPurePackageJson = async params => {
  let {scripts, name, dependencies, devDependencies} = params;
  const basePackageJson = JSON.parse(fse.readFileSync(absolutePath('./_package.json'), {encoding: 'utf-8'}));
  let jsonScript = basePackageJson.scripts;
  let jsonDependencies = basePackageJson.dependencies;
  let jsonDevDependencies = basePackageJson.devDependencies;
  scripts.forEach(sci => sci && Object.assign(jsonScript, sci));
  dependencies.forEach(dpi => dpi && Object.assign(jsonDependencies, dpi));
  devDependencies.forEach(dvdi => dvdi && Object.assign(jsonDevDependencies, dvdi));
  basePackageJson.scripts = jsonScript;
  basePackageJson.dependencies = jsonDependencies;
  basePackageJson.devDependencies = jsonDevDependencies;
  return basePackageJson;
};

const initTemplate = async () => {
  let argus = args.args;
  let opts = args.opts();
  let alreadySupply = {
    projectName: opts.name ?? argus[0],
    template: opts.template,
    dir: path.resolve(execPath, opts.dir || ''),
  };
  const ask = await prompts(asks.filter(ask => !alreadySupply[ask.name]));

  let {projectName, dir, template, prettier, eslint} = Object.assign(alreadySupply, ask);

  const templateFilePath = path.resolve(import.meta.dirname, '../template', template);

  const destination = path.resolve(dir, projectName);
  const files = fse.copySync(templateFilePath, destination, {errorOnExist: false, overwrite: true});
  let configFiles = mergeConfigJson.includes || [];

  let eslintConfig = mergeConfigJson.packageMerge.eslint;
  let prettierConfig = mergeConfigJson.packageMerge.prettier;
  if (eslint) {
    configFiles = configFiles.concat(eslintConfig.files);
  }
  if (prettier) {
    configFiles = configFiles.concat(prettierConfig.files);
  }
  configFiles.filter(Boolean).forEach(i => {
    const absoluteOrigin = path.resolve(import.meta.dirname, '../', i);
    if (!fse.existsSync(absoluteOrigin)) return;
    const stat = fse.statSync(absoluteOrigin);
    if (stat.isDirectory()) {
      // 目录：整体拷贝到 destination 下
      fse.copySync(absoluteOrigin, path.resolve(destination, i), {errorOnExist: false, overwrite: true});
    } else {
      // 文件：拷贝到 destination 下
      fse.copyFileSync(absoluteOrigin, path.resolve(destination, i));
    }
  });

  let newPackage = await createPurePackageJson({
    name: projectName,
    scripts: [eslintConfig.scripts, prettierConfig.scripts],
    dependencies: [
      //@ts-ignore
      eslintConfig.dependencies || [],
      //@ts-ignore
      prettierConfig.dependencies || [],
      template === 'react-router' ? mergeConfigJson.packageMerge['react-router']?.dependencies : null,
    ],
    devDependencies: [eslintConfig.devDependencies, prettierConfig.devDependencies],
  });

  fse.createFileSync(path.resolve(destination, 'package.json'));
  fse.writeFileSync(path.resolve(destination, 'package.json'), JSON.stringify(newPackage, null, 2));

  const replaceFiles = await fg([`${destination}/**/*.(js|ts|tsx|jsx|json)`]);
  replaceFiles.forEach(i => {
    const fileItem = fse.readFileSync(i, {encoding: 'utf-8'});
    const newFileReplace = fileItem.replaceAll(__replace__placeholder__name__, projectName);
    fse.writeFileSync(i, newFileReplace);
  });

  exec(`echo create ${projectName} app completely !!`);
};

initTemplate();
