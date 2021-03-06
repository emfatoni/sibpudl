<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProdis extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('prodis', function(Blueprint $table)
		{
			$table->increments('id');

			$table->string('kode')->nullable();
			$table->string('singkatan')->nullable();
			$table->string('kepanjangan');

			$table->integer('id_fakultas')->unsigned();
			$table->foreign('id_fakultas')->references('id')->on('fakultass');

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
		Schema::drop('prodis');
	}

}
