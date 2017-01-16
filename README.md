# generator-ng-section

[Yeoman generator]() for creating new section/module/sub-module.

Content of the created files follows the John Papa style guide. Refer my [ionic seed](https://github.com/amiteshhh/ionicseed) project which this generator can best augment.

## Getting started

- Install: `npm install -g generator-ng-section`
- Run: `yo ng-section`


## Commands

`yo ng-section <module name> [relative path] [--skip-add] [--skip-dep]`
* __module name__ : required. It is the angular module name which you want to create. Folder/file names will be driven by this.
* __relative path__: optional. Path to parent under which new folder will be created.
* __skip-add__ : optional flag. Pass this flag if you dont want to add the reference file in index.html. This feature is in progress :)
* __skip-dep__ : optional flag. Pass this flag if you dont want to add the new module as a dependency to your `app` module. This feature is in progress :)

> If _module name_ argument contains the period character(.) say `app.about` we consider only equivalent extension while creating folder/file name.
  However angular module name will still be the same as provided one inside created files.


>By default, folder is created in the directory from which command is invoked.


## Example
 `yo ng-section about` or `yo ng-section mymoule.someother.about`

### What do you get?

Both command will create a folder named 'about'and other relevant files as shown below:

```
.
├── about/
│   └── about.module.js
│   └── about.route.js
│   └── about.service.js
│   └── about.controller.js
│   └── about.html

```

## Providing relative path argument

It could be annoying if each time you have to `cd` to parent directory and then invoke it to appropriately place the created folder. The way out is passing second argument.

`yo ng-section about www/app`
It will create _about_ folder in the path `root > www > app`


## File Content
Refer `example` [folder](https://github.com/amiteshhh/generator-ng-section/tree/master/example) of this repository.

## Future Enhancement

* Adding reference of created files to index.html
* Adding module dependency of created module in the app module.
* support for configuring the path for index file, main angular module app file and relative path for project.

## License

MIT
