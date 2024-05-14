import { PageProps } from '@cms/types';
import { Head } from '@inertiajs/react';
import { Banner } from '@/src/Banners/Types/Banner';
import AuthenticatedLayout from '@cms/Layouts/Authenticated/AuthenticatedLayout';

import Update from './Components/Update';

export default function Edit({ auth, object }: PageProps & { object: Banner }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Banners" />

            <Update object={object} />
        </AuthenticatedLayout>
    );
};
