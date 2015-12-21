/**
 * Created by manadab on 12/21/15.
 */
var app = angular.module('app', ['ngRoute']);

angular.module('app').factory('artFactory', function($q, $http) {
    return {
        getArtInfo: function() {
            var deferred = $q.defer(),
                httpPromise = $http.get('/aspectarts');

            httpPromise.success(function (aspectarts) {
                deferred.resolve(aspectarts);
            })
                .error(function (error) {
                    console.error('Error: '+ error);
                });
            return deffered.promise;
            console.log('I ran');

        }
    };
});