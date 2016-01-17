/**
 * Created by manadab on 12/20/15.
 */
var app = angular.module('app', ['ngRoute', 'ngAnimate', 'ngclipboard']);


//main controller for title

angular.module('app').controller("MainController", function(){
    var vm = this;
    vm.title = 'Aspect';
    vm.logoInfo = 'Aspect is a portal for fine art from around the world. ' +
        'It is a tool to foster interest in, create exposure to,' +
        'and educate the user in both classic and modern art.' +
        'Aspects goal is to bring a bit of beauty into the day to da' +
        'by providing a variety of art to a user that they may have never' +
        'seen before. Often you have a favorite artist or piece of work,' +
        'those pieces are comfortable and familiar, Aspect looks to expand that.' +
        'The artist, style and title buttons below the piece will show you other works of the same artist,' +
        'same style but different artist, or completely new artist and style.' +
        'Share allows you to copy the link of the work you enjoy to your clipboard' +
        'and share it however you like. You can help expand Aspects art collection ' +
        'by submitting your suggestions to the "Thoughts" form.';
    vm.copyRight = 'Artworks protected by copyright are to be used only for contemplation. Please see WikiArt.org for more information on Copyright'
});

//controller for main art on index page the scope and http methods of angular are required here

angular.module('app').controller('ImageController', ['$scope','$http', function($scope,$http){
    var seen = [];
    $http({
        method: 'GET',
        url: '/aspectarts'
        //all info from aspect arts is available via this request, the current piece shown is determined by the data values setting the scope
    }).then(function(response) {
        var max = response.data.length;
        var randomIndex = Math.floor(Math.random() * (max - 0 + 1));
        var maxWorks = 2;
        var randomWorks = Math.floor(Math.random() * (maxWorks + 1));

        $scope.workNumber = randomWorks;
        $scope.url = response.data[randomIndex].works[randomWorks].url;
        $scope.title= response.data[randomIndex].works[randomWorks].title;
        $scope.style = response.data[randomIndex].style;
        $scope.artist = response.data[randomIndex].artist;
        $scope.id = response.data[randomIndex]._id;

    });

    //search /view change via 'another' button which will change the current piece to one the index will be chosen via a random number generator with a

    $scope.onAnotherClick = function() {
        seen=[];
        $http({
            method: 'GET',
            url: '/aspectarts'
        }).then(function(response){
            var max = response.data.length;
            var randomIndex = Math.floor(Math.random() * (max - 0 + 1));
            var maxWorks = 2;
            var randomWorks = Math.floor(Math.random() * (maxWorks + 1));

            $scope.workNumber = randomWorks;
            $scope.url = response.data[randomIndex].works[randomWorks].url;
            $scope.title= response.data[randomIndex].works[randomWorks].title;
            $scope.style = response.data[randomIndex].style;
            $scope.artist = response.data[randomIndex].artist;
            $scope.id = response.data[randomIndex]._id;

        });
    };
    //search /view change via 'artist' button which will change the current piece to one

    $scope.onArtistClick = function (){
        seen=[];
        $http({
            method: 'GET',
            url: '/artist/' + $scope.artist
        }).then(function(response){
            for (var i=0; i< response.data.length; i++) {
                var artNumber;
                if ($scope.workNumber <2 ) {
                    artNumber = $scope.workNumber + 1;
                } else {
                    artNumber = 0
                }
                $scope.workNumber = artNumber;
                $scope.url = response.data[i].works[$scope.workNumber].url;
                $scope.title = response.data[i].works[$scope.workNumber].title;
                $scope.style = response.data[i].style;
                $scope.artist = response.data[i].artist;
                $scope.id = response.data[i]._id;
            }
        });
    };

    $scope.onStyleClick = function(){
        $http({
            method: 'GET',
            //the url knows what the current style is set in $scope.style we concat it here so that the url has the correct params to search by in the node route
            url: '/style/' + $scope.style
        }).then(function(response) {
            //we loop through our response and reset the value of the scope objects with the new data from our search, angular
            for (var i=0; i< response.data.length; i++){
                var id = response.data[i]._id;

                if (seen.indexOf(id) === -1) {
                    var artNumber;

                    if ($scope.workNumber <2 ) {
                        artNumber = $scope.workNumber + 1;
                    } else {
                        artNumber = 0
                    }

                    $scope.workNumber = artNumber;
                    $scope.url = response.data[i].works[$scope.workNumber].url;
                    $scope.title = response.data[i].works[$scope.workNumber].title;
                    $scope.style = response.data[i].style;
                    $scope.artist = response.data[i].artist;
                    $scope.id = response.data[i]._id;
                    seen.push($scope.id);

                    break;
                }
            }
        console.log($scope.title);
        });
        if (seen.length == 3) {
            popupS.alert({
                content: 'Aspect is still growing. Choose a new title or work from the artist then try for more connections.'
            });
        }
    };

}]);


//controller that retrieves details on art for tab page detail...
//routeParams.id assures that the id of the current piece is pulled from the url
//when it was passed from the single page.

//DETAIL PAGE

