var ToDoModule = angular.module('ToDoApp', ['ui.router']);

ToDoModule.controller('ToDoController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.signup = {};
    $scope.logininfo = {};
    $scope.profile = {};
    $scope.showwarning = false;
    $scope.message = 'Default';



    $scope.submitForm = function() {
        if ($scope.signup.password != $scope.signup.validate) {
        	$scope.showwarning = true;
        	$scope.message = 'Your passwords don\'t match';
            


        } else {
            $http({
                method: 'POST',
                url: 'http://localhost:8080/signup',
                data: {

                    username: $scope.signup.username,
                    password: $scope.signup.password

                }
            }).then(function successCallback(response) {
	        	$scope.showwarning = true;
                $scope.message = "Username already taken";
                $scope.profile = $scope.signup.username;


                if (response.data.auth == true) {
                    $state.go('index');
                }

            }, function errorCallback(response) {
                $scope.error = '<b>Can\'t reach the API.';
            });
        }


    }
    $scope.login = function() {
    	console.log($scope.logininfo)
        $http({
            method: 'POST',
            url: 'http://localhost:8080/login',
            data: {

                username: $scope.logininfo.username,
                password: $scope.logininfo.password

            }
        }
	).then(function successCallback(response) {

		if (response.data.user) {
			$scope.profile = response.data.user;
		    $state.go('index');
		}
        }, function errorCallback(response) {
            $scope.error = '<b>Can\'t reach the API.';
        });



    }
}]);
ToDoModule.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('index', {
            url: "",
            templateUrl: 'partials/main.html'

        })
        .state('profile', {
            url: "/profile",
            templateUrl: 'partials/profile.html'

        })
        .state('todo', {
            url: "/todo",
            templateUrl: 'partials/todo.html'

        })
        .state('signup', {
            url: "/signup",
            templateUrl: 'partials/signup.html'

        })
        .state('login', {
            url: "/login",
            templateUrl: 'partials/login.html'

        });

});