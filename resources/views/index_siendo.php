<!DOCTYPE html>

<html>
<head>
	<title>BPUDL</title>

	<link rel="stylesheet" type="text/css" href="css/my-style.css">
	<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="datatables/css/jquery.dataTables.css">

	<script src="js/jquery-2.1.3.min.js"></script>
	<script src="datatables/js/jquery.dataTables.js"></script>
	<script src="bootstrap/js/bootstrap.min.js"></script>
	<script src="js/angular.js"></script>
	<script src="js/angular-route.js"></script>

	<script src="js/siendo.js"></script>
</head>

<body ng-app="siendoApp" ng-controller="MainController">
	<!-- navbar -->
	<nav class="navbar navbar-inverse">
		<div class="container-fluid">
	    <!-- Brand and toggle get grouped for better mobile display -->
		    <div class="navbar-header">
		      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
		        <span class="sr-only">Toggle navigation</span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		      </button>
		      <a class="navbar-brand" href="#" ng-click="halaman='beranda'">SI Endowment Fund</a>
		    </div>

		    <!-- Collect the nav links, forms, and other content for toggling -->
		    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			    <ul class="nav navbar-nav">
			    	<li class="{{(halaman=='beranda')?'active':''}}"><a href="#" ng-click="halaman='beranda'">Beranda</a></li>
			        <li class="{{(halaman=='donasi')?'active':''}}"><a href="#/donasi" ng-click="halaman='donasi'">Donasi</a></li>
			        <li class="{{(halaman=='donatur')?'active':''}}"><a href="#/donatur" ng-click="halaman='donatur'">Donatur</a></li>
			        <li class="{{(halaman=='akun')?'active':''}}"><a href="#/akun" ng-click="halaman='akun'">Akun</a></li>
			    </ul>

			    <ul class="nav navbar-nav navbar-right">
			        <li class="dropdown">
			        	<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><span style="margin-right: 10px" class="glyphicon glyphicon-user"></span> {{user_aktif.user.nama}} <span class="caret"></span></a>
				        <ul class="dropdown-menu" role="menu">
							<li><a href="<?php echo url('/auth/logout'); ?>">Logout</a></li>
				            <li><a href="#">Pengaturan Akun</a></li>
						</ul>
			        </li>
			    </ul>
		    </div><!-- /.navbar-collapse -->
	  	</div><!-- /.container-fluid -->
	</nav>
	<div class="container">
		<div ng-view></div>
		<div class="col-md-12" style="padding: 20px 5px; margin-top: 145px; border-top: solid 1px black">
			<p class="text-center">Copyright &copy Almighty Gunawan</p>
		</div>
	</div>
</body>
</html>