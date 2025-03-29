<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DemandeInscription;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DemandeInscriptionController extends Controller
{
    /**
     * Afficher la liste des demandes d'inscription
     */
    public function index(Request $request)
    {
        $query = DemandeInscription::with('user');
        
        // Filtrer par statut
        if ($request->filled('statut')) {
            $query->where('statut', $request->statut);
        } else {
            // Par défaut, afficher les demandes en attente
            $query->where('statut', 'en attente');
        }
        
        $demandes = $query->latest('date_demande')->paginate(10)->withQueryString();
        
        return inertia('Admin/DemandeInscription/Index', [
            'demandes' => $demandes,
            'filters' => $request->only(['statut'])
        ]);
    }
    
    /**
     * Accepter une demande d'inscription
     */
    public function accept(Request $request, DemandeInscription $demande)
    {
        // Vérifier que la demande est en attente
        if ($demande->statut !== 'en attente') {
            return back()->withErrors(['message' => 'Cette demande a déjà été traitée']);
        }
        
        // Mettre à jour le statut de la demande
        $demande->update([
            'statut' => 'accepte',
            'date_accepte' => now(),
            'commentaire' => $request->commentaire
        ]);
        
        // Activer le compte utilisateur
        $demande->user->update([
            'is_active' => true
        ]);
        
        return redirect()->route('admin.demandes.index')->with('success', 'Demande acceptée avec succès !');
    }
    
    /**
     * Refuser une demande d'inscription
     */
    public function reject(Request $request, DemandeInscription $demande)
    {
        // Vérifier que la demande est en attente
        if ($demande->statut !== 'en attente') {
            return back()->withErrors(['message' => 'Cette demande a déjà été traitée']);
        }
        
        // Mettre à jour le statut de la demande
        $demande->update([
            'statut' => 'refuse',
            'date_refuse' => now(),
            'commentaire' => $request->commentaire
        ]);
        
        return redirect()->route('admin.demandes.index')->with('success', 'Demande refusée avec succès !');
    }
}
