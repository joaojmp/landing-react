import { PageProps } from '@cms/types';
import { Landing } from '@/src/Landings/Types/Landing';
import { DataTable } from '@cms/Components/datatable/DataTable';
import { Card, CardContent, CardHeader } from '@cms/Components/ui/card';

import { columns } from './columns';

export default function List({ auth, objects }: PageProps & { objects: Landing[] }) {
    return (
        <section className="mt-7">
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-bold">Landings cadastradas</h2>
                    <p className="text-sm">Clique para editar.</p>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={objects}
                        path="landings"
                        user={auth.user}
                    />
                </CardContent>
            </Card>
        </section>
    );
};
