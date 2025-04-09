<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OffreEmploi extends Model
{
    use HasFactory;

    protected $fillable = [
        'entreprise_id',
        'categorie_id',
        'canton_id', // Ajout du canton_id
        'titre',
        'type_travail',
        'description',
        'nombre_limit',
        'date_fin',
        'date_publication',
        'salaire',
        'location',
        'status',
        'paye',
    ];

    protected $casts = [
        'date_fin' => 'date',
        'date_publication' => 'datetime',
        'status' => 'boolean',
        'paye' => 'boolean',
    ];

    public function entreprise()
    {
        return $this->belongsTo(Entreprise::class);
    }

    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }

    // Relation avec le canton
    public function canton()
    {
        return $this->belongsTo(Canton::class);
    }

    public function competences()
    {
        return $this->hasMany(OffreEmploiCompetence::class);
    }

    public function benefits()
    {
        return $this->hasMany(OffreEmploiBenefit::class);
    }

    public function responsabilites()
    {
        return $this->hasMany(OffreEmploiResponsabilite::class);
    }

    public function exigences()
    {
        return $this->hasMany(OffreEmploiExigence::class);
    }

    public function preferences()
    {
        return $this->hasMany(OffreEmploiPreference::class);
    }

    public function paiements()
    {
        return $this->hasMany(OffreEmploiPaiement::class);
    }

    public function candidatures()
    {
        return $this->hasMany(OffreEmploiApplication::class);
    }
}