<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            CategorieSeeder::class,
            DomaineSeeder::class,
            CantonSeeder::class,
            EntrepriseSeeder::class,
            OffreEmploiSeeder::class,
        ]);

        // $admin = User::factory()->create([
        //     'name' => 'admin',
        //     'email' => 'admin@gmail.com',
        // ]);


        // $admin->assignRole('admin');


    }
}
