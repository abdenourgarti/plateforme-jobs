<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OffreEmploiBenefit extends Model
{
    use HasFactory;

    protected $fillable = [
        'offre_emploi_id',
        'titre',
        'description',
        'icon',
    ];

    public function offreEmploi()
    {
        return $this->belongsTo(OffreEmploi::class);
    }
}