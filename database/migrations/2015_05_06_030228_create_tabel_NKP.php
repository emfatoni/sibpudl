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
			$table->integer('id_uuk');
			$table->foreign('id_uuk')->references('id')->on('UUK');
			$table->date('integer');
			$table->target_awal('integer');
			$table->target_revisi('integer');
			$table->realisasi_bulan_1('integer');
			$table->realisasi_bulan_2('integer');
			$table->realisasi_bulan_3('integer');
			$table->realisasi_bulan_4('integer');
			$table->realisasi_bulan_5('integer');
			$table->realisasi_bulan_6('integer');
			$table->realisasi_bulan_7('integer');
			$table->realisasi_bulan_8('integer');
			$table->realisasi_bulan_9('integer');
			$table->realisasi_bulan_10('integer');
			$table->realisasi_bulan_11('integer');
			$table->realisasi_bulan_12('integer');
			$table->tercapai('integer');
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
