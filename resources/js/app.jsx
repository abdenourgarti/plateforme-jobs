import './bootstrap';
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

// Ajoutez ces lignes pour Ziggy
import { Ziggy } from './ziggy-generated';
window.route = (name, params, absolute) => {
    return window.Ziggy 
        ? route(name, params, absolute, window.Ziggy)
        : name;
};

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    return pages[`./Pages/${name}.jsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})