import { PageProps } from '@cms/types';
import { Policy } from '@/src/Policies/Types/Policy';
import { DataTable } from '@cms/Components/datatable/DataTable';
import { Card, CardContent, CardHeader } from '@cms/Components/ui/card';

import { columns } from './columns';

export default function List({ auth, objects }: PageProps & { objects: Policy[] }) {
    return (
        <section className="mt-7">
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-bold">Políticas cadastradas</h2>
                    <p className="text-sm">Clique para editar.</p>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={objects}
                        path="policies"
                        user={auth.user}
                    />
                </CardContent>
            </Card>
        </section>
    );
};
