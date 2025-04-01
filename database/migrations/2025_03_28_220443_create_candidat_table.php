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
        Schema::create('candidats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('nom_complet', 100);
            $table->string('email', 50);
            $table->string('adresse', 255)->nullable();
            $table->string('fonction', 255)->nullable();
            $table->string('image', 255)->nullable();
            $table->string('telephone')->nullable();
            $table->enum('sexe', ['M', 'F'])->nullable();
            $table->string('instagram')->nullable();
            $table->string('facebook')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('twitter')->nullable();
            $table->string('youtube')->nullable();
            $table->string('portfolio')->nullable();
            $table->text('about_me')->nullable();
            $table->date('date_nessaince')->nullable();
            $table->text('langues')->nullable();
            $table->text('diplôme')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('candidats');
    }
};
