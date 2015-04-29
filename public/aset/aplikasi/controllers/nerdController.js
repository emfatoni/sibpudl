var post = angular.module('NerdCtrl',[]);

post.controller('NerdController',function($scope, CRUD){
	var getNerds = CRUD.all();
	getNerds.success(function(response){
		$scope.posts = response;
	});

	$scope.submit=function(){
		var request = CRUD.create($scope.new);
        request.success(function(response){
            $scope.flash = response.status;
        });
	}
});

post.controller('EditNerdController',function($scope, $routeParams, CRUD){
	var getPost = CRUD.get($routeParams.id);
        getPost.success(function(response){
            $scope.nerd = response;
        });
 
        $scope.submit = function(){
            var request = CRUD.update($routeParams.id,$scope.nerd);
            request.success(function(response){
                $scope.flash = response.status;
            });
        }
});