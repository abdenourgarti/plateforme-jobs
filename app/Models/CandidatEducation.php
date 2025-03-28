<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CandidatEducation extends Model
{
    use HasFactory;

    protected $fillable = [
        'candidat_id',
        'titre',
        'nom_etablissement',
        'annee_debut',
        'annee_fin',
        'description',
    ];

    public function candidat()
    {
        return $this->belongsTo(Candidat::class);
    }
}