<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CandidatCompetence extends Model
{
    use HasFactory;

    protected $fillable = [
        'candidat_id',
        'designation',
    ];

    public function candidat()
    {
        return $this->belongsTo(Candidat::class);
    }
}