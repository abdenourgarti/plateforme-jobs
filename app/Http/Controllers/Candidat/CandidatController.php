<?php

namespace App\Http\Controllers\Candidat;

use App\Http\Controllers\Controller;
use App\Models\Candidat;
use App\Models\CandidatCompetence;
use App\Models\CandidatExperience;
use App\Models\CandidatEducation;
use App\Models\OffreEmploiApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CandidatController extends Controller
{
    public function dashboard()
    {
        $candidat = Auth::user()->candidat;
        $applications = OffreEmploiApplication::where('candidat_id', $candidat->id)
            ->with('offreEmploi.entreprise')
            ->latest()
            ->take(5)
            ->get();
            
        $offresSuggestions = \App\Models\OffreEmploi::where('status', true)
            ->where('date_fin', '>=', now())
            ->with('entreprise', 'categorie')
            ->latest()
            ->take(5)
            ->get();

        return inertia('admin/Dashboard', [
            'applications' => $applications,
            'offresSuggestions' => $offresSuggestions
        ]);
    }

    public function profile()
    {
        $candidat = Auth::user()->candidat;
        $candidat->load('competences', 'experiences', 'educations');

        return inertia('Candidat/Profile', [
            'candidat' => $candidat
        ]);
    }

    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        $candidat = $user->candidat;

        // Valider les données de base du candidat
        $validatedData = $request->validate([
            'nom_complet' => 'required|string|max:100',
            'email' => 'required|email|max:50',
            'adresse' => 'nullable|string|max:255',
            'fonction' => 'nullable|string|max:255',
            'telephone' => 'nullable|string|max:20',
            'sexe' => 'nullable|in:M,F',
            'instagram' => 'nullable|string|max:255',
            'facebook' => 'nullable|string|max:255',
            'linkedin' => 'nullable|string|max:255',
            'twitter' => 'nullable|string|max:255',
            'youtube' => 'nullable|string|max:255',
            'portfolio' => 'nullable|string|max:255',
            'about_me' => 'nullable|string',
            'date_nessaince' => 'nullable|date',
            'langues' => 'nullable|string',
            'diplôme' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Traiter l'image si elle est présente
        if ($request->hasFile('image')) {
            // Supprimer l'ancienne image s'il y en a une
            if ($candidat->image) {
                Storage::delete('public/' . $candidat->image);
            }
            $imagePath = $request->file('image')->store('candidats', 'public');
            $validatedData['image'] = $imagePath;
        }

        // Mettre à jour les informations de base
        $candidat->update($validatedData);

        // Gérer les compétences
        $this->syncCompetences($candidat, $request->competences ?? []);

        // Gérer les expériences
        $this->syncExperiences($candidat, $request->experiences ?? []);

        // Gérer les éducations
        $this->syncEducations($candidat, $request->educations ?? []);

        return redirect()->route('candidat.profile')->with('success', 'Profil mis à jour avec succès !');
    }

    protected function syncCompetences(Candidat $candidat, array $competences)
    {
        // Supprimer toutes les compétences existantes
        $candidat->competences()->delete();

        // Ajouter les nouvelles compétences
        foreach ($competences as $competence) {
            if (!empty($competence['designation'])) {
                $candidat->competences()->create([
                    'designation' => $competence['designation']
                ]);
            }
        }
    }

    protected function syncExperiences(Candidat $candidat, array $experiences)
    {
        // Récupérer les IDs des expériences existantes
        $existingIds = $candidat->experiences()->pluck('id')->toArray();
        $updatedIds = [];

        // Mettre à jour ou créer des expériences
        foreach ($experiences as $exp) {
            if (!empty($exp['titre']) && !empty($exp['nom_entreprise'])) {
                if (isset($exp['id']) && in_array($exp['id'], $existingIds)) {
                    // Mettre à jour l'expérience existante
                    $candidat->experiences()->where('id', $exp['id'])->update([
                        'titre' => $exp['titre'],
                        'nom_entreprise' => $exp['nom_entreprise'],
                        'type_travail' => $exp['type_travail'],
                        'date_debut' => $exp['date_debut'],
                        'date_fin' => $exp['date_fin'],
                        'lieu' => $exp['lieu'] ?? null,
                        'description' => $exp['description'] ?? null,
                    ]);
                    $updatedIds[] = $exp['id'];
                } else {
                    // Créer une nouvelle expérience
                    $newExp = $candidat->experiences()->create([
                        'titre' => $exp['titre'],
                        'nom_entreprise' => $exp['nom_entreprise'],
                        'type_travail' => $exp['type_travail'],
                        'date_debut' => $exp['date_debut'],
                        'date_fin' => $exp['date_fin'],
                        'lieu' => $exp['lieu'] ?? null,
                        'description' => $exp['description'] ?? null,
                    ]);
                    $updatedIds[] = $newExp->id;
                }
            }
        }

        // Supprimer les expériences qui n'ont pas été mises à jour
        $idsToDelete = array_diff($existingIds, $updatedIds);
        if (!empty($idsToDelete)) {
            $candidat->experiences()->whereIn('id', $idsToDelete)->delete();
        }
    }

    protected function syncEducations(Candidat $candidat, array $educations)
    {
        // Récupérer les IDs des éducations existantes
        $existingIds = $candidat->educations()->pluck('id')->toArray();
        $updatedIds = [];

        // Mettre à jour ou créer des éducations
        foreach ($educations as $edu) {
            if (!empty($edu['titre']) && !empty($edu['nom_etablissement'])) {
                if (isset($edu['id']) && in_array($edu['id'], $existingIds)) {
                    // Mettre à jour l'éducation existante
                    $candidat->educations()->where('id', $edu['id'])->update([
                        'titre' => $edu['titre'],
                        'nom_etablissement' => $edu['nom_etablissement'],
                        'annee_debut' => $edu['annee_debut'],
                        'annee_fin' => $edu['annee_fin'],
                        'description' => $edu['description'] ?? null,
                    ]);
                    $updatedIds[] = $edu['id'];
                } else {
                    // Créer une nouvelle éducation
                    $newEdu = $candidat->educations()->create([
                        'titre' => $edu['titre'],
                        'nom_etablissement' => $edu['nom_etablissement'],
                        'annee_debut' => $edu['annee_debut'],
                        'annee_fin' => $edu['annee_fin'],
                        'description' => $edu['description'] ?? null,
                    ]);
                    $updatedIds[] = $newEdu->id;
                }
            }
        }

        // Supprimer les éducations qui n'ont pas été mises à jour
        $idsToDelete = array_diff($existingIds, $updatedIds);
        if (!empty($idsToDelete)) {
            $candidat->educations()->whereIn('id', $idsToDelete)->delete();
        }
    }

    public function applications()
    {
        $candidat = Auth::user()->candidat;
        $applications = OffreEmploiApplication::where('candidat_id', $candidat->id)
            ->with('offreEmploi.entreprise')
            ->latest()
            ->paginate(10);

        return inertia('Candidat/Applications', [
            'applications' => $applications
        ]);
    }
}
