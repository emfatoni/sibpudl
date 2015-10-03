<?php
 
use Illuminate\Database\Seeder;
 
class KaryawansTableSeeder extends Seeder {
 
    public function run()
    {
        // Uncomment the below to wipe the table clean before populating
        DB::table('karyawans')->delete();
 
        $karyawans = array(
            ['id' => 1, 'nama' => 'Seorang Fundrising', 'alamat' => 'Geger Kalong, Bandung', 'telp' => '087722045766', 'jabatan' => 'Staf Tim Fundrising', 'created_at' => new DateTime, 'updated_at' => new DateTime],
            ['id' => 2, 'nama' => 'Seorang Admin', 'alamat' => 'Buah Batu, Bandung', 'telp' => '087722045712', 'jabatan' => 'Staf Admin', 'created_at' => new DateTime, 'updated_at' => new DateTime]
        );
 
        // Uncomment the below to run the seeder
        DB::table('karyawans')->insert($karyawans);
    }
 
}