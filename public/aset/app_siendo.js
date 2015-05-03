var app = angular.module('siendoApp',['ngRoute']);
 
app.run(function(){

});
 
//This will handle all of our routing
app.config(function($routeProvider, $locationProvider){	
	$routeProvider.when('/',{
		templateUrl:'aset/siendo/pages/beranda.html'
	});
	$routeProvider.when('/donasi',{
		templateUrl:'aset/siendo/pages/donasi.html'
	});
	$routeProvider.when('/donatur',{
		templateUrl:'aset/siendo/pages/donatur.html'
	});
	$routeProvider.when('/akun',{
		templateUrl:'aset/siendo/pages/akun.html'
	});
});

app.controller('NavController', function($scope){
	$scope.halaman = "beranda";
});