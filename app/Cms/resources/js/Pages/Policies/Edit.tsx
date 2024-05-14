import { PageProps } from '@cms/types';
import { Head } from '@inertiajs/react';
import { Policy } from '@/src/Policies/Types/Policy';
import GlobalDndContext from '@cms/Components/GlobalDndContext';
import AuthenticatedLayout from '@cms/Layouts/Authenticated/AuthenticatedLayout';

import Update from './Components/Update';

export default function Edit({ auth, object }: PageProps & { object: Policy }) {
    return (
        <GlobalDndContext>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Políticas" />

                <Update object={object} />
            </AuthenticatedLayout>
        </GlobalDndContext>
    );
};
