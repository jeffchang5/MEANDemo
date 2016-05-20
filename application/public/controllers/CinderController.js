var ToDoModule = angular.module('CinderApp', ['ui.router']);

ToDoModule.controller('CinderController', 
	['$scope', '$http', '$state', function($scope, $http, $state) {
		$scope.signup =  {}
		$scope.warning = false;
		$scope.loggedin = false;
		$scope.message = 'sadf';


		$scope.submitForm = function() {
			if ($scope.signup.password != $scope.signup.validate) {
				$scope.warning = true;

			}
			else {
				$http({
				  method: 'POST',
				  url: 'http://localhost:8080/signup',
				  data: {

				  	username: $scope.signup.username,
				  	password: $scope.signup.password
				  
				  }
				}).then(function successCallback(response) {
					$scope.message = response.data;
					if (response.data.auth == true) {
						$state.go('index');
					}

				  }, function errorCallback(response) {
				  	$scope.error = '<b>Can\'t reach the API.';
				  });
			}


		}
		$scope.login = function() {

			$http({
			  method: 'GET',
			  url: 'http://localhost:8080/api/login'
			}).then(function successCallback(response) {
				

			  }, function errorCallback(response) {
			  	$scope.error = '<b>Can\'t reach the API.';
			  });



		}
	}	
]);
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
    .state('match', {
      url: "/match",
		templateUrl: 'partials/match.html'
		
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
