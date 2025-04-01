import { useForm } from '@inertiajs/react';

const LogoutButton = () => {
    const { post } = useForm();

    const handleLogout = () => {
        post(route('logout'));
    };

    return (
        <button 
            onClick={handleLogout} 
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
            Logout
        </button>
    );
};

export default LogoutButton;
