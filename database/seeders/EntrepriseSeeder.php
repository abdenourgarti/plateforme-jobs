<?php

namespace Database\Seeders;

use App\Models\Domaine;
use App\Models\Entreprise;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EntrepriseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (User::count() < 5) {
            User::factory(5)->create();
        }

        $users = User::all();

        $domaines = Domaine::all();

        // Assurez-vous qu'il y a au moins 5 utilisateurs pour lier aux entreprises

        for ($i = 1; $i <= 5; $i++) {
            Entreprise::create([
                'user_id' => $users->random()->id,
                'domaine_id' => $domaines->random()->id ?? null,
                'nom' => "Entreprise $i",
                'site' => "https://entreprise$i.com",
                'date_creation' => now()->subYears(rand(1, 10)),
                'nombre_employes' => rand(10, 100),
                'locations' => "Ville $i",
                'logo' => null,
                'description' => "Description de l'entreprise $i",
                'twitter' => null,
                'facebook' => null,
                'linkedin' => null,
                'email' => "contact$@entreprise$i.com",
            ]);
        }

    }
}
