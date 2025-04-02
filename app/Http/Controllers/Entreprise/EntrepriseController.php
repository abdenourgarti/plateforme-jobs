<?php

namespace App\Http\Controllers\Entreprise;

use App\Http\Controllers\Controller;
use App\Models\Entreprise;
use App\Models\EntrepriseTechnologie;
use App\Models\Domaine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EntrepriseController extends Controller
{
    public function dashboard()
    {
        $entreprise = Auth::user()->entreprise;
        // $offres = $entreprise->offres()
        //     ->with('categorie')
        //     ->latest()
        //     ->take(5)
        //     ->get();
            
        // $totalOffres = $entreprise->offres()->count();
        // $offresActives = $entreprise->offres()->where('status', true)->where('date_fin', '>=', now())->count();
        // $totalApplications = $entreprise->offres()->withCount('applications')->get()->sum('applications_count');

        return inertia('entreprise/Dashboard', 
        
        // [
        //     'offres' => $offres,
        //     'stats' => [
        //         'totalOffres' => $totalOffres,
        //         'offresActives' => $offresActives,
        //         'totalApplications' => $totalApplications
        //     ]
        // ]
    );
    }

    public function profile()
    {
        $entreprise = Auth::user()->entreprise;
        $entreprise->load('domaine', 'technologies');
        $domaines = Domaine::where('is_active', true)->get();

        return inertia('Entreprise/Profile', [
            'entreprise' => $entreprise,
            'domaines' => $domaines
        ]);
    }

    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        $entreprise = $user->entreprise;

        // Valider les données de base de l'entreprise
        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'domaine_id' => 'required|exists:domaine,id',
            'email' => 'required|email|max:255',
            'site' => 'nullable|url|max:255',
            'date_creation' => 'nullable|date',
            'nombre_employes' => 'nullable|integer|min:1',
            'locations' => 'nullable|string',
            'description' => 'nullable|string',
            'twitter' => 'nullable|string|max:255',
            'facebook' => 'nullable|string|max:255',
            'linkedin' => 'nullable|string|max:255',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Traiter le logo s'il est présent
        if ($request->hasFile('logo')) {
            // Supprimer l'ancien logo s'il y en a un
            if ($entreprise->logo) {
                Storage::delete('public/' . $entreprise->logo);
            }
            $logoPath = $request->file('logo')->store('entreprises', 'public');
            $validatedData['logo'] = $logoPath;
        }

        // Mettre à jour les informations de base
        $entreprise->update($validatedData);

        // Gérer les technologies
        $this->syncTechnologies($entreprise, $request->technologies ?? []);

        return redirect()->route('entreprise.profile')->with('success', 'Profil mis à jour avec succès !');
    }

    protected function syncTechnologies(Entreprise $entreprise, array $technologies)
    {
        // Supprimer toutes les technologies existantes
        $entreprise->technologies()->delete();

        // Ajouter les nouvelles technologies
        foreach ($technologies as $tech) {
            if (!empty($tech['designation'])) {
                $entreprise->technologies()->create([
                    'designation' => $tech['designation']
                ]);
            }
        }
    }
}
