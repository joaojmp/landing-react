import { FormEventHandler } from 'react';

import { PageProps } from "@cms/types";
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@cms/Components/ui/button';
import { FaCheck, FaSpinner } from 'react-icons/fa';
import { Config } from '@/src/Configs/Types/Config';
import { toast } from '@cms/Components/ui/use-toast';
import CustomTextArea from '@cms/Components/fields/CustomTextarea';
import { Card, CardContent, CardHeader } from '@cms/Components/ui/card';
import AuthenticatedLayout from '@cms/Layouts/Authenticated/AuthenticatedLayout';

export default function Scripts({ auth, configs }: PageProps & { configs: Config[] }) {
    const { data, setData, put, processing, errors } = useForm({
        scripts_head: configs.filter(config => config.name == "scripts_head")[0].content,
        scripts_body: configs.filter(config => config.name == "scripts_body")[0].content,
    } as any);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('configs.scripts.update'), {
            onSuccess: () => {
                toast({
                    title: "Sucesso.",
                    description: "Scripts atualizados com sucesso!",
                });
            }, onError: (errors) => {
                toast({
                    title: "Ah! algo deu errado.",
                    description: Object.values(errors).flat().join('\n'),
                });
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Scripts" />

            <Card>
                <CardHeader>
                    <h2 className="text-xl font-bold">Scripts</h2>
                    <p className="text-sm">Modifique os campos a seguir e pressione <b>Salvar</b> para alterar os dados.</p>
                </CardHeader>
                <CardContent className='pt-2'>
                    <form onSubmit={submit} className='space-y-5'>
                        <CustomTextArea
                            label='Script tag head'
                            name='scripts_head'
                            value={data.scripts_head}
                            disabled={processing}
                            error={errors.scripts_head}
                            required={false}
                            onChange={(e: any) => setData('scripts_head', e.target.value)}
                        />

                        <CustomTextArea
                            label='Script tag body'
                            name='scripts_body'
                            value={data.scripts_body}
                            disabled={processing}
                            error={errors.scripts_body}
                            required={false}
                            onChange={(e: any) => setData('scripts_body', e.target.value)}
                        />
                        <div className="flex justify-between">
                            <small>* Campos obrigatórios</small>
                            <div className='fixed bottom-12 right-12 p-3 bg-background border rounded-md'>
                                <Button type="submit" className="flex items-center gap-1" disabled={processing}>
                                    {processing ? <FaSpinner className="mr-2 h-4 w-4 animate-spin" /> : <FaCheck />}
                                    Salvar
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
};
