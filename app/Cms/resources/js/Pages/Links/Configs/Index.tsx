import { FormEventHandler, useState } from 'react';

import { PageProps } from "@cms/types";
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@cms/Components/ui/button';
import { Config } from '@/src/Configs/Types/Config';
import { toast } from '@cms/Components/ui/use-toast';
import { FaCheck, FaSpinner, FaTimes } from 'react-icons/fa';
import { FloatInput } from '@cms/Components/fields/FloatInput';
import CustomSelect from '@cms/Components/fields/CustomSelect';
import CustomTextArea from '@cms/Components/fields/CustomTextarea';
import { Card, CardContent, CardHeader } from '@cms/Components/ui/card';
import AuthenticatedLayout from '@cms/Layouts/Authenticated/AuthenticatedLayout';
import { Cropper, cropperOpen, ExternalCropperProps } from '@cms/Components/fields/Cropper';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@cms/Components/ui/alert-dialog';

export default function Edit({ auth, configs, borders }: PageProps & { configs: Config[]; borders: string[] }) {
    const [cropper, setCropper] = useState<ExternalCropperProps>({ field: "", src: "", width: 1, height: 1 });
    const { data, setData, put, processing, errors, reset } = useForm({
        links_logo: '',
        links_background: '',
        links_background_color: configs.filter(config => config.name == "links_background_color")[0].content,
        links_button_border: configs.filter(config => config.name == "links_button_border")[0].content,
        links_button_color: configs.filter(config => config.name == "links_button_color")[0].content,
        links_button_hover_color: configs.filter(config => config.name == "links_button_hover_color")[0].content,
        links_button_font_color: configs.filter(config => config.name == "links_button_font_color")[0].content,
        links_button_font_hover_color: configs.filter(config => config.name == "links_button_font_hover_color")[0].content,
        links_description: configs.filter(config => config.name == "links_description")[0].content,
        links_description_color: configs.filter(config => config.name == "links_description_color")[0].content,
    } as any);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('links.configs.update'), {
            onSuccess: () => {
                toast({
                    title: "Sucesso.",
                    description: "Configurações atualizadas com sucesso!",
                });
            }, onError: (errors) => {
                toast({
                    title: "Ah! algo deu errado.",
                    description: Object.values(errors).flat().join('\n'),
                });
            }, onFinish: () => {
                reset("links_logo", "links_background");
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Configurações links" />

            <Cropper field={cropper.field} src={cropper.src} width={cropper.width} height={cropper.height} setCropper={setCropper} data={data} setData={setData} />

            <Card>
                <CardHeader>
                    <h2 className="text-xl font-bold">Configurações - Links</h2>
                    <p className="text-sm">Modifique os campos a seguir e pressione <b>Salvar</b> para alterar os dados.</p>
                </CardHeader>
                <CardContent className='pt-2'>
                    <form onSubmit={submit} className='space-y-5'>
                        <div className="grid lg:grid-cols-2 gap-5">
                            <div>
                                {configs.filter(config => config.name == "links_logo")[0].content && (
                                    <Card className="mb-8 h-fit">
                                        <CardHeader className="pb-0">
                                            <div className="flex items-center justify-between">
                                                <b>Logo</b>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <img src={`/images/links/${configs.filter(config => config.name == "links_logo")[0].content}?id=${Date.now()}`} alt="Logo" width={434} height={336} className="mt-4 mx-auto" /><br />
                                            <div className="text-center">
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="destructive">
                                                            <FaTimes className="text-lg cursor-pointer me-1" /> Remover logo
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Essa ação não pode ser desfeita, isso excluirá permanentemente a logo
                                                                e removerá os dados de nossos servidores.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => {
                                                                    put(route('links.configs.file', { file: 'links_logo' }), {
                                                                        onSuccess: () => {
                                                                            toast({
                                                                                title: "Sucesso.",
                                                                                description: "Logo removida com sucesso!",
                                                                            });
                                                                        }, onError: (errors: any) => {
                                                                            toast({
                                                                                title: "Ah! algo deu errado.",
                                                                                description: Object.values(errors).flat().join('\n'),
                                                                            });
                                                                        }
                                                                    });
                                                                }}
                                                            >
                                                                Continuar
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                                {data.links_logo ? (
                                    <Card className="h-fit">
                                        <CardHeader className="pb-0">
                                            <div className="flex items-center justify-between">
                                                <b>Logo</b>
                                                <FaTimes className="text-lg cursor-pointer" title="Remover logo" onClick={() => setData('links_logo', '')} />
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <img src={data.links_logo} alt="logo" width={434} height={336} className="mt-4 mx-auto" />
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <FloatInput
                                        label='Logo'
                                        type='file'
                                        name='links_logo'
                                        value={data.links_logo}
                                        disabled={processing}
                                        error={errors.links_logo}
                                        required={false}
                                        onChange={(e) => cropperOpen({ img: e, width: 434, height: 336, setCropper: setCropper })}
                                        description='Imagem com 434px X 336px de até 2MB usada para o cabeçalho.'
                                    />
                                )}
                            </div>
                            <div>
                                {configs.filter(config => config.name == "links_background")[0].content && (
                                    <Card className="mb-8 h-fit">
                                        <CardHeader className="pb-0">
                                            <div className="flex items-center justify-between">
                                                <b>Imagem de fundo</b>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <img src={`/images/links/${configs.filter(config => config.name == "links_background")[0].content}?id=${Date.now()}`} alt="Imagem de fundo" width={1920} height={1080} className="mt-4 mx-auto" /><br />
                                            <div className="text-center">
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="destructive">
                                                            <FaTimes className="text-lg cursor-pointer me-1" /> Remover imagem de fundo
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Essa ação não pode ser desfeita, isso excluirá permanentemente a imagem de fundo
                                                                e removerá os dados de nossos servidores.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => {
                                                                    put(route('links.configs.file', { file: 'links_background' }), {
                                                                        onSuccess: () => {
                                                                            toast({
                                                                                title: "Sucesso.",
                                                                                description: "Imagem de fundo removida com sucesso!",
                                                                            });
                                                                        }, onError: (errors: any) => {
                                                                            toast({
                                                                                title: "Ah! algo deu errado.",
                                                                                description: Object.values(errors).flat().join('\n'),
                                                                            });
                                                                        }
                                                                    });
                                                                }}
                                                            >
                                                                Continuar
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                                {data.links_background ? (
                                    <Card className="h-fit">
                                        <CardHeader className="pb-0">
                                            <div className="flex items-center justify-between">
                                                <b>Imagem de fundo</b>
                                                <FaTimes className="text-lg cursor-pointer" title="Remover imagem de fundo" onClick={() => setData('links_background', '')} />
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <img src={data.links_background} alt="imagem de fundo" width={1920} height={1080} className="mt-4 mx-auto" />
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <FloatInput
                                        label='Imagem de fundo'
                                        type='file'
                                        name='links_background'
                                        value={data.links_background}
                                        disabled={processing}
                                        error={errors.links_background}
                                        required={false}
                                        onChange={(e) => cropperOpen({ img: e, width: 1920, height: 1080, setCropper: setCropper })}
                                        description='Imagem com 1920px X 1080px de até 2MB usada para o cabeçalho.'
                                    />
                                )}
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-5">
                            <FloatInput
                                type='color'
                                label='Cor do fundo'
                                name='links_background_color'
                                value={data.links_background_color}
                                disabled={processing}
                                error={errors.links_background_color}
                                onChange={(e) => setData('links_background_color', e.target.value)}
                            />
                            <CustomSelect
                                label='Borda do botão'
                                name='links_button_border'
                                list={borders.map((border: string, key: number) => {
                                    return {
                                        value: key,
                                        label: border
                                    };
                                })}
                                value={data.links_button_border}
                                disabled={processing}
                                error={errors.links_button_border}
                                onChange={(e: any) => setData('links_button_border', e.target.value)}
                            />
                        </div>
                        <div className='grid lg:grid-cols-2 gap-5'>
                            <FloatInput
                                type='color'
                                label='Cor do botão'
                                name='links_button_color'
                                value={data.links_button_color}
                                disabled={processing}
                                error={errors.links_button_color}
                                onChange={(e) => setData('links_button_color', e.target.value)}
                            />
                            <FloatInput
                                type='color'
                                label='Cor do botão com mouse em cima'
                                name='links_button_hover_color'
                                value={data.links_button_hover_color}
                                disabled={processing}
                                error={errors.links_button_hover_color}
                                onChange={(e) => setData('links_button_hover_color', e.target.value)}
                            />
                            <FloatInput
                                type='color'
                                label='Cor do texto do botão'
                                name='links_button_font_color'
                                value={data.links_button_font_color}
                                disabled={processing}
                                error={errors.links_button_font_color}
                                onChange={(e) => setData('links_button_font_color', e.target.value)}
                            />
                            <FloatInput
                                type='color'
                                label='Cor do texto do botão com mouse em cima'
                                name='links_button_font_hover_color'
                                value={data.links_button_font_hover_color}
                                disabled={processing}
                                error={errors.links_button_font_hover_color}
                                onChange={(e) => setData('links_button_font_hover_color', e.target.value)}
                            />
                        </div>
                        <CustomTextArea
                            label='Descrição'
                            name='links_description'
                            value={data.links_description}
                            disabled={processing}
                            error={errors.links_description}
                            required={false}
                            onChange={(e: any) => setData('links_description', e.target.value)}
                        />
                        <FloatInput
                            type='color'
                            label='Cor da descrição'
                            name='links_description_color'
                            value={data.links_description_color}
                            disabled={processing}
                            error={errors.links_description_color}
                            onChange={(e) => setData('links_description_color', e.target.value)}
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