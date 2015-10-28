@extends('app_siendo')

@section('content')
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
			<div class="col-md-5 col-md-offset-1" style="color: white">
				<h3>Bagaimana Mendapatkan Akun Donatur?</h3>
				<p>
					Untuk mendapatkan Akun Donatur, Anda bisa mengirimkan e-mail ke <strong>aw@skd.itb.ac.id</strong> dengan subject <strong>Request Akun</strong>
				</p>
				<p>
					Isi badan e-mail dengan:
				</p>
				<ul>
					<li>Alamat e-mail untuk login</li>
					<li>Nama (jika Anda mewakili sebuah instansi maka isi dengan nama instansi tersebut)</li>
					<li>Nama perwakilan (jika Anda mewakili sebuah instansi maka isi dengan nama Anda. Jika tidak maka kosongkan saja)</li>
					<li>Nomor telepon Anda/instansi</li>
					<li>Alamat (alamat jelas untuk mendapatkan surat laporan donasi Anda)</li>
				</ul>
				<p>Setelah Anda mengirimkan request pembuatan akun donatur, Anda akan mendapatakn balasan berupa e-mail dan password untuk login. Untuk selanjutnya Anda bisa mengubah password Anda.</p>
			</div>
			<div class="col-md-5 white-border" style="margin-top: 50px">
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
						<button type="submit" class="btn btn-primary pull-right form-control">Login</button>
					</div>
					<br>
					<div class="form-group" style="color: white; margin-top: 25px">
						@if (count($errors) > 0)
								<strong>Whoops!</strong><br><br>
								<ul>
									@foreach ($errors->all() as $error)
										@if ($error == "The email field is required.")
											<li>Alamat e-mail harus diisi.</li>
										@elseif ($error == "The password field is required.")
											<li>Password harus diisi.</li>
										@elseif ($error == "These credentials do not match our records.")
											<li>Ada kesalahan alamat e-mail dan/atau password yang Anda masukkan.</li>
										@else
											<li>{{$error}}</li>
										@endif
									@endforeach
								</ul>
						@endif
					</div>
				</form>
				</div>
			</div>
		</div>
		<div class="col-md-12" style="padding: 20px 5px; margin-top: 145px; border-top: solid 1px white">
			<p class="text-center white-text">Copyright &copy Tim BPUDL</p>
		</div>
	</div>
@endsection