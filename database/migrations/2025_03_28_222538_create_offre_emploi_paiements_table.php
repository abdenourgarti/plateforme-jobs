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
        Schema::create('offre_emploi_paiements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('entreprise_id')->constrained('entreprise')->onDelete('cascade');
            $table->foreignId('offre_emploi_id')->constrained('offre_emplois')->onDelete('cascade');
            $table->dateTime('date');
            $table->decimal('montant', 10, 2);
            $table->boolean('paye')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offre_emploi_paiements');
    }
};
