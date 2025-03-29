<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Categorie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategorieController extends Controller
{
    /**
     * Afficher la liste des catégories
     */
    public function index()
    {
        $categories = Categorie::orderBy('designation')->paginate(10);
        
        return inertia('Admin/Categories/Index', [
            'categories' => $categories
        ]);
    }
    
    /**
     * Afficher le formulaire de création d'une catégorie
     */
    public function create()
    {
        return inertia('Admin/Categories/Create');
    }
    
    /**
     * Enregistrer une nouvelle catégorie
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'designation' => 'required|string|max:255|unique:categorie',
            'is_active' => 'boolean'
        ]);
        
        Categorie::create($validatedData);
        
        return redirect()->route('admin.categories.index')->with('success', 'Catégorie créée avec succès !');
    }
    
    /**
     * Afficher le formulaire de modification d'une catégorie
     */
    public function edit(Categorie $categorie)
    {
        return inertia('Admin/Categories/Edit', [
            'categorie' => $categorie
        ]);
    }
    
    /**
     * Mettre à jour une catégorie
     */
    public function update(Request $request, Categorie $categorie)
    {
        $validatedData = $request->validate([
            'designation' => 'required|string|max:255|unique:categorie,designation,' . $categorie->id,
            'is_active' => 'boolean'
        ]);
        
        $categorie->update($validatedData);
        
        return redirect()->route('admin.categories.index')->with('success', 'Catégorie mise à jour avec succès !');
    }
    
    /**
     * Supprimer une catégorie
     */
    public function destroy(Categorie $categorie)
    {
        // Vérifier si la catégorie est utilisée par des offres d'emploi
        if ($categorie->offres()->count() > 0) {
            return back()->withErrors(['message' => 'Cette catégorie est utilisée par des offres d\'emploi et ne peut pas être supprimée']);
        }
        
        $categorie->delete();
        
        return redirect()->route('admin.categories.index')->with('success', 'Catégorie supprimée avec succès !');
    }
}