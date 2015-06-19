<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateKaryawansTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('karyawans', function(Blueprint $table)
		{
			$table->increments('id');

			$table->string('nama');
			$table->string('alamat');
			$table->string('telp');
			$table->string('jabatan')->nullable();
			
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
		Schema::drop('karyawans');
	}

}
