<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'LoginController@index');

Route::get('siendo', 'BpudlController@index');

Route::get('simon', function () {
    return view('index_simon');
});

Route::get('home', 'HomeController@index');

Route::resource('donatur', 'DonaturController');
Route::resource('donasi', 'DonasiController');

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);