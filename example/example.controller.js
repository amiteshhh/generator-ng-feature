(function () {
    'use strict';
    /**
     * Module: app.example
     * Controller: ExampleCtrl
     * Description: Controller to manage example
     * 
     */
    var moduleName = 'app.example';

    angular.module(moduleName)
        .controller('ExampleCtrl', Ctrl);

    Ctrl.$inject = ['$injector', '$rootScope'];
    function Ctrl($injector, $rootScope) {
        var vm = this;
        var ExampleSvc = $injector.get('ExampleSvc');

        init();

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

