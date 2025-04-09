<?php

namespace Database\Seeders;

use App\Models\Domaine;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DomaineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $domaines = ['Informatique', 'Santé', 'Éducation', 'Finance', 'Construction'];

        foreach ($domaines as $designation) {
            Domaine::create(['designation' => $designation]);
        }
    }
}
