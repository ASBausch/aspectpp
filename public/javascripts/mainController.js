/**
 * Created by manadab on 12/20/15.
 */
var app = angular.module('app', []);

angular.module('app').controller("MainController", function(){
    var vm = this;
    vm.title = 'Aspect';
});

angular.module('app').controller('artIndexCntrl', function($scope, $http) {
    $http({
        method: 'GET',
        url: '/aspectarts'
    }).then(function(response) {
        $scope.addArtist = response.data[1].addArtist;
        $scope.urlTwo = response.data[1].urlTwo;
        $scope.id = response.data[1]._id;
    });
});

angular.module('app').controller('artStyleCntrl', function($scope, $http) {
    $http({
        method: 'GET',
        url: '/style'
    }).then(function(response) {
        $scope.urlOne = response.data[2].urlOne;
        $scope.urlTwo = response.data[0].urlTwo;
    });
});

angular.module('app').controller('artistCntrl', function($scope, $http) {
    $http({
        method: 'GET',
        url: '/artist'
    }).then(function(response) {
        $scope.urlOne = response.data[2].urlOne;
        $scope.urlTwo = response.data[0].urlTwo;
    });
});

angular.module('app').controller('artDetailCntrl', function($scope, $http) {
    $http({
        method: 'GET',
        url: '/aspectarts'
    }).then(function(response) {
        $scope.id = response.data[1]._id;
        $scope.addArtist = response.data[1].addArtist;
        $scope.styleOne = response.data[1].styleOne;
        $scope.titleOne = response.data[1].titleOne;
        $scope.yearOne = response.data[1].yearOne;
        $scope.urlOne = response.data[1].urlOne;
        $scope.publicDomainOne = response.data[1].publicDomainOne;
        $scope.styleTwo = response.data[1].styleTwo;
        $scope.titleTwo = response.data[1].titleTwo;
        $scope.yearTwo = response.data[1].yearTwo;
        $scope.urlTwo = response.data[1].urlTwo;
        $scope.publicDomainTwo = response.data[1].publicDomainTwo;
        $scope.styleThree = response.data[1].styleThree;
        $scope.titleThree = response.data[1].titleThree;
        $scope.yearThree = response.data[1].yearThree;
        $scope.urlThree = response.data[1].urlThree;
        $scope.publicDomainThree = response.data[1].publicDomainThree;

    });
});

