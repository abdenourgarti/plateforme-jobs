<?php

namespace Database\Seeders;

use App\Models\Categorie;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorieSeeder extends Seeder
{
    public function run()
    {
        // Vider la table avant d'ajouter les données
        // DB::table('categories')->truncate();
        
        // Ajouter les catégories
        $categories = [
            [
                'designation' => 'Design',
                'icone' => 'PenTool',
                'is_active' => true,
            ],
            [
                'designation' => 'Sales',
                'icone' => 'BarChart',
                'is_active' => true,
            ],
            [
                'designation' => 'Marketing',
                'icone' => 'Megaphone',
                'is_active' => true,
            ],
            [
                'designation' => 'Finance',
                'icone' => 'DollarSign',
                'is_active' => true,
            ],
            [
                'designation' => 'Technology',
                'icone' => 'Monitor',
                'is_active' => true,
            ],
            [
                'designation' => 'Engineering',
                'icone' => 'Wrench',
                'is_active' => true,
            ],
            [
                'designation' => 'Business',
                'icone' => 'Briefcase',
                'is_active' => true,
            ],
            [
                'designation' => 'Human Resource',
                'icone' => 'Users',
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            Categorie::create($category);
        }
    }
}
