var crud = angular.module('CRUDSrvc', []);

crud.factory("CRUD", function($http){
	return{
		all: function(){
			var request = $http({method:'GET', url:'nerds'});
			return request;
		},
		create: function(data){
			var request = $http({method:'GET', url:'nerds/create',params:data});
            return request;
		},
		get: function(id){
			var request = $http.get('nerds/'+id);
            return request;
		},
		update: function(id, data){
			var request = $http.put('nerds/'+id, data);
            return request;
		},
		delete: function(id){

		}
	}
});