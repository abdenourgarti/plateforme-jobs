<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OffreEmploiPaiement extends Model
{
    use HasFactory;

    protected $fillable = [
        'entreprise_id',
        'offre_emploi_id',
        'date',
        'montant',
        'paye',
    ];

    protected $casts = [
        'date' => 'datetime',
        'paye' => 'boolean',
    ];

    public function entreprise()
    {
        return $this->belongsTo(Entreprise::class);
    }

    public function offreEmploi()
    {
        return $this->belongsTo(OffreEmploi::class);
    }
}