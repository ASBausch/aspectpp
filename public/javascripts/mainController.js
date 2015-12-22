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
        
        $scope.addArtist = response.data[0].addArtist;

        console.log($scope.addArtist);
    });
    console.log('got to the end');

});
