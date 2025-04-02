<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CantonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cantons = [
            ['nom' => 'Zurich', 'code' => 'ZH', 'nom_officiel' => 'Canton de Zurich'],
            ['nom' => 'Berne', 'code' => 'BE', 'nom_officiel' => 'Canton de Berne'],
            ['nom' => 'Lucerne', 'code' => 'LU', 'nom_officiel' => 'Canton de Lucerne'],
            ['nom' => 'Uri', 'code' => 'UR', 'nom_officiel' => 'Canton d\'Uri'],
            ['nom' => 'Schwytz', 'code' => 'SZ', 'nom_officiel' => 'Canton de Schwytz'],
            ['nom' => 'Obwald', 'code' => 'OW', 'nom_officiel' => 'Canton d\'Obwald'],
            ['nom' => 'Nidwald', 'code' => 'NW', 'nom_officiel' => 'Canton de Nidwald'],
            ['nom' => 'Glaris', 'code' => 'GL', 'nom_officiel' => 'Canton de Glaris'],
            ['nom' => 'Zoug', 'code' => 'ZG', 'nom_officiel' => 'Canton de Zoug'],
            ['nom' => 'Fribourg', 'code' => 'FR', 'nom_officiel' => 'Canton de Fribourg'],
            ['nom' => 'Soleure', 'code' => 'SO', 'nom_officiel' => 'Canton de Soleure'],
            ['nom' => 'Bâle-Ville', 'code' => 'BS', 'nom_officiel' => 'Canton de Bâle-Ville'],
            ['nom' => 'Bâle-Campagne', 'code' => 'BL', 'nom_officiel' => 'Canton de Bâle-Campagne'],
            ['nom' => 'Schaffhouse', 'code' => 'SH', 'nom_officiel' => 'Canton de Schaffhouse'],
            ['nom' => 'Appenzell Rhodes-Extérieures', 'code' => 'AR', 'nom_officiel' => 'Canton d\'Appenzell Rhodes-Extérieures'],
            ['nom' => 'Appenzell Rhodes-Intérieures', 'code' => 'AI', 'nom_officiel' => 'Canton d\'Appenzell Rhodes-Intérieures'],
            ['nom' => 'Saint-Gall', 'code' => 'SG', 'nom_officiel' => 'Canton de Saint-Gall'],
            ['nom' => 'Grisons', 'code' => 'GR', 'nom_officiel' => 'Canton des Grisons'],
            ['nom' => 'Argovie', 'code' => 'AG', 'nom_officiel' => 'Canton d\'Argovie'],
            ['nom' => 'Thurgovie', 'code' => 'TG', 'nom_officiel' => 'Canton de Thurgovie'],
            ['nom' => 'Tessin', 'code' => 'TI', 'nom_officiel' => 'Canton du Tessin'],
            ['nom' => 'Vaud', 'code' => 'VD', 'nom_officiel' => 'Canton de Vaud'],
            ['nom' => 'Valais', 'code' => 'VS', 'nom_officiel' => 'Canton du Valais'],
            ['nom' => 'Neuchâtel', 'code' => 'NE', 'nom_officiel' => 'Canton de Neuchâtel'],
            ['nom' => 'Genève', 'code' => 'GE', 'nom_officiel' => 'République et canton de Genève'],
            ['nom' => 'Jura', 'code' => 'JU', 'nom_officiel' => 'République et Canton du Jura'],
        ];

        foreach ($cantons as $canton) {
            DB::table('cantons')->insert([
                'nom' => $canton['nom'],
                'code' => $canton['code'],
                'nom_officiel' => $canton['nom_officiel'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
