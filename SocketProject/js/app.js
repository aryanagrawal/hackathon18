/**
 * Created by aakashrathore on 1/13/18.
 */
var app = angular.module('socketProject',[]);

app.controller('socket', ['$scope', '$http','$rootScope', '$timeout', 'socket', '$window', function($scope, $http, $rootScope, $timeout, socket, $window) {
    $scope.hasResults = false;
    socket.on('foundPatient', function(data){
        $scope.hasResults = true;
        console.log(data);
        $scope.doctor = data[0];
        $scope.patient = data[1];
        $scope.$apply();
    });
    $scope.joinCall = function(){
        $window.location.reload();
        $window.open('https://hangouts.google.com/call/BYt6Xihk2Fc6rFzc3dcqAAEE', '_blank');
    }
    socket.on('notification', function(data) {
        console.log("heresabdfjkbsdkaf");
        console.log(data);
        $scope.$apply(function () {
            console.log("here");
        });
    });
}]);

//
// app.factory('socket', function ($rootScope) {
//     var socket = io.connect('http://localhost:8081');
//     console.log("socket created");
//
//     return {
//         on: function (eventName, callback) {
//             function wrapper() {
//                 var args = arguments;
//                 $rootScope.$apply(function () {
//                     callback.apply(socket, args);
//                 });
//             }
//             socket.on(eventName, wrapper);
//
//             return function () {
//                 socket.removeListener(eventName, wrapper);
//             };
//         },
//
//         emit: function (eventName, data, callback) {
//             socket.emit(eventName, data, function () {
//                 var args = arguments;
//                 $rootScope.$apply(function () {
//                     if(callback) {
//                         callback.apply(socket, args);
//                     }
//                 });
//             });
//         }
//     };
// });

app.factory('socket', ['$rootScope', function($rootScope) {
    var socket = io.connect('http://localhost:8081');
    return {
        on: function(eventName, callback){
            socket.on(eventName, callback);
        },
        emit: function(eventName, data) {
            socket.emit(eventName, data);
        }
    };
}]);
