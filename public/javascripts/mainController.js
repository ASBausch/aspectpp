/**
 * Created by manadab on 12/20/15.
 */
var app = angular.module('app', []);

angular.module('app').controller("MainController", function(){
    var vm = this;
    vm.title = 'Aspect';
});

angular.module('app').controller('artListCntrl', function($scope, $http) {
    $http({
        method: 'GET',
        url: '/aspectarts'
    }).then(function(response) {

        $scope.addArtist = response.data[1].addArtist;
        $scope.urlTwo = response.data[1].urlTwo;

        console.log($scope.urlTwo);
    });
    console.log('got to the end');

});
