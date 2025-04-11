<?php

namespace Database\Seeders;

use App\Models\Categorie;
use App\Models\Entreprise;
use App\Models\OffreEmploi;
use App\Models\OffreEmploiCompetence;
use App\Models\OffreEmploiBenefit;
use App\Models\OffreEmploiResponsabilite;
use App\Models\OffreEmploiExigence;
use App\Models\OffreEmploiPreference;
use App\Models\EntrepriseTechnologie;
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
            // Ajouter des technologies à l'entreprise
            for ($j = 0; $j < 3; $j++) {
                EntrepriseTechnologie::create([
                    'entreprise_id' => $entreprise->id,
                    'designation' => "Technologie " . fake()->word,
                ]);
            }

            for ($i = 1; $i <= 4; $i++) {
                $offre = OffreEmploi::create([
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
                    'canton_id' => rand(1, 20),
                ]);

                // Compétences
                for ($k = 0; $k < 3; $k++) {
                    OffreEmploiCompetence::create([
                        'offre_emplois_id' => $offre->id,
                        'designation' => "Compétence " . fake()->word,
                    ]);
                }

                // Bénéfices
                for ($k = 0; $k < 2; $k++) {
                    OffreEmploiBenefit::create([
                        'offre_emplois_id' => $offre->id,
                        'titre' => "Avantage " . fake()->word,
                        'description' => fake()->sentence,
                        'icon' => "icon-".fake()->word,
                    ]);
                }

                // Responsabilités
                for ($k = 0; $k < 3; $k++) {
                    OffreEmploiResponsabilite::create([
                        'offre_emploi_id' => $offre->id,
                        'designation' => "Responsabilité " . fake()->sentence(3),
                    ]);
                }

                // Exigences
                for ($k = 0; $k < 3; $k++) {
                    OffreEmploiExigence::create([
                        'offre_emploi_id' => $offre->id,
                        'designation' => "Exigence " . fake()->sentence(3),
                    ]);
                }

                // Préférences
                for ($k = 0; $k < 2; $k++) {
                    OffreEmploiPreference::create([
                        'offre_emploi_id' => $offre->id,
                        'designation' => "Préférence " . fake()->sentence(3),
                    ]);
                }
            }
        }
    }
}
