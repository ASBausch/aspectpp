/**
 * Created by manadab on 12/20/15.
 */
var app = angular.module('app', ['ngRoute']);

angular.module('app').controller("MainController", function(){
    var vm = this;
    vm.title = 'Aspect';
});

angular.module('app').controller('CopyControl', function ($scope) {
    $scope.showpara = true;
    $scope.hidepara = false;
});