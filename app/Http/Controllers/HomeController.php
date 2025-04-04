<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use App\Models\OffreEmploi;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // Récupérer toutes les catégories avec le nombre d'offres d'emploi
        $categories = Categorie::select('categories.*')
            ->addSelect([
                'offres_count' => OffreEmploi::selectRaw('COUNT(*)')
                    ->whereColumn('categorie_id', 'categories.id')
                    ->where('status', 1)
                    ->where('paye', 1)
            ])
            ->withCount(['offreEmplois as offres_count' => function ($query) {
                $query->where('status', 1)->where('paye', 1);
            }])
            ->where('is_active', true)
            ->get();

        // Récupérer l'offre d'emploi la plus récente pour chaque catégorie
        $latestJobsByCategory = Categorie::where('is_active', true)
            ->with(['offreEmplois' => function ($query) {
                $query->where('status', 1)
                    ->where('paye', 1)
                    ->with(['entreprise', 'canton'])
                    ->orderBy('date_publication', 'desc')
                    ->limit(1);
            }])
            ->get()
            ->map(function ($category) {
                return [
                    'category' => $category->only(['id', 'designation', 'icone']),
                    'latestJob' => $category->offreEmplois->first() ? [
                        'id' => $category->offreEmplois->first()->id,
                        'titre' => $category->offreEmplois->first()->titre,
                        'type_travail' => $category->offreEmplois->first()->type_travail,
                        'location' => $category->offreEmplois->first()->location,
                        'salaire' => $category->offreEmplois->first()->salaire,
                        'entreprise' => $category->offreEmplois->first()->entreprise ? $category->offreEmplois->first()->entreprise->only(['id', 'nom']) : null,
                        'canton' => $category->offreEmplois->first()->canton ? $category->offreEmplois->first()->canton->only(['id', 'nom', 'code']) : null,
                        'date_publication' => $category->offreEmplois->first()->date_publication,
                    ] : null
                ];
            })
            ->filter(function ($item) {
                return !is_null($item['latestJob']);
            })
            ->values();

        // Récupérer les 8 dernières offres d'emploi toutes catégories confondues
        $latestJobs = OffreEmploi::where('status', 1)
            ->where('paye', 1)
            ->with(['entreprise:id,nom', 'canton:id,nom,code', 'categorie:id,designation,icone'])
            ->orderBy('date_publication', 'desc')
            ->limit(8)
            ->get()
            ->map(function ($job) {
                return [
                    'id' => $job->id,
                    'titre' => $job->titre,
                    'type_travail' => $job->type_travail,
                    'location' => $job->location,
                    'salaire' => $job->salaire,
                    'entreprise' => $job->entreprise ? $job->entreprise->only(['id', 'nom']) : null,
                    'canton' => $job->canton ? $job->canton->only(['id', 'nom', 'code']) : null,
                    'categorie' => $job->categorie ? $job->categorie->only(['id', 'designation', 'icone']) : null,
                    'date_publication' => $job->date_publication,
                ];
            });

        return Inertia::render('Home', [
            'categories' => $categories,
            'latestJobsByCategory' => $latestJobsByCategory,
            'latestJobs' => $latestJobs
        ]);
    }
}