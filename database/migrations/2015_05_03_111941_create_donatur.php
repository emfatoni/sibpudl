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
			$table->string('jenis');
			$table->string('nama_wakil')->nullable();
			
			$table->string('telp')->nullable();
			$table->string('email')->nullable();
			$table->string('alamat_surat')->nullable();
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
