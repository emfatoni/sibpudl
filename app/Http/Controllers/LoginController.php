<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Auth;
use App\Karyawan;

use Illuminate\Http\Request;

class LoginController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		return view('login_page');
	}

	public function auth(){
		if (Auth::attempt(['email' => $email, 'password' => $password]))
        {
            return redirect()->intended('siendo');
        }
	}

	public function get_user(){
		if (Auth::user())
        {
            // Auth::user() returns an instance of the authenticated user...
            $pengguna = Auth::user();
            $id_karyawan = $pengguna->id_pengguna;
            $karyawan = Karyawan::find($id_karyawan);
            $pengguna["nama"] = $karyawan->nama;
            return array("user" => $pengguna);
        }
        return array("status" => "no user");
	}
}
