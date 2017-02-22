# generator-ng-section

[Yeoman generator](http://yeoman.io/generators/) for creating new section/module/sub-module.

Content of the created files follows the John Papa [style guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md). Refer my [ionic seed](https://github.com/amiteshhh/ionicseed) project which this generator can best augment.

## Getting started

- Install: `npm install -g generator-ng-section`
- Run: `yo ng-section` _ofcourse you will be providing other arguments as well_


## Commands

`yo ng-section <module name> [relative path] [--skip-add]`
* __module name__ : required. It is the angular module name which you want to create. Folder/file names will be driven by this.
* __relative path__: optional. Path to parent under which new folder will be created. It is relative to the client directory.
* __skip-add__ : optional flag. Pass this flag if you don't want to add the newly created components script reference in `index.html` and module dependency injection to main module(typically `root > www > app > index.module.js`.

> If _module name_ argument contains the period character `.`, say `app.about`, we consider only equivalent extension while creating folder/file name.
  However angular module name will still be the same as provided one.


## Configuration

When you invoke the command for first time you will be asked to provide default path for your client source directory, main folder which contains the angular modules and main module file which contains all of the dependency of sub-modules.

Consider below project structure

```
├── root/
│   └── www/ /* This is your source/client directory*/
│       └── index.html
│       └── lib/
│       └── css/
│       └── app/ /* This is where your all modules resides*/
│           └── about/
│           └── index.module.js /* This is where you define all your angular dependencies*/

```
For this structure `www` is the client directory, `app` is the parentModule folder under which new folder/components will be created and `app/index.module.js` is the main module file where new module dependency would be injected.

You can specify these values when you run the command first time or by directly editing `.yo-rc.json`. 

**If most of the time you want the new folder to be created inside `root > www > app > main` you can specify main module parent path as `app/main` instead of default `app` i.e `"appModulesParentPath": "app/main"`**

Once setup is done this file looks like below

```
{
  "generator-ng-section": {
    "promptValues": {
      "wwwPath": "www",
      "appModulesParentPath": "app",
      "mainModuleFilePath": "app/index.module.js"
    }
  }
}
```


In order to automatically inject the new module as a dependency, your main module file (`index.module.js` in this example) must have a dependency array `requires` as defined below

```
(function () {
    'use strict';

    var moduleName = 'app',
            requires = [                                
                // app core
                'app.core',
                // home module
                "app.home"

            ];

    angular.module(moduleName, requires);

})();

```


## Example
 `yo ng-section about` or `yo ng-section about app` or `yo ng-section mymoule.someother.about`

### What do you get?

Both command will create a folder named `about` and other relevant files under `root > www > app` as shown below:

```
├── about/
│   └── about.module.js
│   └── about.route.js
│   └── about.service.js
│   └── about.controller.js
│   └── about.html

```
`yo ng-section about --skip-add`

It will create the above directory but neither script reference will be added to `index.html` nor the dependency of `about` module will be injected to `index.module.js` file.

## Providing relative path argument

`yo ng-section about common` or `yo ng-section app.about common`
It will create _about_ folder in the path `root > www > common`

`yo ng-section somemodule my/nested/folder`
It will create _somemodule_ folder in the path `root > www > my > nested > folder`

>Plugin will automaticall create non-existent directory.


## Generated File Content
Refer `example` [folder](https://github.com/amiteshhh/generator-ng-section/tree/master/example) of this repository.

## Request New Feature
Need new features? Please create a feature request on Github.

## License

MIT
