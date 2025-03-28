<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OffreEmploiResponsabilite extends Model
{
    use HasFactory;

    protected $fillable = [
        'offre_emploi_id',
        'designation',
    ];

    public function offreEmploi()
    {
        return $this->belongsTo(OffreEmploi::class);
    }
}