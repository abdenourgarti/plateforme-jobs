<?php

namespace Database\Seeders;

use App\Models\Categorie;
use App\Models\Entreprise;
use App\Models\OffreEmploi;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OffreEmploiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $entreprises = Entreprise::all();
        $categories = Categorie::all();
        $types = ['Full-Time', 'Part-Time', 'Remote', 'Internship', 'Contrat'];

        foreach ($entreprises as $entreprise) {
            for ($i = 1; $i <= 4; $i++) { 
                OffreEmploi::create([
                    'entreprise_id' => $entreprise->id,
                    'categorie_id' => $categories->random()->id,
                    'titre' => "Poste $i - {$entreprise->nom}",
                    'type_travail' => $types[array_rand($types)],
                    'description' => "Description pour le poste $i chez {$entreprise->nom}",
                    'nombre_limit' => rand(1, 5),
                    'date_fin' => now()->addWeeks(rand(1, 4)),
                    'date_publication' => now(),
                    'salaire' => rand(30000, 100000) . " DA",
                    'location' => $entreprise->locations,
                    'status' => true,
                    'paye' => (bool)rand(0, 1),
                ]);
            }
        }

    }
}
