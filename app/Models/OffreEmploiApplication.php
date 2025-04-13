<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OffreEmploiApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'offre_emploi_id',
        'candidat_id',
        'nom_complet',
        'email',
        'telephone',
        'dernier_poste',
        'linkedin',
        'portfolio',
        'informations_supplementaires',
        'cv',
    ];

    public function offreEmploi()
    {
        return $this->belongsTo(OffreEmploi::class);
    }

    public function candidat()
    {
        return $this->belongsTo(Candidat::class);
    }

    
}