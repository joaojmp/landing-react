import { PageProps } from '@cms/types';
import { Post } from '@/src/Posts/Types/Post';
import { DataTable } from '@cms/Components/datatable/DataTable';
import { Card, CardContent, CardHeader } from '@cms/Components/ui/card';

import { columns } from './columns';

export default function List({ auth, objects }: PageProps & { objects: Post[] }) {
    return (
        <section className="mt-7">
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-bold">Publicações cadastradas</h2>
                    <p className="text-sm">Clique para editar.</p>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={objects}
                        path="posts"
                        user={auth.user}
                    />
                </CardContent>
            </Card>
        </section>
    );
};
