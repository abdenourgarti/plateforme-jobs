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
        Schema::create('entreprises', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('canton_id')->nullable()->constrained('cantons')->nullOnDelete();
            $table->foreignId('domaine_id')->nullable()->constrained('domaines')->onDelete('cascade');
            $table->string('nom');
            $table->string('site')->nullable();
            $table->date('date_creation')->nullable();
            $table->integer('nombre_employes')->nullable();
            $table->text('locations')->nullable();
            $table->string('logo')->nullable();
            $table->text('description')->nullable();
            $table->string('twitter')->nullable();
            $table->string('facebook')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('email')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entreprise');
    }
};
