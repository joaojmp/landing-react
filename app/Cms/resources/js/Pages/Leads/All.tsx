import { PageProps } from '@cms/types';
import { Head } from '@inertiajs/react';
import { Lead } from '@/src/Leads/Types/Lead';
import GlobalDndContext from '@cms/Components/GlobalDndContext';
import AuthenticatedLayout from '@cms/Layouts/Authenticated/AuthenticatedLayout';

import List from './Components/List';

export default function All({ auth, objects }: PageProps & { objects: Lead[] }) {
    return (
        <GlobalDndContext>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Leads" />

                <List auth={auth} objects={objects} />
            </AuthenticatedLayout>
        </GlobalDndContext>
    );
};
