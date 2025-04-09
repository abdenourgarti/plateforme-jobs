<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class DomaineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Liste des domaines d'activité professionnels
        $domaines = [
            ['designation' => 'Technologies de l\'Information (IT)', 'is_active' => true],
            ['designation' => 'Finance et Banque', 'is_active' => true],
            ['designation' => 'Santé et Médical', 'is_active' => true],
            ['designation' => 'Éducation et Formation', 'is_active' => true],
            ['designation' => 'Industrie et Production', 'is_active' => true],
            ['designation' => 'Commerce et Distribution', 'is_active' => true],
            ['designation' => 'Hôtellerie et Restauration', 'is_active' => true],
            ['designation' => 'Bâtiment et Construction', 'is_active' => true],
            ['designation' => 'Transport et Logistique', 'is_active' => true],
            ['designation' => 'Communication et Médias', 'is_active' => true],
            ['designation' => 'Marketing et Publicité', 'is_active' => true],
            ['designation' => 'Services Juridiques', 'is_active' => true],
            ['designation' => 'Ressources Humaines', 'is_active' => true],
            ['designation' => 'Consulting et Conseil', 'is_active' => true],
            ['designation' => 'Agroalimentaire', 'is_active' => true],
            ['designation' => 'Énergie et Environnement', 'is_active' => true],
            ['designation' => 'Pharmaceutique et Biotechnologie', 'is_active' => true],
            ['designation' => 'Immobilier', 'is_active' => true],
            ['designation' => 'Télécommunications', 'is_active' => true],
            ['designation' => 'Aéronautique et Aérospatiale', 'is_active' => true],
            ['designation' => 'Automobile', 'is_active' => true],
            ['designation' => 'Services Publics et Administration', 'is_active' => true],
            ['designation' => 'Art, Culture et Divertissement', 'is_active' => true],
            ['designation' => 'Associations et ONG', 'is_active' => true],
            ['designation' => 'Luxe et Mode', 'is_active' => true],
            ['designation' => 'Sport et Loisirs', 'is_active' => true],
            ['designation' => 'E-commerce', 'is_active' => true],
            ['designation' => 'Assurance', 'is_active' => true],
            ['designation' => 'Agriculture', 'is_active' => true],
            ['designation' => 'Architecture et Design', 'is_active' => true],
        ];
        
        // Insérer les données
        DB::table('domaines')->insert($domaines);
    }
}
