<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDonasi extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('donasi', function(Blueprint $table)
		{
			$table->increments('id');
			$table->timestamp('tanggal')->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->bigInteger('nominal');
			$table->string('termin');
			$table->string('channel');
			$table->string('jenis');
			$table->string('syarat')->nullable();
			$table->string('kota')->nullable();
			
			$table->integer('id_donatur')->unsigned();
			$table->foreign('id_donatur')->references('id')->on('donatur');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('donasi');
	}

}
