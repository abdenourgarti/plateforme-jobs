import './bootstrap';
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import MainLayout from "./layout/MainLayout";

// Ajoutez Ziggy pour la gestion des routes
import { Ziggy } from './ziggy-generated';
window.route = (name, params, absolute) => {
    return window.Ziggy 
        ? route(name, params, absolute, window.Ziggy)
        : name;
};

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    const Page = pages[`./Pages/${name}.jsx`].default;

    // Appliquer MainLayout uniquement si la page ne définit pas déjà son propre layout
    Page.layout = Page.layout || ((page) => <MainLayout>{page}</MainLayout>);
    
    return Page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
});
