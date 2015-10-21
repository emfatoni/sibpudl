/* INISIASI SISTEM */
var app = angular.module('siendoApp',['ngRoute', 'angularUtils.directives.dirPagination', 'angular-spinkit', 'selectionModel', 'highcharts-ng', 'ngLodash']);
 
app.run(function(){
	//
});


/* KONFIGURASI */
// konfigurasi plugin dirPagination
app.config(function(paginationTemplateProvider) {
    paginationTemplateProvider.setPath('dirPagination.tpl.html');
});

/* FACTORY */
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
			var req = $http({method:'GET', url:'akun'});
			return req;
		},
		create: function(data){
			var req = $http({method:'GET', url:'akun/create', params:data});
			return req;
		},
		get: function(id){
			var req = $http.get('akun/'+id);
			return req;
		},
		update: function(id, data){
			var req = $http.put('akun/'+id, data);
			return req;
		},
		delete: function(id){
			var req = $http.delete('akun/'+id);
			return req;
		},
		get_user: function(){
			var req = $http({method:'GET', url:'akun/get_user'});
			return req;
		}
	}
});
app.factory("FakultasSvc", function($http){
	return{
		all: function(){
			var req = $http({method:'GET', url:'fakultas'});
			return req;
		},
		create: function(data){
			var req = $http({method:'GET', url:'fakultas/create', params:data});
			return req;
		},
		get: function(id){
			var req = $http.get('fakultas/'+id);
			return req;
		},
		update: function(id, data){
			var req = $http.put('fakultas/'+id, data);
			return req;
		},
		delete: function(id){
			var req = $http.delete('fakultas/'+id);
			return req;
		}
	}
});
app.factory("ProdiSvc", function($http){
	return{
		all: function(){
			var req = $http({method:'GET', url:'prodi'});
			return req;
		},
		create: function(data){
			var req = $http({method:'GET', url:'prodi/create', params:data});
			return req;
		},
		get: function(id){
			var req = $http.get('prodi/'+id);
			return req;
		},
		update: function(id, data){
			var req = $http.put('prodi/'+id, data);
			return req;
		},
		delete: function(id){
			var req = $http.delete('prodi/'+id);
			return req;
		}
	}
});


