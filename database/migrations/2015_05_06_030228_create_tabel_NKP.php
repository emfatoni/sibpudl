<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTabelNKP extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('NKP', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('id_uuk')->unsigned();
			$table->foreign('id_uuk')->references('id')->on('UUK');
			$table->integer('tahun');
			$table->integer('target_awal');
			$table->integer('target_revisi');
			$table->integer('realisasi_bulan_1');
			$table->integer('realisasi_bulan_2');
			$table->integer('realisasi_bulan_3');
			$table->integer('realisasi_bulan_4');
			$table->integer('realisasi_bulan_5');
			$table->integer('realisasi_bulan_6');
			$table->integer('realisasi_bulan_7');
			$table->integer('realisasi_bulan_8');
			$table->integer('realisasi_bulan_9');
			$table->integer('realisasi_bulan_10');
			$table->integer('realisasi_bulan_11');
			$table->integer('realisasi_bulan_12');
			$table->integer('tercapai');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('NKP');
	}

}
