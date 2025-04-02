<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Canton extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'code',
        'nom_officiel',
    ];

    /**
     * Relation avec les candidats
     */
    public function candidats()
    {
        return $this->hasMany(Candidat::class);
    }

    /**
     * Relation avec les entreprises
     */
    public function entreprises()
    {
        return $this->hasMany(Entreprise::class);
    }

    /**
     * Relation avec les offres d'emploi
     */
    public function offresEmplois()
    {
        return $this->hasMany(OffreEmploi::class);
    }
}