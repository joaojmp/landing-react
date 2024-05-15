import { PageProps } from '@cms/types';
import { Head } from '@inertiajs/react';
import { Landing } from '@/src/Landings/Types/Landing';
import GlobalDndContext from '@cms/Components/GlobalDndContext';
import AuthenticatedLayout from '@cms/Layouts/Authenticated/AuthenticatedLayout';

import List from './Components/List';
import Create from './Components/Create';

export default function All({ auth, objects }: PageProps & { objects: Landing[] }) {
    return (
        <GlobalDndContext>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Landings" />

                <Create />

                <List auth={auth} objects={objects} />
            </AuthenticatedLayout>
        </GlobalDndContext>
    );
};
