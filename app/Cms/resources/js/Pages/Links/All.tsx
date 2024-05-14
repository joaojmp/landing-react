import { PageProps } from '@cms/types';
import { Head } from '@inertiajs/react';
import { CustomLink } from '@/src/Links/Types/Link';
import GlobalDndContext from '@cms/Components/GlobalDndContext';
import AuthenticatedLayout from '@cms/Layouts/Authenticated/AuthenticatedLayout';

import List from './Components/List';
import Create from './Components/Create';

export default function All({ auth, objects, types, icons }: PageProps & { objects: CustomLink[]; types: string[]; icons: string[]; }) {
    return (
        <GlobalDndContext>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Links" />

                <Create types={types} icons={icons} />

                <List auth={auth} objects={objects} />
            </AuthenticatedLayout>
        </GlobalDndContext>
    );
};
