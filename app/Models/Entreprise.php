<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entreprise extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'domaine_id',
        'nom',
        'site',
        'date_creation',
        'nombre_employes',
        'locations',
        'logo',
        'description',
        'twitter',
        'facebook',
        'linkedin',
        'email',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function domaine()
    {
        return $this->belongsTo(Domaine::class);
    }

    public function technologies()
    {
        return $this->hasMany(EntrepriseTechnologie::class);
    }

    public function offresEmplois()
    {
        return $this->hasMany(OffreEmploi::class);
    }

    public function paiements()
    {
        return $this->hasMany(OffreEmploiPaiement::class);
    }
}