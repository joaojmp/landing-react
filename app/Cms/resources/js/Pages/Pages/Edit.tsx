import { PageProps } from '@cms/types';
import { Head } from '@inertiajs/react';
import { Page } from '@/src/Pages/Types/Page';
import AuthenticatedLayout from '@cms/Layouts/Authenticated/AuthenticatedLayout';

import Update from './Components/Update';

export default function Edit({ auth, object }: PageProps & { object: Page }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Páginas" />

            <Update object={object} />
        </AuthenticatedLayout>
    );
};
