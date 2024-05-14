import { PageProps } from '@cms/types';
import { Head } from '@inertiajs/react';
import { CustomLink } from '@/src/Links/Types/Link';
import AuthenticatedLayout from '@cms/Layouts/Authenticated/AuthenticatedLayout';

import Update from './Components/Update';

export default function Edit({ auth, object, types, icons }: PageProps & { object: CustomLink; types: string[]; icons: string[]; }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Links" />

            <Update object={object} types={types} icons={icons} />
        </AuthenticatedLayout>
    );
};
