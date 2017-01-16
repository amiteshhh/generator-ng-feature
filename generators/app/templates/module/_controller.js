(function () {
    'use strict';
    /**
     * Module: <%= moduleName %>
     * Controller: 
     * Description:
     * 
     */
    var moduleName = '<%= moduleName %>';

    angular.module(moduleName)
        .controller('<%= capital %>Ctrl', Ctrl);

    Ctrl.$inject = ['$injector', '$rootScope'];
    function Ctrl($injector, $rootScope) {
        var vm = this;
        var <%= capital %>Svc = $injector.get('<%= capital %>Svc');

        init();

        function init() {
            //_sampleOperation();
        }

        function _sampleOperation() {
            <%= capital %>Svc.sampleOperation().then(function (data) {

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

