(function () {
    'use strict';
    /**
     * @ngdoc object
     * @name app.example.ExampleCtrl:ExampleCtrl
     *
     * @description
     * ExampleCtrl controller.
     *
     * @requires $injector
     * @requires $rootScope
     */
    var moduleName = 'app.example';

    angular.module(moduleName)
        .controller('ExampleCtrl', Ctrl);

    Ctrl.$inject = ['$injector', '$rootScope'];
    function Ctrl($injector, $rootScope) {
        var vm = this;
        var ExampleSvc = $injector.get('ExampleSvc');

        init();

        /**
         * @ngdoc function  
         * @name app.example.ExampleCtrl#init
         *
         * @description
         * I am method of ExampleCtrl.
         * @methodOf app.example.ExampleCtrl:ExampleCtrl
         */
        function init() {
            //_sampleOperation();
        }

        function _sampleOperation() {
            ExampleSvc.sampleOperation().then(function (data) {

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

