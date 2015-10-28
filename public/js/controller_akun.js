var ctrls = angular.module('AkunController',[]);

// controller untuk pengaturan akun
ctrls.controller('AturAkunCtrl', function($scope, AkunSvc, $filter, $location){

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

// controller untuk pengelolaan data akun oleh admin
ctrls.filter('akun_role', function(){
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
ctrls.controller('AkunCtrl', function($scope, AkunSvc, DonaturSvc, $location, $filter, $anchorScroll){

	// ambil semua data akun
	$scope.get_akunable = function(){
		var terfilter = [];
		var list = $scope.donaturs;

		angular.forEach(list, function(item){
			if((item.email != "")&&(item.email != null)){
				var is_terdaftar = $filter('filter')($scope.akuns, {email:item.email});
				if(is_terdaftar.length == 0){
					terfilter.push(item);
				}
			}
		});

		$scope.akunable = terfilter;
	}
	$scope.get_donaturs = function(){
		var req = DonaturSvc.all();
		req.success(function(res){
			$scope.donaturs = res;
			$scope.get_akunable();
		});
	}
	$scope.get_akuns = function(){
		$scope.is_loading = true;
		var req = AkunSvc.all();
		req.success(function(res){
			$scope.akuns = res;
			$scope.get_donaturs();
			$scope.is_loading = false;
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
	$scope.is_editdonatur = false;
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
	
	$scope.akunable = {};

	// fungs-fungsi
	
	$scope.get_akun = function(id_akun){
		$anchorScroll('edit-form');
		$scope.is_edit = true;
		$scope.temp_akun = $filter('filter')($scope.akuns, {id:id_akun})[0];

		if($scope.temp_akun.role == "Donatur"){
			$scope.is_editdonatur = true;
		}else{
			$scope.is_editdonatur = false;
		}
	}
	$scope.sial = function(){
		if($scope.chosen_donatur != ""){
			var tdonatur = $filter('filter')($scope.donaturs, {id:$scope.chosen_donatur})[0];
			$scope.temp_akun.email = tdonatur.email;
			$scope.temp_akun.role = "Donatur";
			$scope.temp_akun.nama = tdonatur.id;
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
		$scope.chosen_donatur = "";
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
				$scope.is_adddonatur = false;
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
				$scope.is_editdonatur = false;
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
					$scope.is_editdonatur = false;
					$scope.is_saving = false;
				});
			}
		}else{
			$scope.is_saving = false;
		}
	}
});