<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('offre_emploi_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('offre_emploi_id')->constrained('offre_emplois')->onDelete('cascade');
            $table->foreignId('candidat_id')->constrained('candidat')->onDelete('cascade');
            $table->string('nom_complet');
            $table->string('email');
            $table->string('telephone')->nullable();
            $table->string('dernier_poste')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('portfolio')->nullable();
            $table->text('informations_supplementaires')->nullable();
            $table->string('cv')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offre_emploi_applications');
    }
};
