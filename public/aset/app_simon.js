var app = angular.module('simonApp',['ngRoute']);
 
app.run(function(){

});

app.controller('NavController', function($scope){
	$scope.halaman = "beranda";
});
 
//This will handle all of our routing
app.config(function($routeProvider, $locationProvider){	
	$routeProvider.when('/',{
		templateUrl:'aset/simon/pages/beranda.html'
	});
	$routeProvider.when('/UUK',{
		templateUrl:'aset/simon/pages/UUK.html',
	});
	$routeProvider.when('/lappro',{
		templateUrl:'aset/simon/pages/lappro.html',
	});
});

