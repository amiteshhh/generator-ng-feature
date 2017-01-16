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
            desc: 'path inside which new folder will be created',
            required: false
        });
        // This method adds support for a `--skip-dep` flag
        this.option('skip-dep');//to customize reference adding in module dep
        // This method adds support for a `--skip-add` flag
        this.option('skip-add');//to customize reference adding in index.html

        // And you can then access it later; e.g.
        this.log(this.options.moduleName);
        this.log(this.options.skipdep);

    },

 /*   config: function (params) {
        this.config.getAll();
        this.log(this.config.getAll());
    },*/

    scaffoldFolders: function () {
        //this.mkdir(this.moduleName);
        //this.mkdir(this.moduleName+"/views");
    },

    writing: function () {
        var props = {};
        var folderName;
        props.moduleName = this.options.moduleName;
        if (props.moduleName.indexOf('.') !== -1) {
            var paths = props.moduleName.split('.');
            folderName = paths[paths.length - 1];
        } else {
            folderName = props.moduleName;
        }
        
        
        props.folderName = folderName;
        props.pascalSuffix = props.folderName.charAt(0).toUpperCase() + props.folderName.slice(1);
        this.options.path = this.options.path ? this.options.path + '/' : '';
        var newPathPrefix =  this.options.path + props.folderName + '/' + props.folderName;
        this.fs.copyTpl(
            this.templatePath('module/_module.js'),
            this.destinationPath(newPathPrefix + '.module.js'),
            props
        )
        this.fs.copyTpl(
            this.templatePath('module/_config.js'),
            this.destinationPath(newPathPrefix + '.config.js'),
            props
        )
        this.fs.copyTpl(
            this.templatePath('module/_service.js'),
            this.destinationPath(newPathPrefix + '.service.js'),
            props
        )
        this.fs.copyTpl(
            this.templatePath('module/_controller.js'),
            this.destinationPath(newPathPrefix + '.controller.js'),
            props
        )
        this.fs.copyTpl(
            this.templatePath('module/_view.js'),
            this.destinationPath(newPathPrefix + '.html'),
            props
        )
    }

});
