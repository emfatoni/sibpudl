<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Karyawan;
use App\User;

use Illuminate\Http\Request;

class KaryawanController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$karyawans = Karyawan::all();
		return $karyawans;
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

		if($new->save()){
			//return array('status'=>'saved '.$new->id);

			$new_user = new User();
			$new_user->role = $role;
			$new_user->email = $email;
			$new_user->password = bcrypt($password);
			$new_user->id_pengguna = $new->id;

			if($new_user->save()){
				return array('status'=>'Saved!');
			}
			$new->delete();
			return array('status'=>'Fail to make!');
		}
		return array('status'=>'Not Saved!');
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

			if($edit->save()){
				return array('status'=>'Saved!');
			}
			return array('status'=>'Not Saved!');
		}
		return array('status'=>'Not Saved!');
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
		return array('status'=>'Not Deleted!');
	}

	public function add_user(){
		return array('status'=>'Not Deleted!');
	}

}
