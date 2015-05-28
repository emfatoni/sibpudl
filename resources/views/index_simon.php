<!DOCTYPE html>

<html>
<head>
	<title>BPUDL</title>

	<link rel="stylesheet" type="text/css" href="aset/css/my-style.css">
	<link rel="stylesheet" type="text/css" href="aset/bootstrap/css/bootstrap.min.css">

	<script src="aset/js/jquery-2.1.3.min.js"></script>
	<script src="aset/bootstrap/js/bootstrap.min.js"></script>
	<script src="aset/js/angular.js"></script>
	<script src="aset/js/angular-route.js"></script>

	<script src="aset/app_simon.js"></script>

</head>

<body ng-app="simonApp">
	<!-- navbar -->
	<nav class="navbar navbar-inverse" ng-controller="NavController">
		<div class="container-fluid">
	    <!-- Brand and toggle get grouped for better mobile display -->
		    <div class="navbar-header">
		      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
		        <span class="sr-only">Toggle navigation</span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		      </button>
		      <a class="navbar-brand" href="#" ng-click="halaman='beranda'">SI Monitoring</a>
		    </div>

		    <!-- Collect the nav links, forms, and other content for toggling -->
		    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			    <ul class="nav navbar-nav">
			    	<li class="{{(halaman=='beranda')?'active':''}}"><a href="#" ng-click="halaman='beranda'">Beranda</a></li>
			        <li class="{{(halaman=='UUK')?'active':''}}"><a href="#/UUK" ng-click="halaman='UUK'">UUK</a></li>
			        <li class="{{(halaman=='lappro')?'active':''}}"><a href="#/lappro" ng-click="halaman='lappro'">Laporan Proyek</a></li>
			    </ul>

			    <ul class="nav navbar-nav navbar-right">
			        <li class="dropdown">
			        	<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><span style="margin-right: 10px" class="glyphicon glyphicon-user"></span> Nama Pengguna <span class="caret"></span></a>
				        <ul class="dropdown-menu" role="menu">
							<li><a href="#">Logout</a></li>
				            <li><a href="#">Pengaturan Akun</a></li>
						</ul>
			        </li>
			    </ul>
		    </div><!-- /.navbar-collapse -->
	  	</div><!-- /.container-fluid -->
	</nav>
	<div class="container" ng-view>
	</div>
</body>
</html>