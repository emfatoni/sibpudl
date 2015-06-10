<!DOCTYPE html>

<html>
<head>
	<title>BPUDL</title>

	<link rel="stylesheet" type="text/css" href="aset/css/my-style.css">
	<link rel="stylesheet" type="text/css" href="aset/bootstrap/css/bootstrap.min.css">

	<script src="aset/js/jquery-2.1.3.min.js"></script>
	<script src="aset/bootstrap/js/bootstrap.min.js"></script>
	<script src="aset/js/angular.js"></script>

	<style type="text/css">
		html{
			background: url(aset/img/villa-merah-dark.jpg) no-repeat center center fixed;
			-webkit-background-size: cover;
			-moz-background-size: cover;
			-o-background-size: cover;
			background-size: cover;
		}
	</style>
</head>

<body class="transparent-color">
	<div class="container">
		<div class="row" style="margin-top: 80px; padding: 10px;">
			<div class="col-md-12 white-text text-center" style="margin-bottom: 25px">
				<h1>BPUDL</h1>
				<h3>Badan Pengelola Usaha dan Dana Lestari</h3>
				<br>
				<p>Menjadi suatu pusat pengembangan bisnis ITB<br>melalui komersialisasi kompetensi yang berbasiskan pada IPTEKS</p>
			</div>
		</div>
		<div class="row" style="padding: 10px;">
			<div class="col-md-4 col-md-offset-4 white-border">
				<div class="row" style="padding: 15px;">
				<form method="POST" action="{{ url('auth/login') }}">
					<input type="hidden" name="_token" value="{{ csrf_token() }}">
					<div class="form-group">
						<label class="white-text">Username</label>
						<input class="form-control" type="text" name="email" value="{{ old('email') }}">
					</div>
					<div class="form-group">
						<label class="white-text">Password</label>
						<input class="form-control" type="password" name="password">
					</div>
					<div class="form-group">
						<button type="submit" class="btn btn-primary pull-right">Login</button>
					</div>
				</form>
				</div>
			</div>
		</div>
		<div class="col-md-12" style="padding: 20px 5px; margin-top: 145px; border-top: solid 1px white">
			<p class="text-center white-text">Copyright &copy Almighty Gunawan</p>
		</div>
	</div>
</body>
</html>