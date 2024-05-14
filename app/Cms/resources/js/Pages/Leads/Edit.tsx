import { PageProps } from '@cms/types';
import { FaArrowLeft } from 'react-icons/fa';
import { Head, Link } from '@inertiajs/react';
import { Lead } from '@/src/Leads/Types/Lead';
import { Button } from '@cms/Components/ui/button';
import { Card, CardContent, CardHeader } from '@cms/Components/ui/card';
import AuthenticatedLayout from '@cms/Layouts/Authenticated/AuthenticatedLayout';

export default function Edit({ auth, object }: PageProps & { object: Lead }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Leads" />

            <section>
                <Card>
                    <CardHeader>
                        <h1 className="text-xl font-bold">Lead cadastrado</h1>
                        <p className="text-sm">Disponível apenas para visualização.</p>
                    </CardHeader>
                    <CardContent>
                        <div className="border rounded-xl mb-5">
                            <div className="flex items-center justify-between p-4">
                                <h2>
                                    <b>Origem do lead:</b> {object.origin}
                                </h2>
                                <h3>
                                    <b>Data de captura:</b> {new Date(object.created_at).toLocaleString()}
                                </h3>
                            </div>
                            <hr />
                            <ul className="p-4 space-y-3">
                                <li>
                                    <b>Nome:</b> {object.name}
                                </li>
                                <li>
                                    <b>E-mail:</b> {object.email}
                                </li>
                                <li>
                                    <b>Telefone:</b> +{object.phone}
                                </li>
                                <li>
                                    <b>Assunto:</b> {object.subject}
                                </li>
                                <li>
                                    <b>Mensagem:</b> {object.message}
                                </li>
                            </ul>
                        </div>
                        <div className="flex justify-end">
                            <Button asChild type="button" variant="outline" className="flex items-center gap-1">
                                <Link href={route('leads.index')}>
                                    <FaArrowLeft /> Voltar
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </AuthenticatedLayout>
    );
};
