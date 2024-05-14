import { PageProps } from '@cms/types';
import { CustomLink } from '@/src/Links/Types/Link';
import { DataTable } from '@cms/Components/datatable/DataTable';
import { Card, CardContent, CardHeader } from '@cms/Components/ui/card';

import { columns } from './columns';

export default function List({ auth, objects }: PageProps & { objects: CustomLink[] }) {
    return (
        <section className="mt-7">
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-bold">Links cadastrados</h2>
                    <p className="text-sm">Clique para editar.</p>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={objects.sort((a: CustomLink, b: CustomLink) => {
                            return a.order - b.order;
                        })}
                        path="links"
                        user={auth.user}
                    />
                </CardContent>
            </Card>
        </section>
    );
};