/* ROUTING */
app.config(function($routeProvider, $locationProvider){
	$routeProvider.when('/',{
		templateUrl:'pages/beranda.html',
		controller: 'DashboardCtrl',
		kecuali: '',
		kecuali2: '',
		/*resolve: {
			Uaktif: ['$q', '$http', function($q, $http){
				var hsl = $q.defer();
				var req = $http({method:'GET', url:'akun/get_user'});
				req.success(function(res){
					hsl.resolve(res);
				});
				return hsl.promise;
			}]
		}*/
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

/*MainController.resolve = {
	uaktif : function(AkunSvc){
		var get_user = AkunSvc.get_user();
		get_user.success(function(res){
			return res;
		});
	}
}*/

/* PENGATURAN AKUN */
app.controller('AturAkunCtrl', function($scope, AkunSvc, $filter, $location){


	$scope.get_akuns = function(){
		var req = AkunSvc.all();
		req.success(function(res){
			$scope.akuns = res;
		});
	}
	$scope.get_akuns();

	$scope.is_editpwd = false;
	$scope.repassword = "";
	$scope.temp_akun = {
		"nama":"",
		"jabatan":"",
		"telp":"",
		"alamat":"",
		"email":"",
		"password":"",
		"role":""
	};
	
	$scope.get_akun = function(){
		var get_user = AkunSvc.get_user();
		get_user.success(function(res){
			$scope.temp_akun = res;
			$scope.old_email = $scope.temp_akun.email;
		});
	}
	$scope.get_akun();

	$scope.val_akun = function(){
		var akun = $scope.temp_akun;
		var is_ada = $filter('filter')($scope.akuns, {email:akun.email})[0];
		
			if($scope.is_empty(akun.nama)){
				return "!!! Nama belum diisi";
			}else if($scope.is_empty(akun.telp)){
				return "!!! Nomor telepon belum diisi";
			}else if($scope.is_empty(akun.alamat)){
				return "!!! Alamat belum diisi";
			}else if($scope.is_empty(akun.email)){
				return "!!! Alamat E-mail belum diisi";
			}else if($scope.is_empty(akun.role)){
				return "!!! Peran belum diisi";
			}else if($scope.is_empty(akun.password) && ($scope.is_edit == false)){
				return "!!! Password belum diisi";
			}else if(($scope.repassword != akun.password) && !$scope.is_empty(akun.password)){
				return "!!! Password berbeda";
			}else if(is_ada && (akun.email != $scope.old_email)){

				return "!!! Alamat e-mail sudah dipakai.";
			}else{
				return "";
			}
	}

	$scope.edit_akun = function(){
		$scope.is_saving = true;

		var validasi = $scope.val_akun();

		if($scope.is_empty(validasi)){
			var req = AkunSvc.update($scope.temp_akun.id, $scope.temp_akun);
			req.success(function(res){
				alert("Akun "+res.status);
				$scope.get_akuns();
				$scope.get_akun();
				$scope.get_user_now();
				$scope.is_saving = false;
			});
		}else{
			alert(validasi);
			$scope.is_saving = false;
		}
	}

});

/* KELOLA FAKULTAS-PRODI */
app.filter('fakultas_prodi', function(){
	return function(inputs, param){
		var terfilter = [];
		if(param === undefined || param === ''){return inputs;
		}
		angular.forEach(inputs, function(item) {
			if(param == item.id_fakultas){
				terfilter.push(item);
			}
		});
		return terfilter;
	};
});
app.controller('FakultasCtrl', function($scope, FakultasSvc, ProdiSvc, $filter, $location, $anchorScroll){

	// variabel
	$scope.fakultass = {};
	$scope.prodis = {};
	$scope.is_loading = false;
	$scope.is_saving = false;
	$scope.is_edit = false;
	$scope.is_add = false;
	$scope.is_fakultas = false;
	$scope.temp_fakultas = {
		"kode": "",
		"singkatan": "",
		"kepanjangan": "",
	};
	$scope.temp_prodi = {
		"kode": "",
		"singkatan": "",
		"kepanjangan": "",
		"id_fakultas": "",
	};

	// fungsi ambil data
	$scope.get_fakultass = function(){
		$scope.is_loading = true;
		var req = FakultasSvc.all();
		req.success(function(res){
			$scope.fakultass = res;
			$scope.is_loading = false;
		});
	}
	$scope.get_prodis = function(){
		$scope.is_loading = true;
		var req = ProdiSvc.all();
		req.success(function(res){
			$scope.prodis = res;
			$scope.is_loading = false;
		});
	}
	$scope.get_fakultass();
	$scope.get_prodis();

	// fungsi tampilan
	$scope.add_fakultas_form = function(){
		$scope.is_add = true;
		$scope.is_fakultas = true;
		$anchorScroll('page-form');
		$scope.temp_fakultas = {
			"kode": "",
			"singkatan": "",
			"kepanjangan": "",
		};
	}
	$scope.add_prodi_form = function(){
		$scope.is_add = true;
		$scope.is_fakultas = false;
		$anchorScroll('page-form');
		$scope.temp_prodi = {
			"kode": "",
			"singkatan": "",
			"kepanjangan": "",
			"id_fakultas": "",
		};
	}
	$scope.fresh_fakultas = function(){
		$scope.temp_fakultas = {
			"kode": "",
			"singkatan": "",
			"kepanjangan": "",
		};
		$scope.temp_prodi = {
			"kode": "",
			"singkatan": "",
			"kepanjangan": "",
			"id_fakultas": "",
		};
		$scope.is_add = false;
		$scope.is_edit = false;
		$scope.is_fakultas = false;
	}
	$scope.edit_form_fakultas = function(id_fakultas){
		$scope.temp_fakultas = $filter('filter')($scope.fakultass, {id:id_fakultas})[0];
		$scope.is_edit = true;
		$scope.is_fakultas = true;
	}
	$scope.edit_form_prodi = function(id_prodi){
		$scope.temp_prodi = $filter('filter')($scope.prodis, {id:id_prodi})[0];
		$scope.is_edit = true;
		$scope.is_fakultas = false;
	}

	// fungsi database
	$scope.val_fakultas = function(){
		var i = $scope.temp_fakultas;
		if($scope.is_empty(i.singkatan)){
			return "!!! Setidaknya singkatan harus diisi";
		}else{
			return "";
		}
	}
	$scope.val_prodi = function(){
		var i = $scope.temp_prodi;
		if($scope.is_empty(i.kepanjangan)){
			return "!!! Setidaknya nama panjang diisi";
		}else if($scope.is_empty(i.id_fakultas)){
			return "!!! Fakultas harus diisi";
		}else{
			return "";
		}
	}
	$scope.add_data_fakultas = function(){
		$scope.is_saving = true;
		var validasi = $scope.val_fakultas();
		if($scope.is_empty(validasi)){
			var req = FakultasSvc.create($scope.temp_fakultas);
			req.success(function(res){
				$scope.get_fakultass();
				$scope.is_saving = false;
				alert("Fakultas "+res.status);
				$scope.fresh_fakultas();
			});
		}else{
			$scope.is_saving = false;
			alert(validasi);
		}
	}
	$scope.add_data_prodi = function(){
		$scope.is_saving = true;
		var validasi = $scope.val_prodi();
		if($scope.is_empty(validasi)){
			var req = ProdiSvc.create($scope.temp_prodi);
			req.success(function(res){
				$scope.get_prodis();
				$scope.is_saving = false;
				alert("Program Studi "+res.status);
				$scope.fresh_fakultas();
			});
		}else{
			$scope.is_saving = false;
			alert(validasi);
		}
	}
	$scope.edit_data_fakultas = function(){
		$scope.is_saving = true;
		var validasi = $scope.val_fakultas();
		if($scope.is_empty(validasi)){
			var req = FakultasSvc.update($scope.temp_fakultas.id, $scope.temp_fakultas);
			req.success(function(res){
				$scope.get_fakultass();
				$scope.is_saving = false;
				alert("Fakultas "+res.status);
				$scope.fresh_fakultas();
			});
		}else{
			$scope.is_saving = false;
			alert(validasi);
		}
	}
	$scope.edit_data_prodi = function(){
		$scope.is_saving = true;
		var validasi = $scope.val_prodi();
		if($scope.is_empty(validasi)){
			var req = ProdiSvc.update($scope.temp_prodi.id, $scope.temp_prodi);
			req.success(function(res){
				$scope.get_prodis();
				$scope.is_saving = false;
				alert("Program Studi "+res.status);
				$scope.fresh_fakultas();
			});
		}else{
			$scope.is_saving = false;
			alert(validasi);
		}
	}
	$scope.del_data_fakultas = function(){
		$scope.is_saving = true;
		if(confirm("Anda yakin ingin menghapus data Fakultas ini?")){
			var req = FakultasSvc.delete($scope.temp_fakultas.id);
			req.success(function(res){
				$scope.get_fakultass();
				$scope.is_saving = false;
				alert("Fakultas "+res.status);
				$scope.fresh_fakultas();
			});
		}else{
			$scope.is_saving = false;	
		}
	}
	$scope.del_data_prodi = function(){
		$scope.is_saving = true;
		var req = ProdiSvc.delete($scope.temp_prodi.id);
		if(confirm("Anda yakin ingin menghapus data Program Studi ini?")){
			req.success(function(res){
				$scope.get_prodis();
				$scope.is_saving = false;
				alert("Program Studi "+res.status);
				$scope.fresh_fakultas();
			});
		}else{
			$scope.is_saving = false;	
		}
	}

});


/* KELOLA DONATUR */
app.filter('jenis_donatur', function(){
	return function(inputs, param){
		var terfilter = [];
		if(param === undefined || param === ''){return inputs;
		}
		angular.forEach(inputs, function(item) {
			var jenis = item.jenis.split(' ');
			if(param === jenis[0]){
				terfilter.push(item);
			}
		});
		return terfilter;
	};
});
app.filter('alumni_donatur', function(){
	return function(inputs, param){
		var terfilter = [];
		if(param === undefined || param === ''){return inputs;
		}
		angular.forEach(inputs, function(item) {
			var jenis = item.jenis.split(' ');
			if(param === jenis[1]){
				terfilter.push(item);
			}
		});
		return terfilter;
	};
});
app.filter('organisasi_donatur', function(){
	return function(inputs, param){
		var terfilter = [];
		if(param === undefined || param === ''){return inputs;
		}
		angular.forEach(inputs, function(item) {
			var jenis = item.jenis.split(' ');
			if(param === jenis[1]){
				terfilter.push(item);
			}
		});
		return terfilter;
	};
});
app.controller('DonaturCtrl', function($scope, DonaturSvc, $location, $filter, $anchorScroll, FakultasSvc, ProdiSvc){

	// mengambil data donatur
	$scope.get_donaturs = function(){
		$scope.is_loading = true;
		var req = DonaturSvc.all();
		req.success(function(res){
			$scope.donaturs = res;
			$scope.is_loading = false;
		});
	}
	$scope.get_fakultass = function(){
		var req = FakultasSvc.all();
		req.success(function(res){
			$scope.fakultass = res;
		});
	}
	$scope.get_prodis = function(){
		var req = ProdiSvc.all();
		req.success(function(res){
			$scope.prodis = res;
		});
	}
	$scope.set_tprodi = function(val){
		$scope.t_prodi = val;
		$scope.nama = val;
	}
	$scope.get_fakultass();
	$scope.get_prodis();

	// variabel
	$scope.selected_donatur = [];
	$scope.is_add = false;
	$scope.is_edit = false;
	$scope.is_loading = true;
	$scope.is_saving = false;
	$scope.pageSize = 10;
	$scope.page_now = 1;
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
	$scope.selectedColour = {};

	
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
		$scope.c_fakultas = "";
		$scope.c_prodi = "";
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
		$scope.q_prodi = "";
	}
	$scope.fresh_level2 = function(){
		if($scope.jenis_lv_2 == "Satu ITB"){
			$scope.nama = "ITB";
			$scope.angkatan = "";
			$scope.temp_donatur.nama_wakil = "";
			$scope.q_prodi = "";
		}else{
			$scope.nama = "";
			$scope.angkatan = "";
			$scope.temp_donatur.nama_wakil = "";
			$scope.q_prodi = "";
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
	$scope.del_donatur = function(){
		$scope.is_saving = true;

		if($scope.temp_donatur.punya_donasi){
			if(confirm("!!! Donatur ini mempunyai beberapa data donasi. Jika donatur ini dihapus maka data donasi miliknya juga terhapus. Anda yakin ingin menghapus donatur ini?") == true){
				var req = DonaturSvc.delete($scope.temp_donatur.id);
				req.success(function(res){
					$scope.is_saving = false;
					alert("Donatur "+res.status);
					$scope.get_donaturs();
					$scope.fresh_donatur();
					$scope.is_edit = false;
				});
			}else{

			}
		}else{
			if(confirm("Anda yakin ingin menghapus donatur ini?") == true){
				var req = DonaturSvc.delete($scope.temp_donatur.id);
				req.success(function(res){
					$scope.is_saving = false;
					alert("Donatur "+res.status);
					$scope.get_donaturs();
					$scope.fresh_donatur();
					$scope.is_edit = false;
				});
			}else{

			}
		}
		$scope.is_saving = false;
	}
	$scope.del_donaturs = function(){
		$scope.is_saving = true;

		if(confirm("!!! Beberapa donatur mempunyai data donasi. Jika donatur ini dihapus maka data donasi miliknya juga terhapus. Anda yakin ingin menghapus donatur-donatur ini?") == true){

			for(var i=0; i<$scope.selected_donatur.length; i++){
				var donasi = $scope.selected_donatur[i];
				DonaturSvc.delete(donasi.id);
			}

			// alert("Donatur terhapus");
			$scope.selected_donatur = [];
			$scope.get_donaturs();
		}else{

		}
		$scope.is_saving = false;
	}
});


/* KELOLA DONASI */
// fungsi filter channel donasi
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
// fungsi filter jenis donasi
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
// controller
app.controller('DonasiCtrl', function($scope, DonasiSvc, DonaturSvc, $location, $filter, $anchorScroll, FakultasSvc, ProdiSvc){

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
	$scope.get_fakultass = function(){
		var req = FakultasSvc.all();
		req.success(function(res){
			$scope.fakultass = res;
		});
	}
	$scope.get_prodis = function(){
		var req = ProdiSvc.all();
		req.success(function(res){
			$scope.prodis = res;
		});
	}
	$scope.set_tprodi = function(val){
		$scope.t_prodi = val;
		$scope.nama = val;
	}
	$scope.get_fakultass();
	$scope.get_prodis();

	// inisiasi variabel
	$scope.selected_donasi = [];
	$scope.is_edit = false;
	$scope.is_loading = true;
	$scope.is_saving = false;
	$scope.pageSize = 10;
	$scope.page_now = 1;
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
	$scope.donatur_terpilih = "";

	// fungsi-fungsi
	$scope.pilih_donatur = function(don){
		$scope.temp_donasi.id_donatur = don.id;
		$scope.donatur_terpilih = don.nama;
	}
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
		$scope.q_prodi = "";
	}
	$scope.fresh_level1 = function(){
		$scope.jenis_lv_2 = "";
		$scope.nama = "";
		$scope.angkatan = "";
		$scope.temp_donatur.nama_wakil = "";
		$scope.q_prodi = "";
	}
	$scope.fresh_level2 = function(){
		if($scope.jenis_lv_2 == "Satu ITB"){
			$scope.nama = "ITB";
			$scope.angkatan = "";
			$scope.temp_donatur.nama_wakil = "";
			$scope.q_prodi = "";
		}else{
			$scope.nama = "";
			$scope.angkatan = "";
			$scope.temp_donatur.nama_wakil = "";
			$scope.q_prodi = "";
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


/* KELOLA AKUN */
app.filter('akun_role', function(){
	return function(inputs, jenis){
		var terfilter = [];
		if(jenis === undefined || jenis === ''){return inputs;
		}
		angular.forEach(inputs, function(item) {
			if(jenis === item.role){
				terfilter.push(item);
			}
		});
		return terfilter;
	};
});
app.controller('AkunCtrl', function($scope, AkunSvc, DonaturSvc, $location, $filter, $anchorScroll){

	// ambil semua data akun
	$scope.get_akuns = function(){
		$scope.is_loading = true;
		var req = AkunSvc.all();
		req.success(function(res){
			$scope.akuns = res;
			$scope.is_loading = false;
		});
	}
	$scope.get_donaturs = function(){
		var req = DonaturSvc.all();
		req.success(function(res){
			$scope.donaturs = res;
		});
	}

	// variabel-variabel
	$scope.selected_akuns = [];
	$scope.chosen_donatur = "";
	$scope.is_add = false;
	$scope.is_adddonatur = false;
	$scope.is_edit = false;
	$scope.is_editpwd = false;
	$scope.is_loading = true;
	$scope.is_saving = false;
	$scope.pageSize = 10;
	$scope.repassword = "";
	$scope.temp_akun = {
		"nama":"",
		"jabatan":"",
		"telp":"",
		"alamat":"",
		"email":"",
		"password":"",
		"role":""
	};
	$scope.get_akuns();
	$scope.get_donaturs();

	// fungs-fungsi
	$scope.get_akun = function(id_akun){
		$anchorScroll('edit-form');
		$scope.is_edit = true;
		$scope.temp_akun = $filter('filter')($scope.akuns, {id:id_akun})[0];
	}
	$scope.get_donatur = function(){
		var id_donatur = $scope.chosen_donatur;


		if(id_donatur != ""){
			var tdonatur = $filter('filter')($scope.donaturs, {id:id_donatur})[0];
			

			if(tdonatur.email != null){
				var is_ada = $filter('filter')($scope.akuns, {email:tdonatur.email})[0];

				if(is_ada){
					alert("!!! Donatur ini sudah mempunyai akun.");
					$scope.temp_akun.email = "";
					$scope.temp_akun.role = "";
					$scope.temp_akun.nama = "";
				}else{
					$scope.temp_akun.email = tdonatur.email;
					$scope.temp_akun.role = "Donatur";
					$scope.temp_akun.nama = tdonatur.id;
				}
			}else{
				alert("!!! Alamat e-mail donatur yang terpilih belum diisi sehingga tidak bisa dibuatkan akun. Harap diisi lebih dahulu di halaman Kelola Donatur.");
				$scope.temp_akun.email = "";
				$scope.temp_akun.role = "";
				$scope.temp_akun.nama = "";
			}
		}else{
			$scope.temp_akun.email = "";
			$scope.temp_akun.role = "";
			$scope.temp_akun.nama = "";
		}
	}
	$scope.val_akun = function(){
		var akun = $scope.temp_akun;
		var is_ada = $filter('filter')($scope.akuns, {email:$scope.temp_akun.email})[0];

		if(!$scope.is_adddonatur){
			if($scope.is_empty(akun.nama)){
				return "!!! Nama belum diisi";
			}else if($scope.is_empty(akun.telp)){
				return "!!! Nomor telepon belum diisi";
			}else if($scope.is_empty(akun.alamat)){
				return "!!! Alamat belum diisi";
			}else if($scope.is_empty(akun.email)){
				return "!!! Alamat E-mail belum diisi";
			}else if($scope.is_empty(akun.role)){
				return "!!! Peran belum diisi";
			}else if($scope.is_empty(akun.password) && ($scope.is_edit == false)){
				return "!!! Password belum diisi";
			}else if(($scope.repassword != akun.password) && !$scope.is_empty(akun.password)){
				return "!!! Password berbeda";
			}else if(is_ada && $scope.is_add){
				return "!!! Alamat e-mail sudah ada.";
			}else{
				return "";
			}
		}else{
			if($scope.is_empty(akun.email)){
				return "!!! Alamat E-mail belum diisi";
			}else if($scope.is_empty(akun.role)){
				return "!!! Peran belum diisi";
			}else if($scope.is_empty(akun.password) && ($scope.is_edit == false)){
				return "!!! Password belum diisi";
			}else if(($scope.repassword != akun.password) && !$scope.is_empty(akun.password)){
				return "!!! Password berbeda";
			}else if(is_ada && $scope.is_add){
				return "!!! Alamat e-mail sudah ada.";
			}else{
				return "";
			}
		}
	}
	$scope.fresh_akun = function(){
		$scope.temp_akun = {
			"nama":"",
			"jabatan":"",
			"telp":"",
			"alamat":"",
			"email":"",
			"password":"",
			"role":""
		};
		$scope.repassword = "";
	}
	$scope.add_akun = function(){
		$scope.is_saving = true;

		var validasi = $scope.val_akun();

		if($scope.is_empty(validasi)){
			var req = AkunSvc.create($scope.temp_akun);
			req.success(function(res){
				alert("Akun "+res.status);
				$scope.get_akuns();
				$scope.fresh_akun();
				$scope.is_add = false;
				$scope.is_saving = false;
			});
		}else{
			alert(validasi);
			$scope.is_saving = false;
		}
	}
	$scope.edit_akun = function(){
		$scope.is_saving = true;

		var validasi = $scope.val_akun();

		if($scope.is_empty(validasi)){
			var req = AkunSvc.update($scope.temp_akun.id, $scope.temp_akun);
			req.success(function(res){
				alert("Akun "+res.status);
				$scope.get_akuns();
				$scope.fresh_akun();
				$scope.is_edit = false;
				$scope.is_saving = false;
			});
		}else{
			alert(validasi);
			$scope.is_saving = false;
		}
	}
	$scope.del_akun = function(){
		$scope.is_saving = true;

		if(confirm("Anda yakin ingin menghapus akun ini?")){
			if($scope.temp_akun.id == $scope.user_aktif.id){
				alert("!!! User ini sedang aktif.");
				$scope.is_saving = false;
			}else{
				var req = AkunSvc.delete($scope.temp_akun.id);
				req.success(function(res){
					alert("Akun "+res.status);
					$scope.get_akuns();
					$scope.fresh_akun();
					$scope.is_edit = false;
					$scope.is_saving = false;
				});
			}
		}else{
			$scope.is_saving = false;
		}
	}
});

/* DASHBOARD CONTROLLER */
app.filter('tahun', function(){
	return function(inputs, tahun){
		var terfilter = [];
		if(tahun === undefined || tahun === ''){return inputs;
		}
		angular.forEach(inputs, function(item) {
			var tgl = item.tanggal+"";
			var tgls = tgl.split("-");

			if(isNaN(tahun)){
				var thns = tahun.split(" ");
				var new_thn = parseInt(thns[1]);
				var item_thn = parseInt(tgls[0]);

				if(thns[0] === "<"){
					if(item_thn <= new_thn){
						terfilter.push(item);
					}
				}else{
					if(item_thn >= new_thn){
						terfilter.push(item);
					}
				}
			}else{
				if((tahun+"") === (tgls[0]+"")){
					terfilter.push(item);
				}
			}
		});
		return terfilter;
	};
});
app.filter('tahun_etb', function(){
	return function(inputs, tahun){
		var terfilter = [];
		if(tahun === undefined || tahun === ''){return inputs;
		}
		angular.forEach(inputs, function(item) {
			var tgl = item.tanggal+"";
			var tgls = tgl.split("-");

			if(isNaN(tahun)){
				var thns = tahun.split(" ");
				var new_thn = parseInt(thns[1]);
				var item_thn = parseInt(tgls[0]);

				if(thns[0] === "<"){
					if(item_thn <= new_thn){
						if(item.jenis == "Dana Lestari Tidak Bersyarat"){
							terfilter.push(item);	
						}
					}
				}else{
					if(item_thn >= new_thn){
						if(item.jenis == "Dana Lestari Tidak Bersyarat"){
							terfilter.push(item);	
						}
					}
				}
			}else{
				if((tahun+"") === (tgls[0]+"")){
					if(item.jenis == "Dana Lestari Tidak Bersyarat"){
						terfilter.push(item);	
					}
				}
			}
		});
		return terfilter;
	};
});
app.filter('tahun_eb', function(){
	return function(inputs, tahun){
		var terfilter = [];
		if(tahun === undefined || tahun === ''){return inputs;
		}
		angular.forEach(inputs, function(item) {
			var tgl = item.tanggal+"";
			var tgls = tgl.split("-");

			if(isNaN(tahun)){
				var thns = tahun.split(" ");
				var new_thn = parseInt(thns[1]);
				var item_thn = parseInt(tgls[0]);

				if(thns[0] === "<"){
					if(item_thn <= new_thn){
						if(item.jenis == "Dana Lestari Bersyarat"){
							terfilter.push(item);	
						}
					}
				}else{
					if(item_thn >= new_thn){
						if(item.jenis == "Dana Lestari Bersyarat"){
							terfilter.push(item);	
						}
					}
				}
			}else{
				if((tahun+"") === (tgls[0]+"")){
					if(item.jenis == "Dana Lestari Bersyarat"){
						terfilter.push(item);	
					}
				}
			}
		});
		return terfilter;
	};
});
app.filter('tahun_db', function(){
	return function(inputs, tahun){
		var terfilter = [];
		if(tahun === undefined || tahun === ''){return inputs;
		}
		angular.forEach(inputs, function(item) {
			var tgl = item.tanggal+"";
			var tgls = tgl.split("-");

			if(isNaN(tahun)){
				var thns = tahun.split(" ");
				var new_thn = parseInt(thns[1]);
				var item_thn = parseInt(tgls[0]);

				if(thns[0] === "<"){
					if(item_thn <= new_thn){
						if(item.jenis == "Donasi Bersyarat"){
							terfilter.push(item);	
						}
					}
				}else{
					if(item_thn >= new_thn){
						if(item.jenis == "Donasi Bersyarat"){
							terfilter.push(item);	
						}
					}
				}
			}else{
				if((tahun+"") === (tgls[0]+"")){
					if(item.jenis == "Donasi Bersyarat"){
						terfilter.push(item);	
					}
				}
			}
		});
		return terfilter;
	};
});
app.controller('DashboardCtrl', function($scope, DonasiSvc, DonaturSvc, $location, $filter, lodash, FakultasSvc, ProdiSvc){

	// fungsi-fungsi awal
	$scope.get_fakultass = function(){
		var req = FakultasSvc.all();
		req.success(function(res){
			$scope.fakultass = res;
			$scope.update_categorie_fp("fakultas");
		});
	}
	$scope.get_prodis = function(){
		var req = ProdiSvc.all();
		req.success(function(res){
			$scope.prodis = res;
		});
	}



	$scope.is_loading = false;
	$scope.pageSize = 5;
	$scope.page_now = 1;
	$scope.filtered_donasi = {};

	$scope.fil_owner = function(){
		$scope.filtered_donasi = $filter('filter')($scope.donasis, {id_donatur:$scope.user_aktif.id_pengguna});
	}
	$scope.get_tahuns = function(){
		$scope.tahuns = [];
		var newlist = $filter('orderBy')($scope.donasis, 'tanggal', false);
	}
	$scope.get_donasis = function(){
		$scope.is_loading = true;
		var req = DonasiSvc.all();
		req.success(function(res){
			$scope.donasis = res;
			$scope.fil_owner();
			$scope.is_loading = false;
			$scope.set_tahun("ei", $scope.max_ei);
			$scope.set_tahun("etbi", $scope.max_etbi);
			$scope.set_tahun("ebi", $scope.max_ebi);
			$scope.set_tahun("dbi", $scope.max_dbi);
			$scope.set_tahun("jdon", $scope.max_jdon);
			$scope.get_fakultass();
			$scope.get_prodis();
		});
	}
	$scope.update_categorie = function(keyword, xs){
		if(keyword == "ei"){
			$scope.chart_ei.xAxis.categories = xs;
		}else if(keyword == "etbi"){
			$scope.chart_etbi.xAxis.categories = xs;
		}else if(keyword == "ebi"){
			$scope.chart_ebi.xAxis.categories = xs;
		}else if(keyword == "dbi"){
			$scope.chart_dbi.xAxis.categories = xs;
		}else if(keyword == "jdon"){
			$scope.chart_jdon.xAxis.categories = xs;
		}else if(keyword == "fak"){
			$scope.chart_fak.xAxis.categories = xs;
		}else if(keyword == "pro"){
			$scope.chart_pro.xAxis.categories = xs;
		}
	}
	$scope.filter_tahun_fak = function(list, tahun, fak){
		var terfilter = [];
		if(tahun === undefined || tahun === ''){
			return list;
		}
		if(fak === undefined || fak === ''){
			return list;
		}
		angular.forEach(list, function(item){
			var tgl = item.tanggal+"";
			var tgls = tgl.split("-");

			if(isNaN(tahun)){
				var thns = tahun.split(" ");
				var new_thn = parseInt(thns[1]);
				var item_thn = parseInt(tgls[0]);

				if(thns[0] === "<"){
					if(item_thn <= new_thn){
						if(item.fakultas == fak){
							terfilter.push(item);
						}
					}
				}else{
					if(item_thn >= new_thn){
						if(item.fakultas == fak){
							terfilter.push(item);
						}
					}
				}
			}else{
				if((tahun+"") === (tgls[0]+"")){
					if(item.fakultas == fak){
						terfilter.push(item);
					}
				}
			}
		});
		return terfilter;
	}
	$scope.filter_tahun_pro = function(list, tahun, pro){
		var terfilter = [];
		if(tahun === undefined || tahun === ''){
			return list;
		}
		if(pro === undefined || pro === ''){
			return list;
		}
		angular.forEach(list, function(item){
			var tgl = item.tanggal+"";
			var tgls = tgl.split("-");

			if(isNaN(tahun)){
				var thns = tahun.split(" ");
				var new_thn = parseInt(thns[1]);
				var item_thn = parseInt(tgls[0]);

				if(thns[0] === "<"){
					if(item_thn <= new_thn){
						if(item.prodi == pro){
							terfilter.push(item);
						}
					}
				}else{
					if(item_thn >= new_thn){
						if(item.prodi == pro){
							terfilter.push(item);
						}
					}
				}
			}else{
				if((tahun+"") === (tgls[0]+"")){
					if(item.prodi == pro){
						terfilter.push(item);
					}
				}
			}
		});
		return terfilter;
	}
	$scope.filter_graph_fak = function(listfak){
		var datas = [];
		
		angular.forEach(listfak, function(i){
			var total = 0;
			var faculty = $filter('filter')($scope.fakultass, {singkatan:i})[0];

			var tot_donasi = $scope.filter_tahun_fak($scope.donasis, $scope.tahun_fak, faculty.id);

			angular.forEach(tot_donasi, function(item){
				total += parseInt(item.nominal);
			});

			datas.push(total);
		});
		$scope.chart_fak.series[0].data = datas;
	}
	$scope.filter_graph_pro = function(listpro){
		var datas = [];
		
		angular.forEach(listpro, function(i){
			var total = 0;
			var prody = $filter('filter')($scope.prodis, {kepanjangan:i})[0];

			var tot_donasi = $scope.filter_tahun_pro($scope.donasis, $scope.tahun_pro, prody.id);

			angular.forEach(tot_donasi, function(item){
				total += parseInt(item.nominal);
			});

			datas.push(total);
		});
		$scope.chart_pro.series[0].data = datas;
	}
	$scope.update_categorie_fp = function(keyword){
		var vals = [];
		var valus = [];
		if(keyword == "fakultas"){
			angular.forEach($scope.fakultass, function(i){
				vals.push(i.singkatan);
				valus.push(0);
			});
			$scope.chart_fak.xAxis.categories = vals;
			$scope.chart_fak.series[0].data = valus;
			$scope.filter_graph_fak(vals);
		}else{
			var prodi_per_f = $filter('fakultas_prodi')($scope.prodis, keyword);

			angular.forEach(prodi_per_f, function(i){
				vals.push(i.kepanjangan);
				valus.push(0);
			});

			$scope.chart_pro.xAxis.categories = vals;
			$scope.chart_pro.series[0].data = valus;
			$scope.filter_graph_pro(vals);
		}
	}
	$scope.update_value = function(keyword, vals){
		if(keyword == "ei"){
			$scope.chart_ei.series[0].data = vals;
		}else if(keyword == "etbi"){
			$scope.chart_etbi.series[0].data = vals;
		}else if(keyword == "ebi"){
			$scope.chart_ebi.series[0].data = vals;
		}else if(keyword == "dbi"){
			$scope.chart_dbi.series[0].data = vals;
		}else if(keyword == "jdon"){
			$scope.chart_jdon.series[0].data = vals;
		}else if(keyword == "fak"){
			$scope.chart_fak.series[0].data = vals;
		}else if(keyword == "pro"){
			$scope.chart_pro.series[0].data = vals;
		}
	}
	$scope.filter_graph = function(keyword, val){
		if(keyword == "ei"){
			return $filter('tahun')($scope.donasis, val);
		}else if(keyword == "etbi"){
			return $filter('tahun_etb')($scope.donasis, val);
		}else if(keyword == "ebi"){
			return $filter('tahun_eb')($scope.donasis, val);
		}else if(keyword == "dbi"){
			return $filter('tahun_db')($scope.donasis, val);
		}else if(keyword == "jdon"){
			return $filter('tahun')($scope.donasis, val);
		}else if(keyword == "fak"){
			return {};
		}else if(keyword == "pro"){
			return {};
		}
	}
	$scope.get_data_donasi = function(keyword, tahuns){
		var datas = [];
		
		angular.forEach(tahuns, function(val, key){
			var total = 0;
			// var tot_donasi = $filter('tahun')($scope.donasis, val);
			var tot_donasi = $scope.filter_graph(keyword, val);

			if(keyword != "jdon"){
				angular.forEach(tot_donasi, function(item){
					if(item.status == "disahkan"){
						total += parseInt(item.nominal);
					}
				});
			}else{
				var jdonatur = lodash.groupBy(tot_donasi, 'id_donatur');
				total = lodash.size(jdonatur);
			}

			datas.push(total);
		});

		$scope.update_value(keyword, datas);
	}
	$scope.cek_lodash = function(){
		var hsl = lodash.groupBy($scope.donasis, 'jenis');
		console.log(hsl);
		console.log(lodash.size(hsl));
	}
	$scope.set_tahun = function(keyword, max_tahun){
		var tahuns = [];
		var intval = $scope.interval;

		if(keyword == "ei"){
			intval = intval*2;
		}

		// tahuns.push("< "+(max_tahun-5));

		for(var i=intval-1; i>=0; i--){
			tahuns.push(max_tahun-i);
		}

		// max_tahun++;
		// tahuns.push("> "+max_tahun);

		$scope.update_categorie(keyword, tahuns);

		$scope.get_data_donasi(keyword, tahuns);
	}
	
	

	// variabel-variabel
	$scope.eitahun_e = [0, 0, 0, 0, 0, 0, 0];
	$scope.eitahun_i = [20000000, 2000000, 220000000, 0, 0, 0, 0];
	$scope.tahun_eitahun = [];
	$scope.interval = 5;

	// pembuatan grafik
	$scope.chart_ei = {
		options: {
            chart: {
                type: 'column'
            },
            plotOptions: {
				column: {
					colorByPoint: true,
					colors: ['#27ae60'],
				}
			},
        },
        series: [
        	{
        		name: 'Endowment Fund',
        		data: $scope.eitahun_e
        	}
        ],
        title: {
            text: ''
        },
        xAxis: {
			categories: $scope.tahun_eitahun
		},	
		yAxis: {
			title: {
				text: 'Jumlah'
			}
		},
		loading: false
	}
	$scope.chart_etbi = {
		options: {
            chart: {
                type: 'column'
            },
            plotOptions: {
				column: {
					colorByPoint: true,
					colors: ['#f39c12'],
				}
			},
        },
        series: [
        	{
        		name: 'Endowment Fund Tak Bersyarat',
        		data: $scope.eitahun_e
        	}
        ],
        title: {
            text: ''
        },
        xAxis: {
			categories: $scope.tahun_eitahun
		},	
		yAxis: {
			title: {
				text: 'Jumlah'
			}
		},
		loading: false
	}
	$scope.chart_ebi = {
		options: {
            chart: {
                type: 'column'
            },
            plotOptions: {
				column: {
					colorByPoint: true,
					colors: ['#d35400'],
				}
			},
        },
        series: [
        	{
        		name: 'Endowment Fund Bersyarat',
        		data: $scope.eitahun_e
        	}
        ],
        title: {
            text: ''
        },
        xAxis: {
			categories: $scope.tahun_eitahun
		},	
		yAxis: {
			title: {
				text: 'Jumlah'
			}
		},
		loading: false
	}
	$scope.chart_dbi = {
		options: {
            chart: {
                type: 'column'
            },
            plotOptions: {
				column: {
					colorByPoint: true,
					colors: ['#2980b9'],
				}
			},
        },
        series: [
        	{
        		name: 'Donasi Bersyarat',
        		data: $scope.eitahun_e
        	}
        ],
        title: {
            text: ''
        },
        xAxis: {
			categories: $scope.tahun_eitahun
		},	
		yAxis: {
			title: {
				text: 'Jumlah'
			}
		},
		loading: false
	}
	$scope.chart_jdon = {
		options: {
            chart: {
                type: 'column'
            },
            plotOptions: {
				column: {
					colorByPoint: true,
					colors: ['#2c3e50'],
				}
			},
        },
        series: [
        	{
        		name: 'Donatur',
        		data: $scope.eitahun_e
        	}
        ],
        title: {
            text: ''
        },
        xAxis: {
			categories: $scope.tahun_eitahun
		},	
		yAxis: {
			title: {
				text: 'Jumlah'
			}
		},
		loading: false
	}
	$scope.chart_fak = {
		options: {
            chart: {
                type: 'column' 
            },
            plotOptions: {
				column: {
					colorByPoint: true,
					colors: ['#e74c3c'],
				}
			},
        },
        series: [
        	{
        		name: 'Fakultas',
        		data: $scope.eitahun_e
        	}
        ],
        title: {
            text: ''
        },
        xAxis: {
			categories: $scope.tahun_eitahun
		},	
		yAxis: {
			title: {
				text: 'Jumlah'
			}
		},
		loading: false
	}
	$scope.chart_pro = {
		options: {
            chart: {
                type: 'column'
            },
            plotOptions: {
				column: {
					colorByPoint: true,
					colors: ['#c0392b'],
				}
			},
        },
        series: [
        	{
        		name: 'Program Studi',
        		data: $scope.eitahun_e
        	}
        ],
        title: {
            text: ''
        },
        xAxis: {
			categories: $scope.tahun_eitahun
		},	
		yAxis: {
			title: {
				text: 'Jumlah'
			}
		},
		loading: false
	}

	// ending
	$scope.get_donasis();

});



