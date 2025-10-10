import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import Layout from './layouts/layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

type TPage = {
    default: {
        layout?: ReactNode | ((page: ReactNode) => ReactNode)
    }
}
createInertiaApp({
    title: (title) => title ? `${title} | ${appName}` : appName,
    resolve: (name) => {
        const pages: Record<string, TPage> = import.meta.glob('./pages/**/*.tsx', { eager: true });
        const page = pages[`./pages/${name}.tsx`];
        page.default.layout = page.default.layout || ((page) => <Layout children={page} />)
        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
