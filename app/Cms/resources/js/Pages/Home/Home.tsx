import { PageProps } from '@cms/types';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@cms/Layouts/Authenticated/AuthenticatedLayout';

import Report from './Components/Report';
import ChannelGrouping from './Components/ChannelGrouping';

export default function Home({ auth, report, channelGrouping }: PageProps & { report: Array<any>; channelGrouping: Array<any>; }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Home" />

            <div className="bg-white dark:bg-card border overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900 dark:text-gray-100 text-end">Olá <b>{auth.user.name}</b>, seja bem vindo.</div>
            </div>

            <Report report={report} />

            <div className="grid grid-cols-3">
                <ChannelGrouping channelGrouping={channelGrouping} />
            </div>
        </AuthenticatedLayout>
    );
}
