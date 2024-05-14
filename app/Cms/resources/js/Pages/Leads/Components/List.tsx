import { PageProps } from '@cms/types';
import { Lead } from '@/src/Leads/Types/Lead';
import { DataTable } from '@cms/Components/datatable/DataTable';
import { Card, CardContent, CardHeader } from '@cms/Components/ui/card';

import { columns } from './columns';

export default function List({ auth, objects }: PageProps & { objects: Lead[] }) {
    return (
        <section>
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-bold">Leads cadastrados</h2>
                    <p className="text-sm">Clique para editar.</p>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={objects}
                        path="leads"
                        user={auth.user}
                    />
                </CardContent>
            </Card>
        </section>
    );
};
