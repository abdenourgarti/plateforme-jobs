<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DemandeInscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'statut',
        'date_demande',
        'date_accepte',
        'date_refuse',
        'commentaire',
    ];

    protected $casts = [
        'date_demande' => 'datetime',
        'date_accepte' => 'datetime',
        'date_refuse' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}