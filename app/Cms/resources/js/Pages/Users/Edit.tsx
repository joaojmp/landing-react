import { PageProps } from '@cms/types';
import { Head } from '@inertiajs/react';
import { User } from '@/src/Users/Types/User';
import AuthenticatedLayout from '@cms/Layouts/Authenticated/AuthenticatedLayout';

import Update from './Components/Update';

export default function Edit({ auth, object }: PageProps & { object: User }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Usuários" />

            <Update object={object} />
        </AuthenticatedLayout>
    );
};
