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
        Schema::create('candidat_experiences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('candidat_id')->constrained('candidats')->onDelete('cascade');
            $table->string('titre');
            $table->string('nom_entreprise');
            $table->enum('type_travail', ['Full-Time', 'Part-Time', 'Remote', 'Internship', 'Contrat']);
            $table->date('date_debut');
            $table->date('date_fin')->nullable();
            $table->string('lieu')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('candidat_experience');
    }
};
