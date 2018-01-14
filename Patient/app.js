var app = angular.module('hackathon',[]);

app.controller('patientController', ['$scope', '$http','$rootScope', '$timeout', '$window', function($scope, $http, $rootScope, $timeout, $window){
    $scope.ans = {};
    $scope.submit=function(){
        JSON.stringify($scope.ans);
        console.log($scope.ans);
        $http.post("http://localhost:8081/addPatient", $scope.ans)
            .then(function (success){
                console.log(success);
                $window.location.reload();
            },function (error){
                console.log(error);
            });
    }

}]);
