import { PageProps } from '@cms/types';
import { Head } from '@inertiajs/react';
import { Subject } from '@/src/Posts/Types/Subject';
import AuthenticatedLayout from '@cms/Layouts/Authenticated/AuthenticatedLayout';

import Update from './Components/Update';

export default function Edit({ auth, object }: PageProps & { object: Subject }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Assunto" />

            <Update object={object} />
        </AuthenticatedLayout>
    );
};
