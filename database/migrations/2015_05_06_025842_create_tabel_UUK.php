<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTabelUUK extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('UUK', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('waktu_didirikan');
			$table->string('kepemilikan_ITB');
			$table->string('penjabat');
			$table->string('alamat');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('UUK');
	}

}
