var app = angular.module('siendoApp',['ngRoute']);
 
app.run(function(){
	//
});

/* ROUTING */
app.config(function($routeProvider, $locationProvider){

	$routeProvider.when('/',{
		templateUrl:'pages/beranda.html'
	});

	$routeProvider.when('/donasi',{
		templateUrl:'pages/donasi.html',
		controller:'DonasiCtrl',
		kecuali: '',
	});

	$routeProvider.when('/donatur',{
		templateUrl:'pages/donatur.html',
		controller:'DonaturCtrl',
		kecuali: 'Tim Fundrising',
	});

	$routeProvider.when('/akun',{
		templateUrl:'pages/akun.html',
		controller: 'AkunCtrl',
		kecuali: 'Tim Fundrising',
	});

	$routeProvider.when('/tambah_donasi',{
		templateUrl:'pages/form_donasi.html',
		controller: 'DonasiCtrl',
		kecuali: '',
	});

	$routeProvider.when('/tambah_akun',{
		templateUrl:'pages/form_akun.html',
		controller: 'AkunCtrl',
		kecuali: 'Tim Fundrising',
	});

	/*
	$routeProvider.when('/tambah_donatur',{
		templateUrl:'pages/form_donatur.html',
		controller: 'DonaturCtrl',
		kecuali: 'Tim Fundrising',
	});

	$routeProvider.when('/edit_donatur/:id',{
		templateUrl:'aset/siendo/pages/form_donatur.html',
		controller: 'EditDonaturCtrl',
		kecuali: 'Tim Fundrising',
	});*/
});

/* SERVICES */
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
app.factory("AkunSvc", function($http){
	return{
		all: function(){
			var req = $http({method:'GET', url:'karyawan'});
			return req;
		},
		create: function(data){
			var req = $http({method:'GET', url:'karyawan/create', params:data});
			return req;
		},
		get: function(id){
			var req = $http.get('karyawan/'+id);
			return req;
		},
		update: function(id, data){
			var req = $http.put('karyawan/'+id, data);
			return req;
		},
		delete: function(id){
			var req = $http.delete('karyawan/'+id);
			return req;
		},
		get_user: function(){
			var req = $http({method:'GET', url:'karyawan/get_user'});
			return req;
		}
	}
});

/* CONTROLLERS */
app.controller('MainController', function($scope, AkunSvc, $rootScope, $location){

	$scope.halaman = "beranda";

	var get_user = AkunSvc.get_user();
	get_user.success(function(res){
		$scope.user_aktif = res;
	});

	/*
	$rootScope.$on('$routeChangeStart', function (event, next) {
        if ($scope.user_aktif.user.role == next.kecuali) {
            $location.path('/');
        }
    });
	*/
});
app.controller('DonaturCtrl', function($scope, DonaturSvc){

	var get_donaturs = DonaturSvc.all();

	$scope.jenis_lv_1 = "";
	$scope.jenis_lv_2 = "";
	$scope.nama = "";
	$scope.angkatan = "";

	get_donaturs.success(function(response){
		$scope.donaturs = response;
	});

	$scope.fresh_donatur = function(){
		$scope.a_donatur = {
			"nama": "",
			"jenis": "",
			"nama_wakil": "",
			"telp": "",
			"email": "",
			"alamat_surat": ""
		};
	}

	$scope.fresh_donatur();

	$scope.getNama = function(){
		if($scope.jenis_lv_2 == "Individu"){
			return "alumni";
		}else if($scope.jenis_lv_2 == "Program Studi"){
			return "program studi";
		}else if($scope.jenis_lv_1 == "Organisasi"){
			return "organisasi/lembaga/instansi";
		}else{
			return "donatur";
		}
	};

	$scope.getFresh = function(){
		$scope.jenis_lv_2 = "";
		$scope.nama = "";
		$scope.angkatan = "";
	}

	$scope.getFresh2 = function(){
		if($scope.jenis_lv_2 == "Satu ITB"){
			$scope.nama = "ITB";
			$scope.angkatan = "";
		}else{
			$scope.nama = "";
			$scope.angkatan = "";
		}
	}
});

app.controller('EditDonaturCtrl', function($scope, DonaturSvc){
	$scope.num = 0;
	var getDonatur = DonaturSvc.all();

	getDonatur.success(function(response){
		$scope.donaturs = response;
	});
});

