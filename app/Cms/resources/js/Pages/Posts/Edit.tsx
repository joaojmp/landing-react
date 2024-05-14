import { PageProps } from '@cms/types';
import { Head } from '@inertiajs/react';
import { Post } from '@/src/Posts/Types/Post';
import { Subject } from '@/src/Posts/Types/Subject';
import GlobalDndContext from '@cms/Components/GlobalDndContext';
import AuthenticatedLayout from '@cms/Layouts/Authenticated/AuthenticatedLayout';

import Update from './Components/Update';

export default function Edit({ auth, object, subjects }: PageProps & { object: Post; subjects: Subject[] }) {
    return (
        <GlobalDndContext>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Postagens" />

                <Update user={auth.user} object={object} subjects={subjects} />
            </AuthenticatedLayout>
        </GlobalDndContext>
    );
};
