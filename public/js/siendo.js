/* INISIASI SISTEM */
var app = angular.module('siendoApp',['ngRoute', 'angularUtils.directives.dirPagination', 'angular-spinkit', 'selectionModel', 'highcharts-ng', 'ngLodash', 'siendoFactories', 'AkunController', 'DashboardController', 'FakultasController', 'DonasiController', 'DonaturController']);
 
app.run(function(){
	//
});

/* KONFIGURASI */
// konfigurasi plugin dirPagination
app.config(function(paginationTemplateProvider) {
    paginationTemplateProvider.setPath('dirPagination.tpl.html');
});

/* ROUTING */
app.config(function($routeProvider, $locationProvider){
	$routeProvider.when('/',{
		templateUrl:'pages/beranda.html',
		controller: 'DashboardCtrl',
		kecuali: '',
		kecuali2: '',
	});
	$routeProvider.when('/donasi',{
		templateUrl:'pages/donasi.html',
		controller:'DonasiCtrl as donasiCtrl',
		kecuali: 'Donatur',
		kecuali2: '',
	});
	$routeProvider.when('/donatur',{
		templateUrl:'pages/donatur.html',
		controller:'DonaturCtrl',
		kecuali: 'Tim Fundrising',
		kecuali2: 'Donatur',
	});
	$routeProvider.when('/akun',{
		templateUrl:'pages/akun.html',
		controller: 'AkunCtrl',
		kecuali: 'Tim Fundrising',
		kecuali2: 'Donatur',
	});
	$routeProvider.when('/tambah_donasi',{
		templateUrl:'pages/form_donasi.html',
		controller: 'DonasiCtrl',
		kecuali: 'Donatur',
		kecuali2: '',
	});
	$routeProvider.when('/fakultas',{
		templateUrl:'pages/fakultas.html',
		controller: 'FakultasCtrl',
		kecuali: 'Tim Fundrising',
		kecuali2: 'Donatur',
	});
	$routeProvider.when('/atur_akun',{
		templateUrl:'pages/atur_akun.html',
		controller: 'AturAkunCtrl',
		kecuali: '',
		kecuali2: '',
	});
});

/* MAIN CONTROLLERS */
app.controller('MainController', function($scope, AkunSvc, $rootScope, $location){

	$scope.halaman = "beranda";

	

	$scope.get_user_now = function(){
		var get_user = AkunSvc.get_user();
		get_user.success(function(res){
			$scope.user_aktif = res;
		});
	}
	$scope.get_user_now();

	$scope.is_empty = function(variabel){
		return ((variabel === undefined)||(variabel === ''));
	}

	
	$rootScope.$on('$routeChangeStart', function (event, next) {
		if($scope.user_aktif){
			if ($scope.user_aktif.role == next.kecuali){
	            $location.path('/');
    	    }else if($scope.user_aktif.role == next.kecuali2){
       		 	$location.path('/');
        	}
		}else{
			var get_user = AkunSvc.get_user();
			get_user.success(function(res){
				$scope.user_aktif = res;
				if ($scope.user_aktif.role == next.kecuali) {
		            $location.path('/');
	    	    }else if($scope.user_aktif.role == next.kecuali2){
	       		 	$location.path('/');
	        	}
			});
		}
    });
});