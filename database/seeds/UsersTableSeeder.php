<?php
 
use Illuminate\Database\Seeder;
 
class UsersTableSeeder extends Seeder {
 
    public function run()
    {
        // Uncomment the below to wipe the table clean before populating
        DB::table('users')->delete();
 
        $users = array(
            ['id' => 1, 'role' => 'Tim Fundrising', 'email' => 'sofund@bpudl.itb.ac.id', 'password' => '$2y$10$9CiPsvMDdgaj./MbczPfQO2yO5jNyejY626DxRKy.y7R/ym/di5P.', 'remember_token' => '', 'id_pengguna' => 1, 'created_at' => new DateTime, 'updated_at' => new DateTime],
            ['id' => 2, 'role' => 'Admin BPUDL', 'email' => 'soadmin@bpudl.itb.ac.id', 'password' => '', 'remember_token' => '$2y$10$XzgPt4vI/x2k22ouKCaGG.VJCtfXxBvuTayirJ.xQtcyFZEkcNHoW', 'id_pengguna' => 2, 'created_at' => new DateTime, 'updated_at' => new DateTime],
            ['id' => 3, 'role' => 'Donatur', 'email' => 'susan@gmail.com', 'password' => '$2y$10$/MbskN6gdMbiKcQEtlLWuuWW9vjL4u4jF4dGvGnOHkmBfMG2k5xk2', 'remember_token' => '', 'id_pengguna' => 1, 'created_at' => new DateTime, 'updated_at' => new DateTime]
        );
        // password user 1: sofund
        // password user 2: soadmin
        // password user 3: susan
 
        // Uncomment the below to run the seeder
        DB::table('users')->insert($users);
    }
 
}