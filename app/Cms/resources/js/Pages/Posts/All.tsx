import { PageProps } from '@cms/types';
import { Head } from '@inertiajs/react';
import { Post } from '@/src/Posts/Types/Post';
import { Subject } from '@/src/Posts/Types/Subject';
import GlobalDndContext from '@cms/Components/GlobalDndContext';
import AuthenticatedLayout from '@cms/Layouts/Authenticated/AuthenticatedLayout';

import List from './Components/List';
import Create from './Components/Create';

export default function All({ auth, objects, subjects }: PageProps & { objects: Post[]; subjects: Subject[] }) {
    return (
        <GlobalDndContext>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Publicações" />

                <Create subjects={subjects} />

                <List auth={auth} objects={objects} />
            </AuthenticatedLayout>
        </GlobalDndContext>
    );
};
