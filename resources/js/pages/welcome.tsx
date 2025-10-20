import { type Role } from '@/types';
import { Head } from '@inertiajs/react';
import { AdminDashboard } from './projects/dashboard/admin';
import { ManagerDashboard } from './projects/dashboard/manager';
import { ComponentPropsWithoutRef } from 'react';

type WelcomeProps = {
    server: {
        role: Role
    };
} & ComponentPropsWithoutRef<'div'>;

export default function Welcome({ server }: WelcomeProps) {
    const dashboard
        = {
            admin: <AdminDashboard />,
            manager: <ManagerDashboard />
        }[server.role.slug]

    console.log(dashboard);
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
