<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAkunDonatur extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('akun_donatur', function(Blueprint $table)
		{
			$table->string('username');
			$table->primary('username');
			$table->string('password');
			$table->integer('id_donatur')->unsigned();
			$table->foreign('id_donatur')->references('id')->on('donatur');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('akun_donatur');
	}

}
