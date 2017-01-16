'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('underscore.string');


module.exports = Generator.extend({
    /*  constructor: function () {
          Generator.apply(this, arguments);
  
          // This makes `moduleName` a required argument.
          this.argument('moduleName', {
              type: String,
              required: false
          });
  
      },*/

    /*
        prompting: function () {
            var done = this.async();
    
            // Have Yeoman greet the user.
    
            this.log(yosay(
                'Welcome to the ' + chalk.red('generator-ng-section') + ' generator!'
            ));
    
            var prompts = [{
                name: 'moduleName',
                message: 'What would you like to call this module?',
                default: this.moduleName,
                store: false
            }];
            var emptyPropmt = [];
            if (this.moduleName === undefined) {
                this.prompt(prompts, function (props) {
                    this.props = props;
                    // To access props later use this.props.someOption;
                    this.moduleName = props.moduleName;
                    done();
                }.bind(this));
            } else {
                this.prompt(emptyPropmt, function (props) {
                    this.moduleName = this.moduleName;
                    done();
                }.bind(this));
            }
    
        },*/
    scaffoldFolders: function () {
        this.mkdir(this.moduleName);
        //this.mkdir(this.moduleName+"/views");
    },
    writing: function () {
        var props = {};
        var folderName;
        props.moduleName = this.moduleName;
        if (this.module.indexOf('.') !== -1) {
            var paths = this.moduleName.split('.');
            folderName = paths[paths.length - 1];
        } else {
            folderName = this.moduleName;
        }

        props.folderName = folderName;
        props.capital = _.capitalize(props.folderName);
        this.fs.copy(
            this.templatePath('_module.js'),
            this.destinationPath('dummyfile.txt')
        )
    },

    // install: function() {
    //     this.installDependencies();
    // }

});