angular.module('app').controller('ArtDetailController', function($scope, $http, $routeParams) {
    var viewed = [];
    $http({
        method: 'GET',
        url: '/detailPage/'+ $routeParams.id
    }).then(function(response) {

        //all of the scope properties are set by the routeparams id
        $scope.workNumber = $routeParams.workNumber;
        $scope.url = response.data[0].works[$scope.workNumber].url;
        $scope.title = response.data[0].works[$scope.workNumber].title;
        $scope.style = response.data[0].style;
        $scope.artist = response.data[0].artist;
        $scope.id = response.data[0]._id;
        $scope.yearCompleted = response.data[0].works[$scope.workNumber].yearCompleted;
        $scope.publicDomain = response.data[0].works[$scope.workNumber].publicDomain;
        $scope.works = response.data[0].works;
        $scope.wikiLocation = response.data[0].wikiLocation;

        viewed.push($scope.id);

        if ($scope.publicDomain == true){
            $scope.publicDomain = 'Yes'
        } else {
            $scope.publicDomain = 'No'
        }

    });

    $scope.onAnotherClick = function() {
        viewed = [];
        $http({
            method: 'GET',
            url: '/aspectarts'
        }).then(function(response){
            var max = response.data.length;
            var randomIndex = Math.floor(Math.random() * (max - 0 + 1));
            var maxWorks = 2;
            var randomWorks = Math.floor(Math.random() * (maxWorks + 1));

            $scope.workNumber = randomWorks;
            $scope.url = response.data[randomIndex].works[randomWorks].url;
            $scope.title= response.data[randomIndex].works[randomWorks].title;
            $scope.style = response.data[randomIndex].style;
            $scope.artist = response.data[randomIndex].artist;
            $scope.id = response.data[randomIndex]._id;
            $scope.publicDomain = response.data[randomIndex].works[randomWorks].publicDomain;
            $scope.yearCompleted = response.data[randomIndex].works[randomWorks].yearCompleted;
            $scope.works = response.data[randomIndex].works;
            $scope.wikiLocation = response.data[randomIndex].wikiLocation;

            if ($scope.publicDomain == true){
                $scope.publicDomain = 'Yes'
            } else {
                $scope.publicDomain = 'No'
            }
        });
    };

    $scope.onArtistClick = function (){
        viewed = [];
        $http({
            method: 'GET',
            url: '/artist/' + $scope.artist
        }).then(function(response){
            for (var i=0; i< response.data.length; i++) {
                var artNumber;
                if ($scope.workNumber <2 ) {
                    artNumber = $scope.workNumber + 1;
                } else {
                    artNumber = 0
                }
                $scope.workNumber = artNumber;
                $scope.url = response.data[i].works[$scope.workNumber].url;
                $scope.title = response.data[i].works[$scope.workNumber].title;
                $scope.style = response.data[i].style;
                $scope.artist = response.data[i].artist;
                $scope.id = response.data[i]._id;
                $scope.publicDomain = response.data[i].works[$scope.workNumber].publicDomain;
                $scope.yearCompleted = response.data[i].works[$scope.workNumber].yearCompleted;
                $scope.works = response.data[i].works;
                $scope.wikiLocation = response.data[i].wikiLocation;

                if ($scope.publicDomain == true){
                    $scope.publicDomain = 'Yes'
                } else {
                    $scope.publicDomain = 'No'
                }
            }
        });
    };


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
            //reads this new data without

            console.log('I clicked');

            for (var i=0; i< response.data.length; i++){

                var id = response.data[i]._id;

                if (viewed.indexOf(id) === -1) {
                    $scope.id = response.data[i]._id;
                    $scope.artist = response.data[i].artist;
                    $scope.style = response.data[i].style;
                    $scope.title = response.data[i].works[$scope.workNumber].title;
                    $scope.yearCompleted = response.data[i].works[$scope.workNumber].yearCompleted;
                    $scope.url = response.data[i].works[$scope.workNumber].url;
                    $scope.publicDomain = response.data[i].works[$scope.workNumber].publicDomain;
                    $scope.works = response.data[i].works;
                    $scope.wikiLocation = response.data[i].wikiLocation;

                    viewed.push($scope.id);

                    if ($scope.publicDomain == true){
                        $scope.publicDomain = 'Yes'
                    } else {
                        $scope.publicDomain = 'No'
                    }

                    break;
                }
            }
        });

        if (viewed.length == 3) {
            popupS.alert({
                content: 'Aspect is still growing. Choose a new title or work from the artist then try for more connections.'
            });
        }
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

//angular.module('app').controller('FormController', ['$scope', function($scope, $http) {
//    $scope.submit = function () {
//        $http({
//            method: 'POST',
//            url: '/contact'
//        })
//    }.
//    success(function (data, status, headers, config) {
//        popupS.alert({
//            content: "Thank you for your suggestion"
//        });
//    }).
//    error(function (data, status, headers, config) {
//        // something else
//    });
//    }]);

//route providers allow partials to be viewed via ng-view
//as well as assigning the controllers to be used in those cases
//some controllers can be called in the partials but it is
//not ideal
app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: '/partials/mainImage.html',
        controller: 'ImageController'
    }).when('/single/:id/:workNumber', {
        templateUrl: '/partials/single.html',
        controller: 'ArtDetailController'
    });
}]);

