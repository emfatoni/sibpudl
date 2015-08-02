<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Donatur;
use App\Donasi;

use Illuminate\Http\Request;

class DonaturController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$donaturs = Donatur::all();
		foreach($donaturs as $donatur){
			$punya_donasi = Donasi::where('id_donatur', '=', $donatur->id)->count();
			if($punya_donasi > 0){
				$donatur["punya_donasi"] = true;
			}else{
				$donatur["punya_donasi"] = false;
			}
		}
		return $donaturs;
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create(Request $req)
	{
		$new = new Donatur();

		$new->nama = $req->input('nama');
		$new->jenis = $req->input('jenis');
		$new->nama_wakil = $req->input('nama_wakil');
		$new->telp = $req->input('telp');
		$new->email = $req->input('email');
		$new->alamat_surat = $req->input('alamat_surat');

		if($new->save()){
			return array('status'=>'Saved!');
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
		return Donatur::find($id);
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
		$edit = Donatur::find($id);
		if($edit){
			$edit->nama = $req->input('nama');
			$edit->jenis = $req->input('jenis');
			$edit->nama_wakil = $req->input('nama_wakil');
			$edit->telp = $req->input('telp');
			$edit->email = $req->input('email');
			$edit->alamat_surat = $req->input('alamat_surat');

			if($edit->save()){
				return array('status'=>'Saved!');
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
		$donasis = Donasi::where('id_donatur', '=', $id)->get();
		
		if(count($donasis) > 0){
			foreach ($donasis as $donasi){
				$req = $donasi->delete();
			}
		}

		$del = Donatur::find($id);
		if($del){
			if($del->delete()){
				return array('status'=>'Deleted!');
			}
			return array('status'=>'Not Deleted!');
		}
		return array('status'=>'Not Found!');
	}

}
