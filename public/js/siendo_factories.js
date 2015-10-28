var factories = angular.module('siendoFactories', []);

// Donatur factory
factories.factory("DonaturSvc", function($http){
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

// Donasi factory
factories.factory("DonasiSvc", function($http){
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

// Akun factory
factories.factory("AkunSvc", function($http){
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

// Fakultas factory
factories.factory("FakultasSvc", function($http){
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

// Program studi (prodi) factory
factories.factory("ProdiSvc", function($http){
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