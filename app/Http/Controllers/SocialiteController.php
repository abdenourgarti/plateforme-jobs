<?php

namespace App\Http\Controllers;

use App\Models\Candidat;
use App\Models\Entreprise;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SocialiteController extends Controller
{
    public function redirectToProvider($provider, Request $request)
    {
        $pageType = $request->query('page', 'default');
        $userType = $request->query('user', 'default');

        session(['type_page' => $pageType , 'type_user'=> $userType]);
        return Socialite::driver($provider)->redirect();
    }

    public function handleProviderCallback($provider)
    {
        try {

            $pageType = session('type_page');
            $userType = session('type_user');

            $socialUser = Socialite::driver($provider)->setHttpClient(new Client([
                'verify' => 'C:/wamp64/bin/php/php8.2.26/extras/ssl/cacert.pem'
            ]))->user();

            $user = User::where('email', $socialUser->getEmail())->first();

            if ($pageType === 'login') {

                if ($user) {
                    $typeUserLogged = $user->type;
                    Auth::login($user);
                    if($typeUserLogged === 'candidat') {
                        return Inertia::location(route('candidat.dashboard'));
                    }else{
                        return Inertia::location(route('entreprise.dashboard'));
                    }

                } else {

                    return redirect()->route('register')
                        ->with('error', 'Aucun compte trouvé avec cet email. Veuillez vous inscrire.');
                }
            } else {

                if ($user) {
                    // L'utilisateur existe déjà, rediriger vers la connexion
                    return redirect()->route('login')
                        ->with('error', 'Un compte avec cet email existe déjà. Veuillez vous connecter.');
                }

                if($userType === 'candidat'){

                    $user = User::create([
                        'email' => $socialUser->getEmail(),
                        'password' => bcrypt(uniqid()),
                        'type' => 'candidat'
                    ]);

                    Candidat::create([
                        'email' => $user->email,
                        'user_id' => $user->id,
                        'nom_complet' => 'candidat'
                    ]);

                    Auth::login($user);
                    return Inertia::location(route('candidat.dashboard'));

                }elseif($userType === 'entreprise'){
                    $user = User::create([
                        'email' => $socialUser->getEmail(),
                        'password' => bcrypt(uniqid()),
                        'type' => 'entreprise'
                    ]);
                    
                    Entreprise::create([
                        'user_id' => $user->id,
                        'nom' => 'entreprise'
                    ]);

                    Auth::login($user);
                    return Inertia::location(route('entreprise.dashboard'));
                } else {
                    // Type d'utilisateur non reconnu
                    return redirect()->route('register')
                        ->with('error', 'Type d\'utilisateur non valide.');
                }
            }

        } catch (\Exception $e) {
            return redirect()->route('login')->with('error', 'Erreur de connexion.');
        }
    }
}
