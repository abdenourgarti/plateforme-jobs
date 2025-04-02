<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    use HasFactory;

    protected $fillable = [
        'designation',
        'icone',
        'is_active',
    ];

    public function offresEmplois()
    {
        return $this->hasMany(OffreEmploi::class);
    }
}