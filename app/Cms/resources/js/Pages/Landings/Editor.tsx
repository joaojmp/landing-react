import { PageProps } from '@cms/types';
import { Head } from '@inertiajs/react';
import { Landing } from '@/src/Landings/Types/Landing';
import GrapeJsEditor from '@cms/Components/GrapeJsEditor';
import GlobalDndContext from '@cms/Components/GlobalDndContext';

export default function Edit({ auth, landing }: PageProps & { landing: Landing }) {
    return (
        <>
            <Head title="Editor" />

            <GlobalDndContext>
                <GrapeJsEditor landing={landing} user={auth.user} />
            </GlobalDndContext>
        </>
    );
};
