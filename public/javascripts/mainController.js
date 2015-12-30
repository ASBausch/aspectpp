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
        $scope.url = response.data[1].works[0].url;
        $scope.title= response.data[1].works[0].title;
        $scope.style = response.data[1].style;
        $scope.artist = response.data[1].artist;
        $scope.id = response.data[1]._id;
    });
}]);


//controller that retrieves details on art for tab page detail...

angular.module('app').controller('ArtDetailController', function($scope, $http, $routeParams, $route) {
    var viewed = [];
    $http({
        method: 'GET',
        url: '/aspectarts'
    }).then(function(response) {
        if (!response.data[$routeParams.id]) {
            $route.updateParams({id:1});
        }
        $scope.id = response.data[$routeParams.id]._id;
        $scope.artist = response.data[$routeParams.id].artist;
        $scope.style = response.data[$routeParams.id].style;
        $scope.title = response.data[$routeParams.id].works[0].title;
        $scope.yearCompleted = response.data[$routeParams.id].works[0].yearCompleted;
        $scope.url = response.data[$routeParams.id].works[0].url;
        $scope.publicDomain = response.data[$routeParams.id].works[0].publicDomain;
        $scope.works = response.data[$routeParams.id].works;

        viewed.push($scope.id);
    });

    $scope.onStyleClick = function(){
        $http({
            method: 'GET',
            url: '/style/' + $scope.style
        }).then(function(response) {
            for (i=0; i< response.data.length; i++){
                if (viewed.indexOf(response.data[i]._id) === -1) {
                    $scope.id = response.data[i]._id;
                    $scope.artist = response.data[i].artist;
                    $scope.style = response.data[i].style;
                    $scope.title = response.data[i].works[0].title;
                    $scope.yearCompleted = response.data[i].works[0].yearCompleted;
                    $scope.url = response.data[i].works[0].url;
                    $scope.publicDomain = response.data[i].works[0].publicDomain;
                    $scope.works = response.data[i].works;

                    viewed.push($scope.id);

                    break;

                }

            }
        })

    }
});

//controller for tabs

angular.module('app').controller('TabController', function ($scope){
    $scope.currentTab = null;
    $scope.onTabClick = function(id) {
        $scope.currentTab = id;
    };
    $scope.isActive = function(id) {
        return $scope.currentTab === id;
    };
});


app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: '/partials/mainImage.html',
        controller: 'ImageController'
    }).when('/single/:id', {
        templateUrl: '/partials/single.html',
        controller: 'ArtDetailController'
    });
}]);




