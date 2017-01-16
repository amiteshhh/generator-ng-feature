'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

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
        // This method adds support for a `--skip-dep` flag
        this.option('skip-dep');//to customize reference adding in module dep
        // This method adds support for a `--skip-add` flag
        this.option('skip-add');//to customize reference adding in index.html

    },

    /*   config: function (params) {
           this.config.getAll();
           this.log(this.config.getAll());
       },*/

    writing: function () {
        var props = {};
        var folderName;
        props.moduleName = this.options.moduleName;
        props.folderName = props.moduleName.replace(/.*\./g, '');
        props.pascalSuffix = props.folderName.charAt(0).toUpperCase() + props.folderName.slice(1);
        this.options.path = this.options.path ? this.options.path + '/' : '';
        var newPathPrefix = this.options.path + props.folderName + '/' + props.folderName + '.';

        //template names are given to ease the copy operation in a loop
        // for complex folder structure you would like individual copy 
        var templates = ['module.js', 'route.js', 'service.js', 'controller.js', 'html'];
        templates.forEach(function (template) {
            this.fs.copyTpl(
                this.templatePath('module/' + template),
                this.destinationPath(newPathPrefix + template),
                props
            );
        }, this);
        //individual copy operation
        // this.fs.copyTpl(
        //     this.templatePath('module/_route.js'),
        //     this.destinationPath(newPathPrefix + '.route.js'),
        //     props
        // );
    }

});
