<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class MainController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function __construct(){
		// $this->middleware('auth');
	}

	public function index()
	{
		return view('index_siendo');
	}

	public function login()
	{
		return view('login_page');
	}
}
