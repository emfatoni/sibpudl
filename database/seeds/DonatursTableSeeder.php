<?php
 
use Illuminate\Database\Seeder;
 
class DonatursTableSeeder extends Seeder {
 
    public function run()
    {
        // Uncomment the below to wipe the table clean before populating
        DB::table('donaturs')->delete();
 
        $donaturs = array(
            ['id' => 1, 'nama' => 'Susan Susana', 'jenis' => 'Personal', 'nama_wakil' => '', 'telp' => '087722045732', 'email' => 'susan@gmail.com', 'alamat_surat' => 'Dago Pakar, Bandung', 'created_at' => new DateTime, 'updated_at' => new DateTime]
        );
 
        // Uncomment the below to run the seeder
        DB::table('donaturs')->insert($donaturs);
    }
 
}