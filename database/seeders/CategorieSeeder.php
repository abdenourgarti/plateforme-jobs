<?php

namespace Database\Seeders;

use App\Models\Categorie;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = ['Développement Web', 'Ressources Humaines', 'Comptabilité', 'Marketing', 'Support Technique'];

        foreach ($categories as $designation) {
            Categorie::create(['designation' => $designation]);
        }
    }
}
