var app = angular.module('siendoApp',['ngRoute']);
 
app.run(function(){

});

app.factory("DonaturSvc", function($http){
	return{
		all: function(){
			var req = $http({method:'GET', url:'donatur'});
			return req;
		},
		create: function(data){
			var req = $http({method:'GET', url:'donatur/create', params:data});
			return req;
		},
		get: function(id){
			var req = $http.get('donatur/'+id);
			return req;
		},
		update: function(id, data){
			var req = $http.put('donatur/'+id, data);
			return req;
		},
		delete: function(id){
			var req = $http.delete('donatur/'+id);
			return req;
		}
	}
});

app.factory("DonasiSvc", function($http){
	return{
		all: function(){
			var req = $http({method:'GET', url:'donasi'});
			return req;
		},
		create: function(data){
			var req = $http({method:'GET', url:'donasi/create', params:data});
			return req;
		},
		get: function(id){
			var req = $http.get('donasi/'+id);
			return req;
		},
		update: function(id, data){
			var req = $http.put('donasi/'+id, data);
			return req;
		},
		delete: function(id){
			var req = $http.delete('donasi/'+id);
			return req;
		}
	}
});

app.controller('NavController', function($scope){
	$scope.halaman = "beranda";
});

app.controller('DonaturCtrl', function($scope, DonaturSvc){
	$scope.num = 0;
	var getDonatur = DonaturSvc.all();

	getDonatur.success(function(response){
		$scope.donaturs = response;
	});
});

app.controller('DonasiCtrl', function($scope, DonasiSvc, DonaturSvc){
	$scope.num = 0;
	var getDonasi = DonasiSvc.all();

	getDonasi.success(function(response){
		$scope.donasis = response;
	});
});
 
//This will handle all of our routing
app.config(function($routeProvider, $locationProvider){	
	$routeProvider.when('/',{
		templateUrl:'aset/siendo/pages/beranda.html'
	});
	$routeProvider.when('/donasi',{
		templateUrl:'aset/siendo/pages/donasi.html',
		controller:'DonasiCtrl'
	});
	$routeProvider.when('/donatur',{
		templateUrl:'aset/siendo/pages/donatur.html',
		controller:'DonaturCtrl'
	});
	$routeProvider.when('/akun',{
		templateUrl:'aset/siendo/pages/akun.html'
	});
	$routeProvider.when('/form_donasi',{
		templateUrl:'aset/siendo/pages/form_donasi.html'
	});
});

