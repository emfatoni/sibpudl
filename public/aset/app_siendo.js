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

app.controller('NavController', function($scope, AkunSvc){
	$scope.halaman = "beranda";
	var getUser = AkunSvc.get_user();
	getUser.success(function(res){
		//alert("berhasil "+res.user.nama);
		$scope.user_aktif = res;
	});
});

app.controller('DonaturCtrl', function($scope, DonaturSvc){
	$scope.num = 0;
	var getDonatur = DonaturSvc.all();
	$scope.jenis_lv_1 = "";
	$scope.jenis_lv_2 = "";
	$scope.nama = "";
	$scope.angkatan = "";

	getDonatur.success(function(response){
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
	$scope.num = 0;
	var getDonasi = DonasiSvc.all();
	var getDonatur = DonaturSvc.all();
	$scope.angkatan = "";
	$scope.perwakilan = "";
	$scope.nama = "";
	$scope.jenis_lv_1 = "";
	$scope.jenis_lv_2 = "";
	$scope.jenis_final = "";
	$scope.is_new = false;

	$scope.new_donasi = {"id_donatur": "", "tanggal": "", "nominal": "", "termin": "", "channel": "", "jenis": "", "syarat": "", "kota": ""};

	getDonasi.success(function(response){
		$scope.donasis = response;
	});
	getDonatur.success(function(res){
		$scope.donaturs = res;
	});

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
		$scope.perwakilan = "";
	}

	$scope.getFresh2 = function(){
		if($scope.jenis_lv_2 == "Satu ITB"){
			$scope.nama = "ITB";
			$scope.angkatan = "";
			$scope.perwakilan = "";
		}else{
			$scope.nama = "";
			$scope.angkatan = "";
			$scope.perwakilan = "";
		}
	}

	$scope.freshDonatur = function(){
		var newDonatur = DonaturSvc.all();
		newDonatur.success(function(res){
			$scope.donaturs = res;
		});
	}

	$scope.val_donasi = function(){
		if($scope.new_donasi.id_donatur == ""){
			return "Tidak ada donatur yang dipilih.";
		}else if((($scope.new_donasi.jenis=="Dana Lestari Bersyarat")||($scope.new_donasi.jenis=="Donasi Bersyarat"))&&($scope.new_donasi.syarat=="")){
			return "Syarat belum diisi.";
		}else{
			return "";
		}
	}

	$scope.simpan_donatur = function(){
		var new_donatur = {"nama": $scope.nama+' '+$scope.angkatan, "jenis": $scope.jenis_lv_1+' '+$scope.jenis_lv_2, "nama_wakil": $scope.perwakilan};
		//alert(new_donatur.nama+","+new_donatur.jenis);
		var req = DonaturSvc.create(new_donatur);
		req.success(function(res){
			alert("Donatur "+res.status);
			$scope.freshDonatur();
			$scope.is_new = false;
		});
	}

	$scope.simpan_donasi = function(){
		if($scope.val_donasi() == ""){
			//console.log($scope.new_donasi);
			var req = DonasiSvc.create($scope.new_donasi);
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
		templateUrl:'aset/siendo/pages/akun.html',
		controller: 'AkunCtrl'
	});
	$routeProvider.when('/form_donasi',{
		templateUrl:'aset/siendo/pages/form_donasi.html',
		controller: 'DonasiCtrl'
	});
	$routeProvider.when('/add_donatur',{
		templateUrl:'aset/siendo/pages/form_donatur.html',
		controller: 'DonaturCtrl'
	});
	$routeProvider.when('/edit_donatur/:id',{
		templateUrl:'aset/siendo/pages/form_donatur.html',
		controller: 'EditDonaturCtrl'
	});
	$routeProvider.when('/form_akun',{
		templateUrl:'aset/siendo/pages/form_akun.html',
		controller: 'AkunCtrl'
	});
});

