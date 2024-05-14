import { PageProps } from '@cms/types';
import { Banner } from '@/src/Banners/Types/Banner';
import { DataTable } from '@cms/Components/datatable/DataTable';
import { Card, CardContent, CardHeader } from '@cms/Components/ui/card';

import { columns } from './columns';

export default function List({ auth, objects }: PageProps & { objects: Banner[] }) {
    return (
        <section className="mt-7">
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-bold">Banners cadastrados</h2>
                    <p className="text-sm">Clique para editar.</p>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={objects.sort((a: Banner, b: Banner) => {
                            return a.order - b.order;
                        })}
                        path="banners"
                        user={auth.user}
                    />
                </CardContent>
            </Card>
        </section>
    );
};
