var app = angular.module('siendoApp',['ngRoute', 'angularUtils.directives.dirPagination', 'angular-spinkit', 'selectionModel']);
 
app.run(function(){
	//
});

/* FILTER-FILTER */
app.filter('channel', function(){
	return function(inputs, channel){
		var terfilter = [];
		if(channel === undefined || channel === ''){return inputs;
		}

		angular.forEach(inputs, function(item) {
			if(channel === item.channel){
				terfilter.push(item);
			}
		});
		return terfilter;
	};
});
app.filter('jenis', function(){
	return function(inputs, jenis){
		var terfilter = [];
		if(jenis === undefined || jenis === ''){return inputs;
		}

		angular.forEach(inputs, function(item) {
			if(jenis === item.jenis){
				terfilter.push(item);
			}
		});
		return terfilter;
	};
});

app.config(function(paginationTemplateProvider) {
    paginationTemplateProvider.setPath('dirPagination.tpl.html');
});

/* ROUTING */
app.config(function($routeProvider, $locationProvider){

	$routeProvider.when('/',{
		templateUrl:'pages/beranda.html'
	});

	$routeProvider.when('/donasi',{
		templateUrl:'pages/donasi.html',
		controller:'DonasiCtrl as donasiCtrl',
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

	$scope.is_empty = function(variabel){
		return ((variabel === undefined)||(variabel === ''));
	}


	/*
	$rootScope.$on('$routeChangeStart', function (event, next) {
        if ($scope.user_aktif.user.role == next.kecuali) {
            $location.path('/');
        }
    });
	*/
});
app.controller('DonaturCtrl', function($scope, DonaturSvc, $location, $filter, $anchorScroll){

	// mengambil data donatur
	$scope.get_donaturs = function(){
		$scope.is_loading = true;
		var req = DonaturSvc.all();
		req.success(function(res){
			$scope.donaturs = res;
			$scope.is_loading = false;
		});
	}

	// variabel
	$scope.selected_donatur = [];
	$scope.is_add = false;
	$scope.is_edit = false;
	$scope.is_loading = true;
	$scope.is_saving = false;
	$scope.pageSize = 10;
	$scope.angkatan = "";
	$scope.nama = "";
	$scope.jenis_lv_1 = "";
	$scope.jenis_lv_2 = "";
	$scope.temp_donatur = {
			"nama": "",
			"jenis": "",
			"nama_wakil": "",
			"telp": "",
			"email": "",
			"alamat_surat": ""
	};
	$scope.get_donaturs();

	
	// fungsi-fungsi
	$scope.fresh_donatur = function(){
		$scope.temp_donatur = {
			"nama": "",
			"jenis": "",
			"nama_wakil": "",
			"telp": "",
			"email": "",
			"alamat_surat": ""
		};
		$scope.angkatan = "";
		$scope.nama = "";
		$scope.jenis_lv_1 = "";
		$scope.jenis_lv_2 = "";
	}
	$scope.fresh_donatur();

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

	// fungsi-fungsi
	$scope.add_donatur_mode = function(){
		$scope.fresh_donatur();
		$anchorScroll('edit-form');
		$scope.is_add = true;
	}
	$scope.get_donatur = function(id_donatur){
		$anchorScroll('edit-form');
		$scope.is_edit = true;

		$scope.temp_donatur = $filter('filter')($scope.donaturs, {id:id_donatur})[0];

		var jenis = $scope.temp_donatur.jenis.split(' ');

		$scope.jenis_lv_1 = jenis[0];
		if(jenis.length == 3){
			$scope.jenis_lv_2 = jenis[1]+" "+jenis[2];
		}else{
			$scope.jenis_lv_2 = jenis[1];
		}

		if(jenis[0] === "Alumni"){
			var nama = $scope.temp_donatur.nama.split(' ');

			if($scope.jenis_lv_2 != "Satu ITB"){
				$scope.nama = $scope.temp_donatur.nama.replace(nama[nama.length-1], "");
			}else{
				$scope.nama = "ITB";
			}

			$scope.angkatan = nama.pop();
		}else{
			$scope.nama = $scope.temp_donatur.nama;
		}
	}
	$scope.val_donatur = function(){
		if($scope.is_empty($scope.jenis_lv_1)){
			return "!!! Jenis belum diisi";
		}else if(($scope.is_empty($scope.jenis_lv_2))&&($scope.jenis_lv_1 != 'Personal')){
			return "!!! Jenis belum diisi";
		}else if($scope.is_empty($scope.nama)){
			return "!!! Nama belum diisi";
		}else if(($scope.jenis_lv_1 != 'Organisasi')&&($scope.jenis_lv_1 != 'Personal')&&($scope.jenis_lv_2 != 'Individu')&&($scope.is_empty($scope.angkatan))){
			return "!!! Angkatan belum diisi";
		}else{
			return "";
		}
	}
	$scope.add_donatur = function(){
		$scope.is_saving = true;
		var validasi = $scope.val_donatur();
		if($scope.is_empty(validasi)){
			$scope.temp_donatur.nama = $scope.nama+' '+$scope.angkatan;
			$scope.temp_donatur.jenis = $scope.jenis_lv_1+' '+$scope.jenis_lv_2;
			
			var req = DonaturSvc.create($scope.temp_donatur);
			req.success(function(res){
				$scope.is_saving = false;
				alert("Donatur "+res.status);
				$scope.get_donaturs();
				$scope.fresh_donatur();
				$scope.is_add = false;
			});
		}else{
			$scope.is_saving = false;
			alert(validasi);
		}
	}
	$scope.edit_donatur = function(){
		$scope.is_saving = true;
		var validasi = $scope.val_donatur();
		if($scope.is_empty(validasi)){
			$scope.temp_donatur.nama = $scope.nama+' '+$scope.angkatan;
			$scope.temp_donatur.jenis = $scope.jenis_lv_1+' '+$scope.jenis_lv_2;
			
			var req = DonaturSvc.update($scope.temp_donatur.id, $scope.temp_donatur);
			req.success(function(res){
				$scope.is_saving = false;
				$scope.is_edit = false;
				alert("Donatur "+res.status);
				$scope.get_donaturs();
				$scope.fresh_donatur();
			});
		}else{
			$scope.is_saving = false;
			alert(validasi);
		}
	}
	
});
app.controller('DonasiCtrl', function($scope, DonasiSvc, DonaturSvc, $location, $filter, $anchorScroll){

	// mengambil data donasi
	$scope.get_donasis = function(){
		$scope.is_loading = true;
		var req = DonasiSvc.all();
		req.success(function(res){
			$scope.donasis = res;
			$scope.is_loading = false;
		});
	}
	$scope.get_donaturs = function(){
		var req = DonaturSvc.all();
		req.success(function(res){
			$scope.donaturs = res;
		});
	}

	// inisiasi variabel
	$scope.selected_donasi = [];
	$scope.is_edit = false;
	$scope.is_loading = true;
	$scope.is_saving = false;
	$scope.pageSize = 10;
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
	$scope.get_donasi = function(id_donasi){
		$anchorScroll('edit-form');
		$scope.is_edit = true;

		$scope.temp_donasi = $filter('filter')($scope.donasis, {id:id_donasi})[0];
		$scope.temp_donasi.tanggal = new Date($scope.temp_donasi.tanggal);
	}
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
		if($scope.is_empty($scope.temp_donasi.id_donatur)){
			return "!!! Tidak ada donatur yang dipilih.";
		}else if($scope.is_empty($scope.temp_donasi.tanggal)){
			return "!!! Tanggal belum diisi";
		}else if($scope.is_empty($scope.temp_donasi.nominal)){
			return "!!! Nominal belum diisi";
		}else if($scope.is_empty($scope.temp_donasi.termin)){
			return "!!! Termin belum diisi";
		}else if($scope.is_empty($scope.temp_donasi.channel)){
			return "!!! Sistem donasi belum diisi";
		}else if($scope.is_empty($scope.temp_donasi.jenis)){
			return "!!! Jenis belum diisi";
		}else if((($scope.temp_donasi.jenis=="Dana Lestari Bersyarat")||($scope.temp_donasi.jenis=="Donasi Bersyarat"))&&($scope.is_empty($scope.temp_donasi.syarat))){
			return "!!! Syarat belum diisi.";
		}else{
			return "";
		}
	}
	$scope.val_donatur = function(){
		if($scope.is_empty($scope.jenis_lv_1)){
			return "!!! Jenis belum diisi";
		}else if(($scope.is_empty($scope.jenis_lv_2))&&($scope.jenis_lv_1 != 'Personal')){
			return "!!! Jenis belum diisi";
		}else if($scope.is_empty($scope.nama)){
			return "!!! Nama belum diisi";
		}else if(($scope.jenis_lv_1 != 'Organisasi')&&($scope.jenis_lv_1 != 'Personal')&&($scope.jenis_lv_2 != 'Individu')&&($scope.is_empty($scope.angkatan))){
			return "!!! Angkatan belum diisi";
		}else{
			return "";
		}
	}
	$scope.simpan_donatur = function(){
		$scope.is_saving = true;
		var validasi = $scope.val_donatur();
		if($scope.is_empty(validasi)){
			$scope.temp_donatur.nama = $scope.nama+' '+$scope.angkatan;
			$scope.temp_donatur.jenis = $scope.jenis_lv_1+' '+$scope.jenis_lv_2;
			
			var req = DonaturSvc.create($scope.temp_donatur);
			req.success(function(res){
				$scope.is_saving = false;
				alert("Donatur "+res.status);
				$scope.get_donaturs();
				$scope.new_donatur = false;
				$scope.fresh_donatur();
			});
		}else{
			$scope.is_saving = false;
			alert(validasi);
		}
	}
	$scope.simpan_donasi = function(){
		$scope.is_saving = true;
		var validasi = $scope.val_donasi();
		if($scope.is_empty(validasi)){
			var req = DonasiSvc.create($scope.temp_donasi);
			req.success(function(res){
				$scope.is_saving = false;
				alert("Donasi "+res.status);
				$location.path('/donasi');
			});
		}else{
			$scope.is_saving = false;
			alert(validasi);
		}
	}
	$scope.edit_donasi = function(){
		$scope.is_saving = true;
		var validasi = $scope.val_donasi();
		if($scope.is_empty(validasi)){
			var req = DonasiSvc.update($scope.temp_donasi.id, $scope.temp_donasi);
			req.success(function(res){
				$scope.is_saving = false;
				$scope.get_donasis();
				alert("Donasi "+res.status);
				$scope.is_edit = false;
			});
		}else{
			$scope.is_saving = false;
			alert(validasi);
		}
	}
	$scope.del_donasi = function(){
		$scope.is_saving = true;
		
		var req = DonasiSvc.delete($scope.temp_donasi.id);
		req.success(function(res){
			$scope.is_saving = false;
			$scope.get_donasis();
			alert("Donasi "+res.status);
			$scope.is_edit = false;
		});
	}
	$scope.sah_donasi = function(){
		$scope.is_saving = true;
		$scope.temp_donasi.status = 'disahkan';
		var req = DonasiSvc.update($scope.temp_donasi.id, $scope.temp_donasi);
		req.success(function(res){
			$scope.is_saving = false;
			$scope.get_donasis();
			alert("Donasi "+res.status);
			$scope.is_edit = false;
		});
	}
	$scope.unsah_donasi = function(){
		$scope.is_saving = true;
		$scope.temp_donasi.status = 'ditunda';
		var req = DonasiSvc.update($scope.temp_donasi.id, $scope.temp_donasi);
		req.success(function(res){
			$scope.is_saving = false;
			$scope.get_donasis();
			alert("Donasi "+res.status);
			$scope.is_edit = false;
		});
	}
	$scope.del_donasi_banyak = function(){
		for(var i=0; i<$scope.selected_donasi.length; i++){
			var donasi = $scope.selected_donasi[i];
			DonasiSvc.delete(donasi.id);
		}
		$scope.selected_donasi = [];
		$scope.get_donasis();
	}
	$scope.sah_donasi_banyak = function(){
		for(var i=0; i<$scope.selected_donasi.length; i++){
			var donasi = $scope.selected_donasi[i];
			donasi.status = "disahkan";
			DonasiSvc.update(donasi.id, donasi);
		}
		$scope.selected_donasi = [];
		$scope.get_donasis();
	}
	$scope.unsah_donasi_banyak = function(){
		for(var i=0; i<$scope.selected_donasi.length; i++){
			var donasi = $scope.selected_donasi[i];
			donasi.status = "ditunda";
			DonasiSvc.update(donasi.id, donasi);
		}
		$scope.selected_donasi = [];
		$scope.get_donasis();
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
			$location.path('/akun');
		});
	}
});



