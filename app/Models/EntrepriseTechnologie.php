<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EntrepriseTechnologie extends Model
{
    use HasFactory;

    protected $fillable = [
        'entreprise_id',
        'designation',
    ];

    public function entreprise()
    {
        return $this->belongsTo(Entreprise::class);
    }
}