app.controller('DonasiCtrl', function($scope, DonasiSvc, DonaturSvc, $location){

	// mengambil data donasi
	$scope.get_donasis = function(){
		var req = DonasiSvc.all();
		req.success(function(res){
			$scope.donasis = res;
		});
	}
	$scope.get_donaturs = function(){
		var req = DonaturSvc.all();
		req.success(function(res){
			$scope.donaturs = res;
		});
	}

	// inisiasi variabel
	$scope.new_donatur = false;
	$scope.angkatan = "";
	$scope.nama = "";
	$scope.jenis_lv_1 = "";
	$scope.jenis_lv_2 = "";
	$scope.temp_donasi = {
		"id_donatur": "", 
		"tanggal": "", 
		"nominal": "", 
		"termin": "", 
		"channel": "", 
		"jenis": "", 
		"syarat": "", 
		"kota": "",
		"status": "ditunda"
	};
	$scope.temp_donatur = {
		"nama": "",
		"jenis": "",
		"nama_wakil": ""
	};
	$scope.get_donaturs();
	$scope.get_donasis();

	// fungsi-fungsi
	$scope.get_nama = function(){
		if($scope.jenis_lv_2 == "Individu"){
			return "alumni";
		}else if($scope.jenis_lv_2 == "Program Studi"){
			return "program studi";
		}else if($scope.jenis_lv_1 == "Organisasi"){
			return "organisasi/lembaga/instansi";
		}else{
			return "donatur";
		}
	}
	$scope.fresh_donatur = function(){
		$scope.temp_donatur = {
			"nama": "",
			"jenis": "",
			"nama_wakil": ""
		};
		$scope.angkatan = "";
		$scope.nama = "";
		$scope.jenis_lv_1 = "";
		$scope.jenis_lv_2 = "";
	}
	$scope.fresh_level1 = function(){
		$scope.jenis_lv_2 = "";
		$scope.nama = "";
		$scope.angkatan = "";
		$scope.temp_donatur.nama_wakil = "";
	}
	$scope.fresh_level2 = function(){
		if($scope.jenis_lv_2 == "Satu ITB"){
			$scope.nama = "ITB";
			$scope.angkatan = "";
			$scope.temp_donatur.nama_wakil = "";
		}else{
			$scope.nama = "";
			$scope.angkatan = "";
			$scope.temp_donatur.nama_wakil = "";
		}
	}
	$scope.val_donasi = function(){
		if($scope.temp_donasi.id_donatur == ""){
			return "Tidak ada donatur yang dipilih.";
		}else if((($scope.temp_donasi.jenis=="Dana Lestari Bersyarat")||($scope.temp_donasi.jenis=="Donasi Bersyarat"))&&($scope.temp_donasi.syarat=="")){
			return "Syarat belum diisi.";
		}else{
			return "";
		}
	}
	$scope.simpan_donatur = function(){
		$scope.temp_donatur.nama = $scope.nama+' '+$scope.angkatan;
		$scope.temp_donatur.jenis = $scope.jenis_lv_1+' '+$scope.jenis_lv_2;
		
		var req = DonaturSvc.create($scope.temp_donatur);
		req.success(function(res){
			alert("Donatur "+res.status);
			$scope.get_donaturs();
			$scope.new_donatur = false;
			$scope.fresh_donatur();
		});
	}
	$scope.simpan_donasi = function(){
		if($scope.val_donasi() == ""){
			var req = DonasiSvc.create($scope.temp_donasi);
			req.success(function(res){
				alert("Donasi "+res.status);
				$location.path('/donasi');
			});
		}else{
			alert($scope.val_donasi());
		}
	}
});

app.controller('AkunCtrl', function($scope, AkunSvc, $location){
	$scope.freshAkun = function(){
		var getAkun = AkunSvc.all();
		getAkun.success(function(res){
			$scope.akuns = res;
		});
	}
	$scope.freshAkun();

	$scope.newakun = {
		"nama":"",
		"jabatan":"",
		"telp":"",
		"alamat":"",
		"email":"",
		"password":"",
		"role":""
	};

	$scope.simpan_akun = function(){
		var req = AkunSvc.create($scope.newakun);
		req.success(function(res){
			alert("Akun "+res.status);
		});
	}
});



