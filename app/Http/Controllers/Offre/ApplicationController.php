<?php

namespace App\Http\Controllers\Offre;

use App\Http\Controllers\Controller;
use App\Models\OffreEmploi;
use App\Models\OffreEmploiApplication;
use App\Models\Candidat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ApplicationController extends Controller
{
    /**
     * Afficher la liste des candidatures pour une offre
     */
    public function index(OffreEmploi $offre)
    {
        // Vérifier si l'offre appartient à l'entreprise connectée
        $entreprise = Auth::user()->entreprise;
        if ($offre->entreprise_id !== $entreprise->id) {
            abort(403, 'Non autorisé');
        }
        
        $applications = $offre->applications()
            ->with('candidat')
            ->latest()
            ->paginate(10);
        
        return inertia('Entreprise/Applications/Index', [
            'offre' => $offre->only(['id', 'titre']),
            'applications' => $applications
        ]);
    }
    
    /**
     * Afficher le détail d'une candidature
     */
    public function show(OffreEmploi $offre, OffreEmploiApplication $application)
    {
        // Vérifier si l'offre appartient à l'entreprise connectée
        $entreprise = Auth::user()->entreprise;
        if ($offre->entreprise_id !== $entreprise->id) {
            abort(403, 'Non autorisé');
        }
        
        // Vérifier si la candidature appartient à l'offre
        if ($application->offre_emploi_id !== $offre->id) {
            abort(404, 'Candidature non trouvée');
        }
        
        $application->load('candidat');
        
        return inertia('Entreprise/Applications/Show', [
            'offre' => $offre->only(['id', 'titre']),
            'application' => $application
        ]);
    }
    
    /**
     * Enregistrer une nouvelle candidature
     */
    public function store(Request $request, OffreEmploi $offre)
    {
        // Vérifier si l'offre est active
        if (!$offre->status || $offre->date_fin < now()) {
            return back()->withErrors(['message' => 'Cette offre n\'est plus disponible']);
        }
        
        $candidat = Auth::user()->candidat;
        
        // Vérifier si le candidat a déjà postulé
        if ($offre->applications()->where('candidat_id', $candidat->id)->exists()) {
            return back()->withErrors(['message' => 'Vous avez déjà postulé à cette offre']);
        }
        
        // Valider les données de la candidature
        $validatedData = $request->validate([
            'nom_complet' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telephone' => 'nullable|string|max:20',
            'dernier_poste' => 'nullable|string|max:255',
            'linkedin' => 'nullable|url|max:255',
            'portfolio' => 'nullable|url|max:255',
            'informations_supplementaires' => 'nullable|string',
            'cv' => 'required|file|mimes:pdf,doc,docx|max:5120', // Max 5MB
        ]);
        
        // Enregistrer le CV
        $cvPath = $request->file('cv')->store('cvs', 'public');
        $validatedData['cv'] = $cvPath;
        
        // Créer la candidature
        $application = $offre->applications()->create([
            'candidat_id' => $candidat->id,
            'nom_complet' => $validatedData['nom_complet'],
            'email' => $validatedData['email'],
            'telephone' => $validatedData['telephone'] ?? null,
            'dernier_poste' => $validatedData['dernier_poste'] ?? null,
            'linkedin' => $validatedData['linkedin'] ?? null,
            'portfolio' => $validatedData['portfolio'] ?? null,
            'informations_supplementaires' => $validatedData['informations_supplementaires'] ?? null,
            'cv' => $validatedData['cv'],
        ]);
        
        return redirect()->route('offres.show', $offre)->with('success', 'Votre candidature a été envoyée avec succès !');
    }
}