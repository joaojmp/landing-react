import { FormEventHandler, useState } from 'react';

import { PageProps } from "@cms/types";
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@cms/Components/ui/button';
import { Config } from "@/src/Configs/Types/Config";
import { toast } from '@cms/Components/ui/use-toast';
import { FaCheck, FaSpinner, FaTimes } from 'react-icons/fa';
import ReactSelect from '@cms/Components/fields/ReactSelect';
import { FloatInput } from '@cms/Components/fields/FloatInput';
import GlobalDndContext from '@cms/Components/GlobalDndContext';
import { CustomCheckbox } from '@cms/Components/fields/CustomCheckbox';
import { Card, CardContent, CardHeader } from '@cms/Components/ui/card';
import AuthenticatedLayout from '@cms/Layouts/Authenticated/AuthenticatedLayout';
import { Cropper, cropperOpen, ExternalCropperProps } from '@cms/Components/fields/Cropper';

export default function Edit({ auth, configs }: PageProps & { configs: Config[] }) {
    const [cropper, setCropper] = useState<ExternalCropperProps>({ field: "", src: "", width: 1, height: 1 });
    const { data, setData, put, processing, errors, reset } = useForm({
        logo: '',
        favicon: '',
        sharing_image: '',
        contact_email: configs.filter(config => config.name == "contact_email")[0].content?.split(','),
        policy: Boolean(Number(configs.filter(config => config.name == "policy")[0].content)),
        cms_auth_time: configs.filter(config => config.name == "cms_auth_time")[0].content,
    } as any);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('configs.update'), {
            onSuccess: () => {
                toast({
                    title: "Sucesso.",
                    description: "Configurações atualizadas com sucesso!",
                });

                if (data.favicon) {
                    location.reload();
                }
            }, onError: (errors) => {
                toast({
                    title: "Ah! algo deu errado.",
                    description: Object.values(errors).flat().join('\n'),
                });
            }, onFinish: () => {
                reset("logo", "favicon", "sharing_image");
            }
        });
    };

    return (
        <GlobalDndContext>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Configurações gerais" />

                <Cropper field={cropper.field} src={cropper.src} width={cropper.width} height={cropper.height} setCropper={setCropper} data={data} setData={setData} />

                <Card>
                    <CardHeader>
                        <h2 className="text-xl font-bold">Configurações</h2>
                        <p className="text-sm">Modifique os campos a seguir e pressione <b>Salvar</b> para alterar os dados.</p>
                    </CardHeader>
                    <CardContent className='pt-2'>
                        <form onSubmit={submit} className='space-y-5'>
                            <div className="grid xl:grid-cols-2 gap-5">
                                <Card>
                                    <CardHeader>
                                        <h2 className='text-xl font-bold'>Imagens</h2>
                                    </CardHeader>
                                    <CardContent>
                                        {configs.filter(config => config.name == "logo")[0].content && (
                                            <Card className="mb-8 h-fit">
                                                <CardHeader className="pb-0">
                                                    <div className="flex items-center justify-between">
                                                        <b>Logo</b>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <img src={`/images/${configs.filter(config => config.name == "logo")[0].content}?id=${Date.now()}`} alt="Logo" width={800} height={800} className="mt-4 mx-auto" />
                                                </CardContent>
                                            </Card>
                                        )}
                                        {data.logo ? (
                                            <Card className="h-fit">
                                                <CardHeader className="pb-0">
                                                    <div className="flex items-center justify-between">
                                                        <b>Logo</b>
                                                        <FaTimes className="text-lg cursor-pointer" title="Remover logo" onClick={() => setData('logo', '')} />
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <img src={data.logo} alt="Logo" width={800} height={800} className="mt-4 mx-auto" />
                                                </CardContent>
                                            </Card>
                                        ) : (
                                            <FloatInput
                                                label='Logo'
                                                type='file'
                                                name='logo'
                                                value={data.logo}
                                                disabled={processing}
                                                error={errors.logo}
                                                required={false}
                                                onChange={(e) => cropperOpen({ img: e, width: 800, height: 800, setCropper: setCropper })}
                                                description='Imagem com 800px X 800px de até 2MB.'
                                            />
                                        )}

                                        {configs.filter(config => config.name == "favicon")[0].content && (
                                            <Card className="my-8 h-fit">
                                                <CardHeader className="pb-0">
                                                    <div className="flex items-center justify-between">
                                                        <b>Favicon</b>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <img src={`/images/${configs.filter(config => config.name == "favicon")[0].content}?id=${Date.now()}`} alt="Favicon" width={48} height={48} className="mt-4 mx-auto" />
                                                </CardContent>
                                            </Card>
                                        )}
                                        {data.favicon ? (
                                            <Card className="mt-8 h-fit">
                                                <CardHeader className="pb-0">
                                                    <div className="flex items-center justify-between">
                                                        <b>Favicon</b>
                                                        <FaTimes className="text-lg cursor-pointer" title="Remover favicon" onClick={() => setData('favicon', '')} />
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <img src={data.favicon} alt="Favicon" width={48} height={48} className="mt-4 mx-auto" />
                                                </CardContent>
                                            </Card>
                                        ) : (
                                            <FloatInput
                                                label='Favicon'
                                                type='file'
                                                name='favicon'
                                                value={data.favicon}
                                                disabled={processing}
                                                error={errors.favicon}
                                                required={false}
                                                onChange={(e) => cropperOpen({ img: e, width: 48, height: 48, setCropper: setCropper })}
                                                description='Imagem com 48px X 48px de até 2MB.'
                                            />
                                        )}

                                        {configs.filter(config => config.name == "sharing_image")[0].content && (
                                            <Card className="my-8 h-fit">
                                                <CardHeader className="pb-0">
                                                    <div className="flex items-center justify-between">
                                                        <b>Imagem de compartilhamento</b>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <img src={`/images/${configs.filter(config => config.name == "sharing_image")[0].content}?id=${Date.now()}`} alt="Imagem de compartilhamento" width={1200} height={630} className="mt-4 mx-auto" />
                                                </CardContent>
                                            </Card>
                                        )}
                                        {data.sharing_image ? (
                                            <Card className="mt-8 h-fit">
                                                <CardHeader className="pb-0">
                                                    <div className="flex items-center justify-between">
                                                        <b>Imagem de compartilhamento</b>
                                                        <FaTimes className="text-lg cursor-pointer" title="Remover imagem de compartilhamento" onClick={() => setData('sharing_image', '')} />
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <img src={data.sharing_image} alt="Sharing_image" width={1200} height={630} className="mt-4 mx-auto" />
                                                </CardContent>
                                            </Card>
                                        ) : (
                                            <FloatInput
                                                label='Imagem de compartilhamento'
                                                type='file'
                                                name='sharing_image'
                                                value={data.sharing_image}
                                                disabled={processing}
                                                error={errors.sharing_image}
                                                required={false}
                                                onChange={(e) => cropperOpen({ img: e, width: 1200, height: 630, setCropper: setCropper })}
                                                description='Imagem com 1200px X 630px de até 2MB.'
                                            />
                                        )}
                                    </CardContent>
                                </Card>
                                <div>
                                    <Card>
                                        <CardHeader>
                                            <h2 className='text-xl font-bold'>E-mails</h2>
                                        </CardHeader>
                                        <CardContent>
                                            <ReactSelect
                                                label='E-mail de contato'
                                                name='contact_email'
                                                list={data.contact_email.map((email: string) => ({ value: email, label: email })) ?? []}
                                                value={data.contact_email}
                                                disabled={processing}
                                                error={errors.contact_email}
                                                isMulti
                                                onChange={(e: any) => setData('contact_email', e.map((email: { value: string, label: string }) => email.value))}
                                                description='E-mail de contato para envio de e-mails automáticos.'
                                            />
                                        </CardContent>
                                    </Card>
                                    <Card className='mt-5'>
                                        <CardHeader>
                                            <h2 className='text-xl font-bold'>Cookies</h2>
                                        </CardHeader>
                                        <CardContent>
                                            <CustomCheckbox
                                                label='Preferências de cookies'
                                                name='policy'
                                                disabled={processing}
                                                error={errors.policy}
                                                checked={data.policy}
                                                required={false}
                                                onChange={(e) => setData('policy', e.target.checked)}
                                                description='Se desmarcado os usuários não poderão alterar as preferências de cookies.'
                                            />
                                        </CardContent>
                                    </Card>
                                    <Card className='mt-5'>
                                        <CardHeader>
                                            <h2 className='text-xl font-bold'>Configurações exclusivas Kombi</h2>
                                        </CardHeader>
                                        <CardContent>
                                            <FloatInput
                                                type='number'
                                                label='Tempo para um novo login'
                                                name='cms_auth_time'
                                                value={data.cms_auth_time}
                                                disabled={processing}
                                                error={errors.cms_auth_time}
                                                onChange={(e) => setData('cms_auth_time', e.target.value)}
                                                description='Tempo em minutos.'
                                            />
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
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
        </GlobalDndContext>
    );
};
