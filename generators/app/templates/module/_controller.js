(function () {
    'use strict';
    /**
     * Module: <%= moduleName %>
     * Controller: <%= pascalSuffix %>Ctrl
     * Description: Controller to manage <%= folderName %>
     * 
     */
    var moduleName = '<%= moduleName %>';

    angular.module(moduleName)
        .controller('<%= pascalSuffix %>Ctrl', Ctrl);

    Ctrl.$inject = ['$injector', '$rootScope'];
    function Ctrl($injector, $rootScope) {
        var vm = this;
        var <%= pascalSuffix %>Svc = $injector.get('<%= pascalSuffix %>Svc');

        init();

        function init() {
            //_sampleOperation();
        }

        function _sampleOperation() {
            <%= pascalSuffix %>Svc.sampleOperation().then(function (data) {

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

