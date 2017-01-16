(function () {
    'use strict';
    /**
     * Module: app.example
     * Configuration and Routing related stuff
     * Note: #### Tweak the route config as per your state and folder structure  ####
     */
    var moduleName = 'app.example';

    angular.module(moduleName).config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider.state('app.example', {
            url: '/example',
            views: {
                'menuContent': {
                    templateUrl: 'app/main/example/example.html',
                    controller: '"ExampleCtrl" as vm'
                }
            }
        });
    }
})();
