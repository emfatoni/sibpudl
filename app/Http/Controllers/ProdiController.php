<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Prodi;
use App\Fakultas;

use Illuminate\Http\Request;

class ProdiController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$prodis = Prodi::all();
		foreach($prodis as $prodi){
			$fakultas = Fakultas::find($prodi->id_fakultas);
			$prodi["nama_fakultas"] = $fakultas->singkatan;
		}
		return $prodis;
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create(Request $req)
	{
		$new = new Prodi();
		$new->kode = $req->input('kode');
		$new->singkatan = $req->input('singkatan');
		$new->kepanjangan = $req->input('kepanjangan');
		$new->id_fakultas = $req->input('id_fakultas');
		if($new->save())
		{
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
		return Prodi::find($id);
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
		$edit = Prodi::find($id);
		if($edit)
		{
			$edit->kode = $req->input('kode');
			$edit->singkatan = $req->input('singkatan');
			$edit->kepanjangan = $req->input('kepanjangan');
			$edit->id_fakultas = $req->input('id_fakultas');	
			if($edit->save())
			{
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
		$del = Prodi::find($id);
		if($del)
		{
			if($del->delete())
			{
				return array('status'=>'Deleted!');
			}
			return array('status'=>'Not Deleted!');
		}
		return array('status'=>'Not Found!');
	}

}
