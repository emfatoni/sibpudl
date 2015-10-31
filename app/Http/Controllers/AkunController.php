<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User;
use App\Donatur;
use App\Karyawan;
use Auth;

use Illuminate\Http\Request;

class AkunController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$users = User::all();
		foreach($users as $user){
			$id = $user->id_pengguna;
			if($user->role != "Donatur"){
				$karyawan = Karyawan::find($id);
				$user["nama"] = $karyawan->nama;
				$user["jabatan"] = $karyawan->jabatan;
				$user["telp"] = $karyawan->telp;
				$user["alamat"] = $karyawan->alamat;
			}else{
				$donatur = Donatur::find($id);
				$user["nama"] = $donatur->nama;
				$user["jabatan"] = "";
				$user["telp"] = $donatur->telp;
				$user["alamat"] = $donatur->alamat_surat;
			}
		}
		return $users;
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create(Request $req)
	{
		$new = new Karyawan();

		$new->nama = $req->input('nama');
		$new->alamat = $req->input('alamat');
		$new->telp = $req->input('telp');
		$new->jabatan = $req->input('jabatan');

		$email = $req->input('email');
		$password = $req->input('password');
		$role = $req->input('role');

		if($role != "Donatur"){
			if($new->save()){

				$new_user = new User();
				$new_user->role = $role;
				$new_user->email = $email;
				$new_user->password = bcrypt($password);
				$new_user->id_pengguna = $new->id;

				if($new_user->save()){
					return array('status'=>'Saved!');
				}

				$new->delete();
				return array('status'=>'Failed to make!');
			}
			return array('status'=>'Not Saved!');
		}else{
			$new_user = new User();
			$new_user->role = $role;
			$new_user->email = $email;
			$new_user->password = bcrypt($password);
			$new_user->id_pengguna = $new->nama;

			if($new_user->save()){
				return array('status'=>'Saved!');
			}
			return array('status'=>'Failed to make!');
		}
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		return User::find($id);
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id, Request $req)
	{
		$edit = User::find($id);

		if($edit){
			if($edit->role != "Donatur"){

				$karyawan = Karyawan::find($edit->id_pengguna);

				if($karyawan){
					$karyawan->nama = $req->input('nama');
					$karyawan->alamat = $req->input('alamat');
					$karyawan->telp = $req->input('telp');
					$karyawan->jabatan = $req->input('jabatan');

					if($karyawan->save()){
						$edit->email = $req->input('email');
						$edit->role = $req->input('role');
						$password = $req->input('password');
						if($password != ""){
							$edit->password = bcrypt($password);
						}
						if($edit->save()){
							return array('status'=>'Saved!');
						}
						return array('status'=>'Email, Password, or Role Not Saved!');
					}
					return array('status'=>'Not Saved!');
				}
				return array('status'=>'Failed!');
			}else{
				$password = $req->input('password');
				$edit->email = $req->input('email');

				if($password != ""){
					$edit->password = bcrypt($password);
				}
				if($edit->save()){
					return array('status'=>'Saved!');
				}
				return array('status'=>'Failed!');
			}
		}
		return array('status'=>'Not Found!');
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$del = User::find($id);
		if($del){
			if($del->role != "Donatur"){
				$karyawan = Karyawan::find($del->id_pengguna);
				if($karyawan){
					if($karyawan->delete()){
						if($del->delete()){
							return array('status'=>'Deleted!');
						}
						return array('status'=>'Failed!');
					}
				}else{
					if($del->delete()){
						return array('status'=>'Deleted!');
					}
					return array('status'=>'Failed!');
				}
			}else{
				if($del->delete()){
					return array('status'=>'Deleted!');
				}
			}
			return array('status'=>'Not Deleted!');
		}
		return array('status'=>'Not Found!');
	}

	public function get_user()
	{
		if (Auth::user()){
            
            $pengguna = Auth::user();

            if($pengguna->role != "Donatur"){
            	$id_karyawan = $pengguna->id_pengguna;
            	$karyawan = Karyawan::find($id_karyawan);
            	$pengguna["nama"] = $karyawan->nama;
            	$pengguna["jabatan"] = $karyawan->jabatan;
				$pengguna["telp"] = $karyawan->telp;
				$pengguna["alamat"] = $karyawan->alamat;
            }else{
            	$id_donatur = $pengguna->id_pengguna;
            	$donatur = Donatur::find($id_donatur);
            	$pengguna["nama"] = $donatur->nama;
            	$pengguna["jabatan"] = "";
				$pengguna["telp"] = $donatur->telp;
				$pengguna["alamat"] = $donatur->alamat_surat;
				$pengguna["jenis"] = $donatur->jenis;
            }
            return $pengguna;
        }
        return null;
	}

}
