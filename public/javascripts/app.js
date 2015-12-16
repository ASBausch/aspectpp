//requires the angular module with the ngRoute dependencie so that we can use ng-route
var app = angular.module('myApp', ['ngRoute']);

//this sets what angular controller we will be using on
//each of the different pages

app.config(['$routeProvider', function($routeProvider) {
    //ng-view is a feature of angular routing and used in our pages to change views
    $routeProvider.
        when('/', {
        templateUrl: '/public/index.html',
        controller: 'indexControl'
    }).when('/', {
        templateUrl: '/public/detail.html',
        controller: 'detailControl'
    }).when('/gallery', {
        templateUrl: '/public/gallery.html',
        controller: 'galleryControl'
    }).when('/signin', {
        templateUrl: '/public/signin.html',
        controller: 'signInControl'
    }).when('/admin', {
        templateUrl: '/public/admin.html',
        controller: 'formSubmit'
    }).when('/single', {
            templateUrl: '/public/single.html',
            controller: 'singleControl'
    }).otherwise({
        redirectTo: '/public/index.html'
    });

}]);


app.controller('formCtrl', function($scope) {
    $scope.art =
    {
        artist: String,
        titleOne: String,
        styleOne: String,
        yearOne: Number,
        urlOne: String,
        publicDomainOne: Boolean,
        collectedByOne: String,
        titleTwo: String,
        styleTwo: String,
        yearTwo: Number,
        urlTwo: String,
        publicDomainTwo: Boolean,
        collectedByTwo: String,
        titleThree: String,
        styleThree: String,
        yearThree: Number,
        urlThree: String,
        publicDomainThree: Boolean,
        collectedByThree: String
    };

    $http({
        url: '/admin',
        method: 'post'
    }).then(function(response){
        $scope.art = response.data;
    });

    //save data to the database here

    $scope.reset = function() {
        $scope.artist = angular.copy($scope.art);
    };
    $scope.reset();
});