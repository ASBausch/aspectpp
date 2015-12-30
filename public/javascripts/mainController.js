/**
 * Created by manadab on 12/20/15.
 */
var app = angular.module('app', ['ngRoute']);


//main controller for title

angular.module('app').controller("MainController", function(){
    var vm = this;
    vm.title = 'Aspect';
});

//controller for main art on index page currently hard coded to be the piece I want to
//start with, the scope and http methods of angular are required here

angular.module('app').controller('ImageController', ['$scope','$http', function($scope,$http){
    $http({
        method: 'GET',
        url: '/aspectarts'
        //all info from aspect arts is available via this request, the current piece shown
        //is determined by the data values setting the scope
        //in this instance it is coded to one particular image/artist data
    }).then(function(response) {
        $scope.url = response.data[1].works[0].url;
        $scope.title= response.data[1].works[0].title;
        $scope.style = response.data[1].style;
        $scope.artist = response.data[1].artist;
        $scope.id = response.data[1]._id;
    });

    //search /view change via 'another' button which will change the current piece to one
    //completely different, the index will be chosen via a random number generator with a
    //max of the length of the aspectarts array
    $scope.onAnotherClick = function() {
        $http({
            method: 'GET',
            url: '/aspectarts'
        }).then(function(response){
            var max = response.data.length;
            var randomIndex = Math.floor(Math.random() * (max - 0 + 1));
            $scope.url = response.data[randomIndex].works[0].url;
            $scope.title= response.data[randomIndex].works[0].title;
            $scope.style = response.data[randomIndex].style;
            $scope.artist = response.data[randomIndex].artist;
            $scope.id = response.data[randomIndex]._id;
            $scope.loc = randomIndex;
        });
    };
    //search /view change via 'artist' button which will change the current piece to one
    //a different one of the same artist, the artist will be based on the currently
    //viewed piece set in $scope.artist
    $scope.onArtistClick = function (){
        $http({
            method: 'GET',
            url: '/artist'
        }).then(function(response){
            
        })
    }

}]);


//controller that retrieves details on art for tab page detail...

angular.module('app').controller('ArtDetailController', function($scope, $http, $routeParams, $route) {
    var viewed = [];
    $http({
        method: 'GET',
        url: '/aspectarts'
    }).then(function(response) {
        //in this case id is the index number of the aspectarts data array
        //if the response data doesn't match it is automatically rerouted to index 1
        if (!response.data[$routeParams.id]) {
            $route.updateParams({id:1});
        }
        //all of the scope properties are set by the routeparams id this will be 1
        //upon first entry to the page but will update with button clicks
        //the nested works arrays need to be looped through to be set
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
            //the url knows what the current style is because it is
            //set in $scope.style we concat it here so that the url
            //has the correct params to search by in the node route
            url: '/style/' + $scope.style
        }).then(function(response) {
            //we loop through our response and reset the value of the scop
            //objects with the new data from our search, angular automatically
            //reads this new data without refresh
            for (var i=0; i< response.data.length; i++){

                var id = response.data[i]._id;

                if (viewed.indexOf(id) === -1) {
                    $scope.id = response.data[i]._id;
                    $scope.artist = response.data[i].artist;
                    $scope.style = response.data[i].style;
                    $scope.title = response.data[i].works[i].title;
                    $scope.yearCompleted = response.data[i].works[i].yearCompleted;
                    $scope.url = response.data[i].works[i].url;
                    $scope.publicDomain = response.data[i].works[i].publicDomain;
                    $scope.works = response.data[i].works;

                    viewed.push($scope.id);

                    break;
                }
            }
        });
    };

});

//controller for tabs

angular.module('app').controller('TabController', function ($scope){
    $scope.currentTab = null;

    //setting these functions as part of the scope makes the function available
    //to process in-line via ng-click
    //onTabClick sets the current tab to the id of the tab that was clicked
    $scope.onTabClick = function(id) {
        $scope.currentTab = id;
    };
    //isActive sets the currentTab to active so that
    //the appropriate class is assigned via ng-class
    //ng-show reads if the is-active function is true and
    //only shows when it is.
    $scope.isActive = function(id) {
        return $scope.currentTab === id;
    };
});



//route providers allow partials to be viewed via ng-view
//as well as assigning the controllers to be used in those cases
//some controllers can be called in the partials but it is
//not ideal
app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: '/partials/mainImage.html',
        controller: 'ImageController'
    }).when('/single/:id', {
        templateUrl: '/partials/single.html',
        controller: 'ArtDetailController'
    });
}]);




