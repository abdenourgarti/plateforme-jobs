<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidat extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nom_complet',
        'email',
        'adresse',
        'fonction',
        'image',
        'telephone',
        'sexe',
        'instagram',
        'facebook',
        'linkedin',
        'twitter',
        'youtube',
        'portfolio',
        'about_me',
        'date_nessaince',
        'langues',
        'diplôme',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function competences()
    {
        return $this->hasMany(CandidatCompetence::class);
    }

    public function experiences()
    {
        return $this->hasMany(CandidatExperience::class);
    }

    public function educations()
    {
        return $this->hasMany(CandidatEducation::class);
    }

    public function candidatures()
    {
        return $this->hasMany(OffreEmploiApplication::class);
    }
}