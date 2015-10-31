var ctrls = angular.module('DonasiController',[]);

// fungsi filter channel donasi
ctrls.filter('channel', function(){
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
ctrls.filter('jenis', function(){
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
ctrls.controller('DonasiCtrl', function($scope, DonasiSvc, DonaturSvc, $location, $filter, $anchorScroll, FakultasSvc, ProdiSvc){

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
	$scope.set_tprodi = function(val, id){
		$scope.t_prodi = val;
		$scope.t_idprodi = id;
		$scope.nama_prodi = val;
		if($scope.jenis_lv_2 == "Program Studi"){
			$scope.nama = val;	
		}
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
	$scope.nama_prodi = "";
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
		"nama_wakil": "",
		"id_prodi": "",
		"angkatan": ""
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
			"nama_wakil": "",
			"id_prodi": "",
			"angkatan": ""
		};
		$scope.angkatan = "";
		$scope.nama = "";
		$scope.jenis_lv_1 = "";
		$scope.jenis_lv_2 = "";
		$scope.q_prodi = "";
		$scope.nama_prodi = "";
	}
	$scope.fresh_level1 = function(){
		$scope.jenis_lv_2 = "";
		$scope.nama = "";
		$scope.angkatan = "";
		$scope.temp_donatur.nama_wakil = "";
		$scope.q_prodi = "";
		$scope.nama_prodi = "";
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
		$scope.nama_prodi = "";
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
			$scope.temp_donatur.id_prodi = $scope.t_idprodi;
			$scope.temp_donatur.angkatan = $scope.angkatan;
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