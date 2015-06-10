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

Route::get('home', 'HomeController@index');
Route::get('get_user', 'LoginController@get_user');
Route::get('karyawan/get_user', 'KaryawanController@get_user');

Route::resource('donatur', 'DonaturController');
Route::resource('donasi', 'DonasiController');
Route::resource('karyawan', 'KaryawanController');

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController'
]);