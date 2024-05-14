import { PageProps } from '@cms/types';
import { Head } from '@inertiajs/react';
import { Banner } from '@/src/Banners/Types/Banner';
import GlobalDndContext from '@cms/Components/GlobalDndContext';
import AuthenticatedLayout from '@cms/Layouts/Authenticated/AuthenticatedLayout';

import List from './Components/List';
import Create from './Components/Create';

export default function All({ auth, objects }: PageProps & { objects: Banner[] }) {
    return (
        <GlobalDndContext>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Banners" />

                <Create />

                <List auth={auth} objects={objects} />
            </AuthenticatedLayout>
        </GlobalDndContext>
    );
};
