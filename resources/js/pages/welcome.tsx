import { AdminDashboardData, type Role } from '@/types';
import { Head } from '@inertiajs/react';
import { AdminDashboard } from './projects/dashboard/admin';
import { ManagerDashboard } from './projects/dashboard/manager';
import { ComponentPropsWithoutRef } from 'react';
import { MemberDashboard, MemberDashboardData } from './projects/dashboard/member';

type WelcomeProps = {
    server: {
        role: Role
        dashboardData: Record<string, any>
    };
} & ComponentPropsWithoutRef<'div'>;

export default function Welcome({ server }: WelcomeProps) {
    const dashboard
        = {
            admin: <AdminDashboard data={server.dashboardData as AdminDashboardData} />,
            manager: <ManagerDashboard />,
            member: <MemberDashboard data={server.dashboardData as MemberDashboardData} />
        }[server.role.slug]

    console.log(server);
    return (
        <>
            <Head title={`${server.role.slug} Dashboard`}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            {dashboard}
        </>
    );
}
