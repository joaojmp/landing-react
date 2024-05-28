import { PageProps } from '@cms/types';
import { Head } from '@inertiajs/react';
import { Lead } from '@/src/Leads/Types/Lead';
import AuthenticatedLayout from '@cms/Layouts/Authenticated/AuthenticatedLayout';

import Update from './Components/Update';

export default function Edit({ auth, object }: PageProps & { object: Lead }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Leads" />

            <Update object={object} />
        </AuthenticatedLayout>
    );
};
