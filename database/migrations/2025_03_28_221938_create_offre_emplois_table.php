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
        Schema::create('offre_emplois', function (Blueprint $table) {
            $table->id();
            $table->foreignId('entreprise_id')->constrained('entreprises')->onDelete('cascade');
            $table->foreignId('canton_id')->nullable()->constrained('cantons')->nullOnDelete();
            $table->foreignId('categorie_id')->constrained('categories')->onDelete('cascade');
            $table->string('titre');
            $table->enum('type_travail', ['Full-Time', 'Part-Time', 'Remote', 'Internship', 'Contrat']);
            $table->text('description');
            $table->integer('nombre_limit')->nullable();
            $table->date('date_fin');
            $table->dateTime('date_publication')->default(now());
            $table->string('salaire')->nullable();
            $table->string('location')->nullable();
            $table->boolean('status')->default(true)->comment('live ou closed');
            $table->boolean('paye')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offre_emplois');
    }
};
