<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Domaine;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DomaineController extends Controller
{
    /**
     * Afficher la liste des domaines
     */
    public function index()
    {
        $domaines = Domaine::orderBy('designation')->paginate(10);
        
        return inertia('Admin/Domaines/Index', [
            'domaines' => $domaines
        ]);
    }
    
    /**
     * Afficher le formulaire de création d'un domaine
     */
    public function create()
    {
        return inertia('Admin/Domaines/Create');
    }
    
    /**
     * Enregistrer un nouveau domaine
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'designation' => 'required|string|max:255|unique:domaine',
            'is_active' => 'boolean'
        ]);
        
        Domaine::create($validatedData);
        
        return redirect()->route('admin.domaines.index')->with('success', 'Domaine créé avec succès !');
    }
    
    /**
     * Afficher le formulaire de modification d'un domaine
     */
    public function edit(Domaine $domaine)
    {
        return inertia('Admin/Domaines/Edit', [
            'domaine' => $domaine
        ]);
    }
    
    /**
     * Mettre à jour un domaine
     */
    public function update(Request $request, Domaine $domaine)
    {
        $validatedData = $request->validate([
            'designation' => 'required|string|max:255|unique:domaine,designation,' . $domaine->id,
            'is_active' => 'boolean'
        ]);
        
        $domaine->update($validatedData);
        
        return redirect()->route('admin.domaines.index')->with('success', 'Domaine mis à jour avec succès !');
    }
    
    /**
     * Supprimer un domaine
     */
    public function destroy(Domaine $domaine)
    {
        // Vérifier si le domaine est utilisé par des entreprises
        if ($domaine->entreprises()->count() > 0) {
            return back()->withErrors(['message' => 'Ce domaine est utilisé par des entreprises et ne peut pas être supprimé']);
        }
        
        $domaine->delete();
        
        return redirect()->route('admin.domaines.index')->with('success', 'Domaine supprimé avec succès !');
    }
}