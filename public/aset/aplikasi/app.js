var app = angular.module('velApp',['ngRoute', 'CRUDSrvc', 'NerdCtrl']);
 
app.run(function(){

});
 
//This will handle all of our routing
app.config(function($routeProvider, $locationProvider){	
	$routeProvider.when('/',{
		templateUrl:'aset/aplikasi/templates/dashboard.html',
		controller:'NerdController'
	});
	$routeProvider.when('/add',{
		templateUrl:'aset/aplikasi/templates/add.html',
		controller:'NerdController'
	});
	$routeProvider.when('/edit/:id',{
		templateUrl:'aset/aplikasi/templates/edit.html',
		controller:'EditNerdController'
	});
});