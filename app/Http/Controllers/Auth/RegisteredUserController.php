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
    public function store(Request $request): RedirectResponse
    {


        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            // 'email' => 'required|string|email|max:255|unique:users',
            // 'password' => ['required', 'confirmed', Rules\Password::defaults()],
            
        ]);

        // $type = $request->type;

        $type = "candidat";

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

        // la partie entreprise il ne faut les domaines ainsi que 

        if($type==="entreprise"){

            $entreprise = Entreprise::create([
                'user_id'=> $user->id,
                'nom_complet' => $request->first_name . ' ' . $request->last_name,
                'email' => $request->email,
                'type'=> $type
            ]);
        }
        

        event(new Registered($user));

        Auth::login($user);

        return redirect()->route('dashboard');
    }
}