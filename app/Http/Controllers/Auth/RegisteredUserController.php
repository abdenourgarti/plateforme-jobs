<?php
// app/Http/Controllers/Auth/RegisteredUserController.php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Candidat;
use App\Models\Entreprise;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {

        
        $request->validate([
            // 'first_name' => 'required|string|max:255',
            // 'last_name' => 'required|string|max:255',
            // 'email' => 'required|string|email|max:255|unique:users',
            // 'password' => ['required', 'confirmed', Rules\Password::defaults()],
            
        ]);

        
        $type = $request->type;

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'type'=> $type
        ]);

        if($type==="candidat"){

            $candidat = Candidat::create([
                'user_id'=> $user->id,
                'nom_complet' => $request->first_name . ' ' . $request->last_name,
                'email' => $request->email,
                'type'=> $type
            ]);
        }
        if($type==="entreprise"){

            $entreprise = Entreprise::create([
                'user_id'=> $user->id,
                'nom' => $request->nom_entreprise,
                'email' => $request->email,
            ]);

        }

        Auth::login($user);

        return Inertia::location(route($type === "candidat" ? 'candidat.dashboard' : 'entreprise.dashboard'));

    }
}