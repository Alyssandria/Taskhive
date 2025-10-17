import { formatCase, getHighestRole } from '@/lib/utils';
import { SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { AdminDashboard } from './projects/dashboard/admin';
import { ManagerDashboard } from './projects/dashboard/manager';
import { ReactNode } from 'react';

export default function Welcome({ server }) {
    const {auth} = usePage<SharedData>().props;

    const dashboards : {
        [key: string]: ReactNode
    }= {
        admin: <AdminDashboard />,
        manager: <ManagerDashboard />
    }

    const dashboard = dashboards[getHighestRole(auth.roles) ?? "default"];
    return (
        <>
            <Head title="Dashboard">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div>
                {dashboard}
            </div>
        </>
    );
}
