(function () {
    'use strict';
    /**
     * @ngdoc controller
     * @module <%= moduleName %>
     * @name <%= componentNamePrefix %>Ctrl
     * @description
     * Controller to manage <%= folderName %>
     * @requires #/api/<%= moduleName %>/service/<%= componentNamePrefix %>Svc <%= componentNamePrefix %>Svc
     */
    
    var moduleName = '<%= moduleName %>';

    angular.module(moduleName)
        .controller('<%= componentNamePrefix %>Ctrl', Ctrl);

    Ctrl.$inject = ['$injector', '$rootScope'];
    function Ctrl($injector, $rootScope) {
        var vm = this;
        var <%= componentNamePrefix %>Svc = $injector.get('<%= componentNamePrefix %>Svc');

        init();

        function init() {
            //_sampleOperation();
        }

        function _sampleOperation() {
            <%= componentNamePrefix %>Svc.sampleOperation().then(function (data) {

            }).catch(handleServiceError)
                .finally(function () {
                    //console.log('Finally hide the loader etc when error or success');
                });
        }

        function handleServiceError(err) {
            console.log('Error occurred with service', err);
            $rootScope.$broadcast('notify-service-error', err);
        }
    }
})();

