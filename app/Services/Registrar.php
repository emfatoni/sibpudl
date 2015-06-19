<?php namespace App\Services;

use App\User;
use Validator;
use Illuminate\Contracts\Auth\Registrar as RegistrarContract;

class Registrar implements RegistrarContract {

	/**
	 * Get a validator for an incoming registration request.
	 *
	 * @param  array  $data
	 * @return \Illuminate\Contracts\Validation\Validator
	 */
	protected $loginPath = '/';

	public function validator(array $data)
	{
		return Validator::make($data, [
			'role' => 'required',
			'id_pengguna' => 'required',
			'email' => 'required|email|max:255|unique:users',
			'password' => 'required|confirmed|min:6',
		]);
	}

	/**
	 * Create a new user instance after a valid registration.
	 *
	 * @param  array  $data
	 * @return User
	 */
	public function create(array $data)
	{
		return User::create([
			'role' => $data['role'],
			'email' => $data['email'],
			'id_pengguna' => $data['id_pengguna'],
			'password' => bcrypt($data['password']),
		]);
	}

}
