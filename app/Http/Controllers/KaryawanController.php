<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Karyawan;
use App\User;
use App\Donatur;
use Auth;

use Illuminate\Http\Request;

class KaryawanController extends Controller {

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
		/*$karyawans = Karyawan::all();
		foreach ($karyawans as $karyawan){
			$req = User::where('id_pengguna', '=', $karyawan->id)->take(1)->get()->toArray();
			$user = $req[0];
			$karyawan["role"] = $user["role"];
			$karyawan["email"] = $user["email"];
		}
		return $karyawans;*/
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
		return Karyawan::find($id);
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
		$edit = Karyawan::find($id);

		if($edit){

			$edit->nama = $req->input('nama');
			$edit->alamat = $req->input('alamat');
			$edit->telp = $req->input('telp');
			$edit->jabatan = $req->input('jabatan');

			$email = $req->input('email');
			$password = $req->input('password');
			$role = $req->input('role');

			if($edit->save()){

				$tempuser = User::where('id_pengguna', '=', $id)->take(1)->get();


				foreach ($tempuser as $row){
					$user = $row;
				}
				// $temp = $user->toArray();
				// $user = $temp[0];

				$user->email = $email;
				$user->role = $role;

				if($password != ""){
					$user->password = bcrypt($password);
				}
				
				if($user->save()){
					return array('status'=>'Saved!');	
				}
				return array('status'=>'Not Saved!');
			}
			return array('status'=>'Not Saved!');
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
		$del = Karyawan::find($id);
		if($del){
			if($del->delete()){
				return array('status'=>'Deleted!');
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
            }else{
            	$id_donatur = $pengguna->id_pengguna;
            	$donatur = Donatur::find($id_donatur);
            	$pengguna["nama"] = $donatur->nama;
            }
            return $pengguna;
        }
        return null;
	}
}
