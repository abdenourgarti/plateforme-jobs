<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'email',
        'password',
        'type',
        'is_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'is_active' => 'boolean',
    ];

    /**
     * Get the human-readable type name.
     *
     * @return string
     */
    public function getTypeNameAttribute(): string
    {
        return match($this->type) {
            'candidat' => 'Candidat',
            'entreprise' => 'Entreprise',
            default => 'Inconnu',
        };
    }

    /**
     * Check if user is a candidate
     *
     * @return bool
     */
    public function isCandidat(): bool
    {
        return $this->type === 'candidat';
    }

    /**
     * Check if user is a company
     *
     * @return bool
     */
    public function isEntreprise(): bool
    {
        return $this->type === 'entreprise';
    }

    /**
     * Relationship with Candidat model
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function candidat()
    {
        return $this->hasOne(Candidat::class);
    }

    /**
     * Relationship with Entreprise model
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function entreprise()
    {
        return $this->hasOne(Entreprise::class);
    }

    /**
     * Relationship with DemandeInscription model
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function demandesInscription()
    {
        return $this->hasMany(DemandeInscription::class);
    }
}