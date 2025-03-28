<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CandidatExperience extends Model
{
    use HasFactory;

    protected $fillable = [
        'candidat_id',
        'titre',
        'nom_entreprise',
        'type_travail',
        'date_debut',
        'date_fin',
        'lieu',
        'description',
    ];

    protected $casts = [
        'date_debut' => 'date',
        'date_fin' => 'date',
    ];

    public function candidat()
    {
        return $this->belongsTo(Candidat::class);
    }
}