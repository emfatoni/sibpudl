<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDonasisTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('donasis', function(Blueprint $table)
		{
			$table->increments('id');

			$table->date('tanggal');
			$table->bigInteger('nominal');
			$table->string('termin');
			$table->string('channel');
			$table->string('jenis');
			$table->string('syarat')->nullable();
			$table->string('kota')->nullable();
			$table->enum('status', array('ditunda', 'disahkan'))->default('ditunda');
			
			$table->integer('id_donatur')->unsigned();
			$table->foreign('id_donatur')->references('id')->on('donaturs');

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
		Schema::drop('donasis');
	}

}
