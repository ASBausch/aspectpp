/**
 * Created by manadab on 12/20/15.
 */
var app = angular.module('app', ['ngRoute']);


//main controller for title

angular.module('app').controller("MainController", function(){
    var vm = this;
    vm.title = 'Aspect';
});

//controller for main art on index page currently hard coded search

angular.module('app').controller('ImageController', ['$scope','$http', function($scope,$http){
    $http({
        method: 'GET',
        url: '/aspectarts'
    }).then(function(response) {
        $scope.urlOne = response.data[1].urlOne;
        $scope.titleOne = response.data[1].titleOne;
    });
}]);


//controller that retrieves details on art for tab page detail...

angular.module('app').controller('ArtDetailController', function($scope, $http) {
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

//controller for Artist button on index/single page currently unsed

angular.module('app').controller('ArtIndexController', function($scope, $http) {
    $http({
        method: 'GET',
        url: '/aspectarts'
    }).then(function(response) {
        $scope.addArtist = response.data[1].addArtist;
        $scope.urlTwo = response.data[1].urlTwo;
        $scope.id = response.data[1]._id;
    });
});

//controller for Style button on index/single page currently unused

angular.module('app').controller('artStyleCntrl', function($scope, $http) {
    $http({
        method: 'GET',
        url: '/style'
    }).then(function(response) {
        $scope.urlOne = response.data[0].urlOne;
        $scope.urlTwo = response.data[2].urlTwo;
    });
});

//set up start for angular routing? may not be used?

//app.config(['$routeProvider', function($routeProvider){
//    $routeProvider.when('/', {
//        templateUrl: '/index.html',
//        controller: 'MainController' and or artIndexControl for artist button, artStyleControl for style button
//                      , artDetailControl for new piece button
//    }).when('/single', {
//        templateUrl: '/single.html',
//        controller: 'artDetailCntrl' and or MenuController and artIndexControl for artist button, artStyleControl for style button
//                      , artDetailControl for new piece button
//    });
//}]);




