import { PageProps } from '@cms/types';
import { Head } from '@inertiajs/react';
import { Page } from '@/src/Pages/Types/Page';
import GlobalDndContext from '@cms/Components/GlobalDndContext';
import AuthenticatedLayout from '@cms/Layouts/Authenticated/AuthenticatedLayout';

import List from './Components/List';
import Create from './Components/Create';

export default function All({ auth, objects }: PageProps & { objects: Page[] }) {
    return (
        <GlobalDndContext>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Páginas" />

                <Create />

                <List auth={auth} objects={objects} />
            </AuthenticatedLayout>
        </GlobalDndContext>
    );
};
