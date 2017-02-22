/*globals require, module */
'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var fs = require('fs');
var path = require('path');

var cheerio = require('cheerio');
var program = require("ast-query");

module.exports = Generator.extend({
    constructor: function () {
        Generator.apply(this, arguments);
        // This makes `moduleName` a required argument.
        this.argument('moduleName', {
            type: String,
            desc: 'moduleName is the angular module that you want to register. e.g app.home or home etc..',
            required: true
        });

        this.argument('path', {
            type: String,
            desc: 'path inside which new folder will be created. Default is root.',
            required: false
        });
        // This method adds support for a `--skip-add` flag
        this.option('skip-add');//to customize reference adding in index.html

    },

    prompting: function () {

        var configs = this.config.getAll();
        if (configs && configs.promptValues) {
            return;
        }
        this.log(yosay('Welcome to yo-ng-section!'));
        this.log(
            chalk.magenta(
                'Tell me your loation of html/js source folder/files. Later you can directly edit .yo-rc.json file to change these values' +
                '\n'
            )
        );

        return this.prompt([{
            type: 'input',
            name: 'wwwPath',
            message: 'Client/front-end codebase path relative to project directory - typically www, client or src etc.',
            default: 'www',
            store: true
        }, {
            type: 'input',
            name: 'appModulesParentPath',
            message: 'Default parent folder path w.r.t client source code folder where new angular modules will be generated? You can override it by passing arguments while invoking yo command',
            default: 'app',
            store: true
        }, {
            type: 'input',
            name: 'mainModuleFilePath',
            message: 'Path of main module js file w.r.t client source code folder? Main module contains the dependencies of other modules.',
            default: 'app/index.module.js',
            store: true
        }]);
    },

    writing: function () {
        var props = {}, generator = this;

        // props variables used when processing the templates 
        props.moduleName = generator.options.moduleName;
        props.folderName = props.moduleName.replace(/.*\./g, '').toLowerCase();
        props.preetyModuleName = props.folderName;
        props.componentNamePrefix = props.folderName.charAt(0).toUpperCase() + props.folderName.slice(1);
        if (props.componentNamePrefix.length < 3) {
            props.componentNamePrefix = props.componentNamePrefix.toUpperCase();
        }

        var paths = getPaths();
        props.scriptPathPrefix = paths.scriptPathPrefix;
        props.routeUrl = paths.routeUrl;

        //template names are given so as to ease the copy operation in a loop
        // for complex folder structure you would like individual copy 
        var templates = ['module.js', 'route.js', 'service.js', 'controller.js'];

        templates.concat('html').forEach(function (template) {
            generator.fs.copyTpl(
                generator.templatePath('module/' + template),
                generator.destinationPath(paths.destPathPrefix + template),
                props
            );
        });

        if (!generator.options['skip-add']) {
            addScriptToIndex();
            insertDepToMainModule();
        }

        function addScriptToIndex() {
            var indexFileContent, scriptTags = '', indexFilePath = generator.destinationPath(paths.wwwPath + '/index.html');
            try {
                indexFileContent = generator.fs.read(indexFilePath);
            } catch (err) {
                generator.log.error(chalk.yellow(
                    '\nUnable to find index.html at ' + indexFilePath + '. Script reference not added.\n'
                ));
            }

            var $ = cheerio.load(indexFileContent);

            var $body = $('body');
            if ($body.length === 0) {
                generator.log.error(chalk.yellow(
                    '\No <body> tag present in index.html. Script reference not added.\n'
                ));
                return;
            }

            templates.forEach(function (template) {
                var pathToJS = paths.scriptPathPrefix + template;
                var scriptSel = 'script[src="' + pathToJS + '"]';
                if (!$body.find(scriptSel).length) {
                    scriptTags += '  <script src="' + pathToJS + '"></script>\n';
                } else {
                    generator.log(chalk.gray(
                        'Script references of ' + pathToJS + ' already exists in index.html.'
                    ));
                }

            });
            if (!scriptTags) {
                generator.log(chalk.cyan(
                    'Generated files script reference already exists in index.html.'
                ));
                return;
            }
            //adding banner
            scriptTags = '  <!--  module : ' + props.moduleName + '  -->\n' +
                scriptTags +
                '  <!--  End of module : ' + props.moduleName + '  -->\n';

            $body.append(scriptTags);

            fs.writeFile(indexFilePath, $.html(), function (err) {
                if (err) {
                    generator.log.error(chalk.yellow(
                        '\nError writing script reference to index.html.'
                    ));
                } else {
                    generator.log(chalk.green(
                        '\nScripts references added to the index.html.'
                    ));
                }
            });


        }

        function insertDepToMainModule() {
            var mainModuleFileContent, mainModuleFilePath = paths.mainModuleFilePath;
            try {
                mainModuleFileContent = generator.fs.read(mainModuleFilePath);
            } catch (err) {
                generator.log.error(chalk.yellow(
                    '\nUnable to inject module dependency of ' + props.moduleName + ' as main module file at ' + mainModuleFilePath + ' not found.'
                ));
                return;
            }
            var tree = program(mainModuleFileContent);
            var requiresArr = tree.var('requires');
            if (requiresArr.length === 0) {
                generator.log.error(chalk.yellow(
                    '\nUnable to inject module dependency of ' + props.moduleName + ' as array `requires` not present in main module file ' + mainModuleFilePath
                ));
                return;
            }
            var requiresArrValue = requiresArr.value();
            if (requiresArrValue.type !== 'ArrayExpression') {
                generator.log.error(chalk.yellow(
                    '\nUnable to inject module dependency of ' + props.moduleName + ' as variable `requires` present in main module file ' + mainModuleFilePath + ' must be an array containing the dependent modules.'
                ));
                return;
            }
            try {
                for (var i = 0; ; i++) {
                    var astWrappedModuleNode = requiresArrValue.at(i);
                    if (astWrappedModuleNode.value() === props.moduleName) {
                        generator.log(chalk.cyan(
                            'Module dependency already injectd in main module ' + mainModuleFilePath
                        ));
                        return;
                    }
                }
            } catch (err) {//dependency does not exist 
                var moduleTag = "// " + props.preetyModuleName + " module\n'" + props.moduleName + "'";
                requiresArrValue.push(moduleTag);
                fs.writeFile(mainModuleFilePath, tree.toString(), function (err) {
                    if (err) {
                        generator.log.error(chalk.yellow(
                            '\nError writing dependency injection to main module ' + mainModuleFilePath
                        ));
                    } else {
                        generator.log(chalk.green(
                            '\nmodule dependency injected to main module ' + mainModuleFilePath
                        ));
                    }
                });
            }
        }

        function getPaths() {
            var wwwPath, appModulesParentPath, mainModuleFilePath, destPathPrefix, scriptPathPrefix, routeUrl;
            var baseParentFolder = 'app';
            var configs = generator.config.getAll();
            if (configs && configs.promptValues) {
                wwwPath = configs.promptValues.wwwPath;
                appModulesParentPath = configs.promptValues.appModulesParentPath;
                if(appModulesParentPath){
                    baseParentFolder = appModulesParentPath.split('/')[0];
                }
                baseParentFolder = appModulesParentPath || baseParentFolder;
                mainModuleFilePath = configs.promptValues.mainModuleFilePath;
            }
            if (generator.options.path) {
                appModulesParentPath = generator.options.path;
            }
            wwwPath = wwwPath || 'www';
            appModulesParentPath = appModulesParentPath || 'app';
            mainModuleFilePath = mainModuleFilePath || 'app/index.module.js';

            mainModuleFilePath = path.join(wwwPath, mainModuleFilePath);

            var replace = baseParentFolder +'\/';
            var regex = new RegExp(replace, "i");

            routeUrl = path.posix.join(appModulesParentPath, props.folderName).replace(regex, '');
            scriptPathPrefix = path.posix.join(appModulesParentPath, props.folderName, props.folderName) + '.';
            destPathPrefix = path.join(wwwPath, appModulesParentPath, props.folderName, props.folderName) + '.';
            return {
                wwwPath: wwwPath,
                mainModuleFilePath: mainModuleFilePath,
                scriptPathPrefix: scriptPathPrefix,
                destPathPrefix: destPathPrefix,
                routeUrl: routeUrl
            };
        }
    }

});
