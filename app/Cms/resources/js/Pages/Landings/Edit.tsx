import { PageProps } from '@cms/types';
import { Head } from '@inertiajs/react';
import { Landing } from '@/src/Landings/Types/Landing';
import AuthenticatedLayout from '@cms/Layouts/Authenticated/AuthenticatedLayout';

import Update from './Components/Update';

export default function Edit({ auth, object }: PageProps & { object: Landing }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Landings" />

            <Update object={object} />
        </AuthenticatedLayout>
    );
};
