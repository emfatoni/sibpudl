var ctrls = angular.module('FakultasController',[]);

ctrls.filter('fakultas_prodi', function(){
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
ctrls.controller('FakultasCtrl', function($scope, FakultasSvc, ProdiSvc, $filter, $location, $anchorScroll){

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
		if(confirm("Anda yakin ingin menghapus data Fakultas ini beserta data Prodi di bawahnya?")){
			var req = FakultasSvc.delete($scope.temp_fakultas.id);
			req.success(function(res){
				$scope.get_fakultass();
				$scope.get_prodis();
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