import { PageProps } from '@cms/types';
import { Head } from '@inertiajs/react';
import { User } from '@/src/Users/Types/User';
import GlobalDndContext from '@cms/Components/GlobalDndContext';
import AuthenticatedLayout from '@cms/Layouts/Authenticated/AuthenticatedLayout';

import List from './Components/List';
import Create from './Components/Create';

export default function All({ auth, objects }: PageProps & { objects: User[] }) {
    return (
        <GlobalDndContext>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Usuários" />

                <Create />

                <List auth={auth} objects={objects} />
            </AuthenticatedLayout>
        </GlobalDndContext>
    );
};
