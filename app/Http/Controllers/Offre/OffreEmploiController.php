<?php

namespace App\Http\Controllers\Offre;

use App\Http\Controllers\Controller;
use App\Models\OffreEmploi;
use App\Models\OffreEmploiCompetence;
use App\Models\OffreEmploiBenefit;
use App\Models\OffreEmploiResponsabilite;
use App\Models\OffreEmploiExigence;
use App\Models\OffreEmploiPreference;
use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OffreEmploiController extends Controller
{
    /**
     * Afficher la liste des offres d'emploi publiques
     */
    public function index(Request $request)
    {
        $query = OffreEmploi::where('status', true)
            ->where('date_fin', '>=', now())
            ->with('entreprise', 'categorie');
        
        // Filtres
        if ($request->filled('categorie')) {
            $query->where('categorie_id', $request->categorie);
        }
        
        if ($request->filled('type_travail')) {
            $query->where('type_travail', $request->type_travail);
        }
        
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('titre', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%");
            });
        }
        
        $offres = $query->latest()->paginate(10)->withQueryString();
        $categories = Categorie::where('is_active', true)->get();
        
        return inertia('client/JobPage', [
            'offres' => $offres,
            'categories' => $categories,
            'filters' => $request->only(['search', 'categorie', 'type_travail'])
        ]);
    }
    
    /**
     * Afficher le détail d'une offre d'emploi
     */
    public function show(OffreEmploi $offre)
    {
        $offre->load([
            'entreprise.domaine',
            'categorie',
            'competences',
            'benefits',
            'responsabilites',
            'exigences',
            'preferences'
        ]);
        
        // Vérifier si le candidat a déjà postulé
        $hasApplied = false;
        if (Auth::check() && Auth::user()->type === 'candidat') {
            $candidat = Auth::user()->candidat;
            $hasApplied = $offre->applications()->where('candidat_id', $candidat->id)->exists();
        }
        
        // Suggestions d'offres similaires
        $similarOffres = OffreEmploi::where('id', '!=', $offre->id)
            ->where('status', true)
            ->where('date_fin', '>=', now())
            ->where('categorie_id', $offre->categorie_id)
            ->with('entreprise')
            ->take(3)
            ->get();
        
        return inertia('Offres/Show', [
            'offre' => $offre,
            'hasApplied' => $hasApplied,
            'similarOffres' => $similarOffres
        ]);
    }
    
    /**
     * Afficher les offres d'une entreprise
     */
    public function mesOffres()
    {
        $entreprise = Auth::user()->entreprise;
        $offres = OffreEmploi::where('entreprise_id', $entreprise->id)
            ->with('categorie')
            ->withCount('applications')
            ->latest()
            ->paginate(10);
        
        return inertia('Entreprise/Offres/Index', [
            'offres' => $offres
        ]);
    }
    
    /**
     * Afficher le formulaire de création d'une offre
     */
    public function create()
    {
        $categories = Categorie::where('is_active', true)->get();
        
        return inertia('Entreprise/Offres/Create', [
            'categories' => $categories
        ]);
    }
    
    /**
     * Enregistrer une nouvelle offre
     */
    public function store(Request $request)
    {
        $entreprise = Auth::user()->entreprise;
        
        // Valider les données de base de l'offre
        $validatedData = $request->validate([
            'titre' => 'required|string|max:255',
            'categorie_id' => 'required|exists:categorie,id',
            'type_travail' => 'required|in:Full-Time,Part-Time,Remote,Internship,Contrat',
            'description' => 'required|string',
            'nombre_limit' => 'nullable|integer|min:1',
            'date_fin' => 'required|date|after:today',
            'salaire' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'status' => 'boolean',
            // Validation des éléments liés
            'competences' => 'nullable|array',
            'competences.*.designation' => 'required|string|max:255',
            'benefits' => 'nullable|array',
            'benefits.*.titre' => 'required|string|max:255',
            'benefits.*.description' => 'nullable|string',
            'benefits.*.icon' => 'nullable|string|max:255',
            'responsabilites' => 'nullable|array',
            'responsabilites.*.designation' => 'required|string|max:255',
            'exigences' => 'nullable|array',
            'exigences.*.designation' => 'required|string|max:255',
            'preferences' => 'nullable|array',
            'preferences.*.designation' => 'required|string|max:255',
        ]);
        
        // Créer l'offre d'emploi
        $offre = $entreprise->offres()->create([
            'categorie_id' => $validatedData['categorie_id'],
            'titre' => $validatedData['titre'],
            'type_travail' => $validatedData['type_travail'],
            'description' => $validatedData['description'],
            'nombre_limit' => $validatedData['nombre_limit'] ?? null,
            'date_fin' => $validatedData['date_fin'],
            'salaire' => $validatedData['salaire'] ?? null,
            'location' => $validatedData['location'] ?? null,
            'status' => $validatedData['status'] ?? true,
            'date_publication' => now(),
        ]);
        
        // Ajouter les compétences
        if (isset($validatedData['competences'])) {
            foreach ($validatedData['competences'] as $competence) {
                $offre->competences()->create([
                    'designation' => $competence['designation']
                ]);
            }
        }
        
        // Ajouter les avantages (benefits)
        if (isset($validatedData['benefits'])) {
            foreach ($validatedData['benefits'] as $benefit) {
                $offre->benefits()->create([
                    'titre' => $benefit['titre'],
                    'description' => $benefit['description'] ?? null,
                    'icon' => $benefit['icon'] ?? null,
                ]);
            }
        }
        
        // Ajouter les responsabilités
        if (isset($validatedData['responsabilites'])) {
            foreach ($validatedData['responsabilites'] as $responsabilite) {
                $offre->responsabilites()->create([
                    'designation' => $responsabilite['designation']
                ]);
            }
        }
        
        // Ajouter les exigences
        if (isset($validatedData['exigences'])) {
            foreach ($validatedData['exigences'] as $exigence) {
                $offre->exigences()->create([
                    'designation' => $exigence['designation']
                ]);
            }
        }
        
        // Ajouter les préférences
        if (isset($validatedData['preferences'])) {
            foreach ($validatedData['preferences'] as $preference) {
                $offre->preferences()->create([
                    'designation' => $preference['designation']
                ]);
            }
        }
        
        return redirect()->route('entreprise.mes-offres')->with('success', 'Offre d\'emploi créée avec succès !');
    }
    
    /**
     * Afficher le formulaire de modification d'une offre
     */
    public function edit(OffreEmploi $offre)
    {
        // Vérifier si l'offre appartient à l'entreprise connectée
        $entreprise = Auth::user()->entreprise;
        if ($offre->entreprise_id !== $entreprise->id) {
            abort(403, 'Non autorisé');
        }
        
        $offre->load([
            'competences',
            'benefits',
            'responsabilites',
            'exigences',
            'preferences'
        ]);
        
        $categories = Categorie::where('is_active', true)->get();
        
        return inertia('Entreprise/Offres/Edit', [
            'offre' => $offre,
            'categories' => $categories
        ]);
    }
    
    /**
     * Mettre à jour une offre
     */
    public function update(Request $request, OffreEmploi $offre)
    {
        // Vérifier si l'offre appartient à l'entreprise connectée
        $entreprise = Auth::user()->entreprise;
        if ($offre->entreprise_id !== $entreprise->id) {
            abort(403, 'Non autorisé');
        }
        
        // Valider les données de base de l'offre
        $validatedData = $request->validate([
            'titre' => 'required|string|max:255',
            'categorie_id' => 'required|exists:categorie,id',
            'type_travail' => 'required|in:Full-Time,Part-Time,Remote,Internship,Contrat',
            'description' => 'required|string',
            'nombre_limit' => 'nullable|integer|min:1',
            'date_fin' => 'required|date',
            'salaire' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'status' => 'boolean',
            // Validation des éléments liés
            'competences' => 'nullable|array',
            'competences.*.designation' => 'required|string|max:255',
            'benefits' => 'nullable|array',
            'benefits.*.titre' => 'required|string|max:255',
            'benefits.*.description' => 'nullable|string',
            'benefits.*.icon' => 'nullable|string|max:255',
            'responsabilites' => 'nullable|array',
            'responsabilites.*.designation' => 'required|string|max:255',
            'exigences' => 'nullable|array',
            'exigences.*.designation' => 'required|string|max:255',
            'preferences' => 'nullable|array',
            'preferences.*.designation' => 'required|string|max:255',
        ]);
        
        // Mettre à jour l'offre d'emploi
        $offre->update([
            'categorie_id' => $validatedData['categorie_id'],
            'titre' => $validatedData['titre'],
            'type_travail' => $validatedData['type_travail'],
            'description' => $validatedData['description'],
            'nombre_limit' => $validatedData['nombre_limit'] ?? null,
            'date_fin' => $validatedData['date_fin'],
            'salaire' => $validatedData['salaire'] ?? null,
            'location' => $validatedData['location'] ?? null,
            'status' => $validatedData['status'] ?? true,
        ]);
        
        // Mettre à jour les compétences
        $this->syncOffreCompetences($offre, $validatedData['competences'] ?? []);
        
        // Mettre à jour les avantages (benefits)
        $this->syncOffreBenefits($offre, $validatedData['benefits'] ?? []);
        
        // Mettre à jour les responsabilités
        $this->syncOffreResponsabilites($offre, $validatedData['responsabilites'] ?? []);
        
        // Mettre à jour les exigences
        $this->syncOffreExigences($offre, $validatedData['exigences'] ?? []);
        
        // Mettre à jour les préférences
        $this->syncOffrePreferences($offre, $validatedData['preferences'] ?? []);
        
        return redirect()->route('entreprise.mes-offres')->with('success', 'Offre d\'emploi mise à jour avec succès !');
    }
    
    /**
     * Supprimer une offre
     */
    public function destroy(OffreEmploi $offre)
    {
        // Vérifier si l'offre appartient à l'entreprise connectée
        $entreprise = Auth::user()->entreprise;
        if ($offre->entreprise_id !== $entreprise->id) {
            abort(403, 'Non autorisé');
        }
        
        // Supprimer l'offre et tous ses éléments associés (via les contraintes de clé étrangère)
        $offre->delete();
        
        return redirect()->route('entreprise.mes-offres')->with('success', 'Offre d\'emploi supprimée avec succès !');
    }
    
    /**
     * Méthodes privées pour la gestion des relations
     */
    private function syncOffreCompetences(OffreEmploi $offre, array $competences)
    {
        // Supprimer toutes les compétences existantes
        $offre->competences()->delete();
        
        // Ajouter les nouvelles compétences
        foreach ($competences as $competence) {
            if (!empty($competence['designation'])) {
                $offre->competences()->create([
                    'designation' => $competence['designation']
                ]);
            }
        }
    }
    
    private function syncOffreBenefits(OffreEmploi $offre, array $benefits)
    {
        // Récupérer les IDs des benefits existants
        $existingIds = $offre->benefits()->pluck('id')->toArray();
        $updatedIds = [];
        
        // Mettre à jour ou créer des benefits
        foreach ($benefits as $benefit) {
            if (!empty($benefit['titre'])) {
                if (isset($benefit['id']) && in_array($benefit['id'], $existingIds)) {
                    // Mettre à jour le benefit existant
                    $offre->benefits()->where('id', $benefit['id'])->update([
                        'titre' => $benefit['titre'],
                        'description' => $benefit['description'] ?? null,
                        'icon' => $benefit['icon'] ?? null,
                    ]);
                    $updatedIds[] = $benefit['id'];
                } else {
                    // Créer un nouveau benefit
                    $newBenefit = $offre->benefits()->create([
                        'titre' => $benefit['titre'],
                        'description' => $benefit['description'] ?? null,
                        'icon' => $benefit['icon'] ?? null,
                    ]);
                    $updatedIds[] = $newBenefit->id;
                }
            }
        }
        
        // Supprimer les benefits qui n'ont pas été mis à jour
        $idsToDelete = array_diff($existingIds, $updatedIds);
        if (!empty($idsToDelete)) {
            $offre->benefits()->whereIn('id', $idsToDelete)->delete();
        }
    }
    
    private function syncOffreResponsabilites(OffreEmploi $offre, array $responsabilites)
    {
        // Supprimer toutes les responsabilités existantes
        $offre->responsabilites()->delete();
        
        // Ajouter les nouvelles responsabilités
        foreach ($responsabilites as $responsabilite) {
            if (!empty($responsabilite['designation'])) {
                $offre->responsabilites()->create([
                    'designation' => $responsabilite['designation']
                ]);
            }
        }
    }
    
    private function syncOffreExigences(OffreEmploi $offre, array $exigences)
    {
        // Supprimer toutes les exigences existantes
        $offre->exigences()->delete();
        
        // Ajouter les nouvelles exigences
        foreach ($exigences as $exigence) {
            if (!empty($exigence['designation'])) {
                $offre->exigences()->create([
                    'designation' => $exigence['designation']
                ]);
            }
        }
    }
    
    private function syncOffrePreferences(OffreEmploi $offre, array $preferences)
    {
        // Supprimer toutes les préférences existantes
        $offre->preferences()->delete();
        
        // Ajouter les nouvelles préférences
        foreach ($preferences as $preference) {
            if (!empty($preference['designation'])) {
                $offre->preferences()->create([
                    'designation' => $preference['designation']
                ]);
            }
        }
    }
}