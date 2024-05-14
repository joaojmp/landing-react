import { PageProps } from '@cms/types';
import { Subject } from '@/src/Posts/Types/Subject';
import { DataTable } from '@cms/Components/datatable/DataTable';
import { Card, CardContent, CardHeader } from '@cms/Components/ui/card';

import { columns } from './columns';

export default function List({ auth, objects }: PageProps & { objects: Subject[] }) {
    return (
        <section className="mt-7">
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-bold">Assuntos cadastrados</h2>
                    <p className="text-sm">Clique para editar.</p>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={objects.sort((a: Subject, b: Subject) => {
                            return a.order - b.order;
                        })}
                        path="subjects"
                        user={auth.user}
                    />
                </CardContent>
            </Card>
        </section>
    );
};
