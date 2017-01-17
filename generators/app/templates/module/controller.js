(function () {
    'use strict';
    /**
     * @ngdoc object
     * @name <%= moduleName %>.<%= pascalSuffix %>Ctrl:<%= pascalSuffix %>Ctrl
     *
     * @description
     * <%= pascalSuffix %>Ctrl controller.
     *
     * @requires $injector
     * @requires $rootScope
     */
    var moduleName = '<%= moduleName %>';

    angular.module(moduleName)
        .controller('<%= pascalSuffix %>Ctrl', Ctrl);

    Ctrl.$inject = ['$injector', '$rootScope'];
    function Ctrl($injector, $rootScope) {
        var vm = this;
        var <%= pascalSuffix %>Svc = $injector.get('<%= pascalSuffix %>Svc');

        init();

        /**
         * @ngdoc function  
         * @name <%= moduleName %>.<%= pascalSuffix %>Ctrl#init
         *
         * @description
         * I am method of <%= pascalSuffix %>Ctrl.
         * @methodOf <%= moduleName %>.<%= pascalSuffix %>Ctrl:<%= pascalSuffix %>Ctrl
         */
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

