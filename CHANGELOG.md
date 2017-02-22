# Change Log
All notable changes to this project is documented in this file.

## [1.0.0] - 2017-02-23
### New Feature
- Support for configuring the path for client/front-end codebase folder relative to project directory, main angular module app file (typically `app/index.module.js`) and main app path (typically `app` folder under which all your submodules resides). 

    Configuration is created when you run the command for first time and is stored in `.yo-rc.json` file which you can modify later directly.
- Created modules/components script reference added to `index.html` and module dependency injected to main module 
- Added support for bypassing above operation by  passing argument `--skip-add` while invoking command

### Changed
- Now new component not created under `root` directory. Its created always relative to client/src directory which you set when you run the command first time.  
  By default the new folder is created inside main app path or else you can provide it as a option while invoking the command. 
