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

/* HALAMAN */
Route::get('/', 'MainController@index');
Route::get('login', 'MainController@login');

/* RESOURCE */
Route::get('akun/get_user', 'AkunController@get_user');
Route::post('donasi/import_excel', 'DonasiController@import_excel');
Route::get('donasi/download_template', 'DonasiController@download_template');

Route::resource('donatur', 'DonaturController');
Route::resource('donasi', 'DonasiController');
Route::resource('akun', 'AkunController');
Route::resource('fakultas', 'FakultasController');
Route::resource('prodi', 'ProdiController');

/* DARI LARAVEL 5 */
Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController'
]);