(function () {
    'use strict';
    /**
     * Module: <%= moduleName %>
     * Configuration and Routing related stuff
     * Note: #### Tweak the route config as per your state and folder structure  ####
     */
 
    var moduleName = '<%= moduleName %>';

    angular.module(moduleName).config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider.state('<%= moduleName %>', {
            url: '/<%= routeUrl %>',
            views: {
                'menuContent': {
                    templateUrl: '<%= scriptPathPrefix %>html',
                    controller: '<%= componentNamePrefix %>Ctrl as vm'
                }
            }
        });
    }
})();
