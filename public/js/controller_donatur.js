var ctrls = angular.module('DonaturController',[]);

ctrls.filter('jenis_donatur', function(){
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
ctrls.filter('alumni_donatur', function(){
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
ctrls.filter('organisasi_donatur', function(){
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
ctrls.controller('DonaturCtrl', function($scope, DonaturSvc, $location, $filter, $anchorScroll, FakultasSvc, ProdiSvc){

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
	$scope.set_tprodi = function(val, idp){
		$scope.t_prodi = val;
		$scope.t_idprodi = idp;
		alert(idp);
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
			"alamat_surat": "",
			"id_prodi": "",
			"angkatan": ""
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
			"alamat_surat": "",
			"id_prodi": "",
			"angkatan": ""
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
				$scope.t_idprodi = $scope.temp_donatur.id_prodi;
			}else{
				$scope.nama = "ITB";
			}

			$scope.angkatan = $scope.temp_donatur.angkatan;
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
			$scope.temp_donatur.id_prodi = $scope.t_idprodi;
			$scope.temp_donatur.angkatan = $scope.angkatan;
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
			$scope.temp_donatur.id_prodi = $scope.t_idprodi;
			$scope.temp_donatur.angkatan = $scope.angkatan;
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