<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDonatur extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('donatur', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('nama');
			$table->string('departemen')->nullable();
			$table->integer('angkatan')->nullable();
			$table->enum('gender', ['Laki-laki', 'Perempuan']);
			$table->string('telp');
			$table->string('email');
			$table->string('alamat_rumah')->nullable();
			$table->string('alamat_surat')->nullable();
			$table->string('instansi')->nullable();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('donatur');
	}

}
