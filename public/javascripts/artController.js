/**
 * Created by manadab on 12/21/15.
 */
$scope.artInfo = {};
artFactory.getArtInfo()
    .then(function (aspectarts) {
        $scope.artInfo = aspectarts;
    }, function (error) {
        console.error(error);
    });
