import './bootstrap';
import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import MainLayout from "./layout/MainLayout";
import AdminCompanyLayout from "./layout/AdminCompanyLayout";
import AdminLayout from "./layout/AdminLayout";

// Enhanced route handling
if (window.Ziggy) {
    window.route = (name, params, absolute) => 
        route(name, params, absolute, window.Ziggy);
}

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    const pagePath = `./Pages/${name}.jsx`;

    if (!pages[pagePath]) {
      throw new Error(`Page not found: ${name}`);
    }

    const Page = pages[pagePath].default;

    // Detect layout type
    const isAdminPage = /^Admin\//i.test(name);
    const isAdminCompanyPage = /^AdminCompany\//i.test(name);

    if (!Page.layout) {
      Page.layout = isAdminCompanyPage
        ? (page) => <AdminCompanyLayout>{page}</AdminCompanyLayout>
        : isAdminPage
        ? (page) => <AdminLayout>{page}</AdminLayout>
        : (page) => <MainLayout>{page}</MainLayout>;
    }

    return Page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});