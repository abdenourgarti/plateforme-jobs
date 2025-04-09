<?php

namespace App\Http\Controllers;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SocialiteController extends Controller
{
    public function redirectToProvider($provider)
    {        
        return Socialite::driver($provider)->redirect();
    }

    public function handleProviderCallback($provider)
    {
        try {

            $socialUser = Socialite::driver($provider)->setHttpClient(new Client([
                'verify' => 'C:/wamp64/bin/php/php8.2.24/extras/ssl/cacert.pem'
            ]))->user();
            
            $user = User::where('email', $socialUser->getEmail())->first();

            if (!$user) {

                $user = User::create([
                    'email' => $socialUser->getEmail(),
                    'password' => bcrypt(uniqid()), 
                    'type'=> 'candidat'
                ]);
            }


            Auth::login($user);
            

            return Inertia::location(route('candidat.dashboard' ));
    

        } catch (\Exception $e) {
            return redirect()->route('login')->with('error', 'Erreur de connexion.');
        }
    }
}

