<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Donasi;
use App\Donatur;

use Illuminate\Http\Request;

class DonasiController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$donasis = Donasi::all();
		foreach($donasis as $donasi){
			$donatur = Donatur::find($donasi->id_donatur);
			$donasi["nama_donatur"] = $donatur->nama;
		}
		return $donasis;
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create(Request $req)
	{
		$new = new Donasi();

		$new->tanggal = $req->input('tanggal');
		$new->nominal = $req->input('nominal');
		$new->termin = $req->input('termin');
		$new->channel = $req->input('channel');
		$new->jenis = $req->input('jenis');
		$new->syarat = $req->input('syarat');
		$new->kota = $req->input('kota');
		$new->status = $req->input('status');
		$new->id_donatur = $req->input('id_donatur');

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
		return Donasi::find($id);
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
		$edit = Donasi::find($id);
		if($edit){
			$edit->tanggal = $req->input('tanggal');
			$edit->nominal = $req->input('nominal');
			$edit->termin = $req->input('termin');
			$edit->channel = $req->input('channel');
			$edit->jenis = $req->input('jenis');
			$edit->syarat = $req->input('syarat');
			$edit->kota = $req->input('kota');
			$edit->status = $req->input('status');
			$edit->id_donatur = $req->input('id_donatur');

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
		$del = Donasi::find($id);
		if($del){
			if($del->delete()){
				return array('status'=>'Deleted!');
			}
			return array('status'=>'Not Deleted!');
		}
		return array('status'=>'Not Found!');
	}

	public function import_excel(Request $req){
		$file = $req->file('excel');

		\Excel::load($file, function($reader) {
			$hasil = $reader->toArray();
			//dd($hasil);
			echo $hasil[0][2]["satu"];
		});
	}

}