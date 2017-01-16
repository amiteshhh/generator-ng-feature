(function () {
    'use strict';
    /**
     * Module: <%= moduleName %>
     * Service: 
     * Description:
     * 
     */

    var moduleName = '<%= moduleName%>';

    angular.module(moduleName)
        .service('<%= capital>Svc', Svc);

    Svc.$inject = ['$http', '$q', 'APP_CONFIG'];
    function Svc($http, $q, APP_CONFIG) {

        return {
            sampleOperation: _sampleOperation
        };

        function _sampleOperation() {
            var deferred = $q.defer();
            var url = APP_CONFIG.SERVER_URL + APP_CONFIG.REST_ENDPOINT + '/<%= folderName>/';
            $http.get(url).then(function (response) {
                deferred.resolve(response.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }
})();
