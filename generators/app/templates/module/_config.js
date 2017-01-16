(function () {
    'use strict';
    /**
     * Module: <%= moduleName %>
     * Configuration and Routing related stuff
     * Tweak the rout config as per the state and folder structure
     */
    var moduleName = '<%= moduleName %>';

    angular.module(moduleName).config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
        $stateProvider.state('<%= moduleName %>', {
            url: '/<%= folderName %>',
            views: {
                'menuContent': {
                    templateUrl: 'app/main/<%= folderName %>/<%= folderName %>.html',
                    controller: '"<%= capital %>Ctrl" as vm'
                }
            }
        });
    }
})();
