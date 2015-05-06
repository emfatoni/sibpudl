<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTabelProyek extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('proyek', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('id_uuk');
			$table->foreign('id_uuk')->references('id')->on('UUK');
			$table->string('pin');
			$table->date('tanggal_catat');
			$table->string('nama_pekerjaan');
			$table->string('nama_pemberi_kerja');
			$table->string('nama_ketua_pelaksana');
			$table->date('kontrak_tanggal');
			$table->string('kontrak_nomor');
			$table->date('kontrak_akhir_periode');
			$table->integer('kontrak_nilai_euro');
			$table->integer('kontrak_nilai_jpy');
			$table->integer('kontrak_nilai_dollar');
			$table->integer('kontrak_nilai_rupiah');
			$table->integer('kontrak_nilai_total');
			$table->integer('keuangan_invoice_total');
			$table->integer('keuangan_sisa_invoice_total');
			$table->integer('keuangan_usulan_penghapusan_proyek');
			$table->integer('keuangan_total_realisasi');
			$table->integer('keuangan_pre_financing');
			$table->string('status_pekerjaan');
			$table->integer('persentase_progres_proyek');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('proyek');
	}

}
