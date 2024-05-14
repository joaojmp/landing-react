import { FormEventHandler, useState } from "react";

import { Page } from "@/src/Pages/Types/Page";
import { Link, useForm } from "@inertiajs/react";
import { Button } from "@cms/Components/ui/button";
import { toast } from "@cms/Components/ui/use-toast";
import { FloatInput } from "@cms/Components/fields/FloatInput";
import CustomTextArea from "@cms/Components/fields/CustomTextarea";
import { Card, CardContent, CardHeader } from "@cms/Components/ui/card";
import { FaArrowLeft, FaCheck, FaSpinner, FaTimes } from "react-icons/fa";
import { Cropper, cropperOpen, ExternalCropperProps } from "@cms/Components/fields/Cropper";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@cms/Components/ui/alert-dialog";

export default function Update({ object }: { object: Page }) {
    const [cropper, setCropper] = useState<ExternalCropperProps>({ field: "", src: "", width: 1, height: 1 });
    const { data, setData, put, processing, errors, reset } = useForm({
        url: object.url,
        title: object.title,
        description: object.description,
        old_image: object.image,
        image: '',
    } as Page);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('pages.update', { 'id': object.id }), {
            onSuccess: () => {
                toast({
                    title: "Sucesso.",
                    description: "Página atualizada com sucesso!",
                });
            }, onError: (errors) => {
                toast({
                    title: "Ah! algo deu errado.",
                    description: Object.values(errors).flat().join('\n'),
                });
            }, onFinish: () => {
                reset("image");
            }
        });
    };

    return (
        <>
            <Cropper field={cropper.field} src={cropper.src} width={cropper.width} height={cropper.height} setCropper={setCropper} data={data} setData={setData} />

            <section>
                <Card>
                    <CardHeader>
                        <h2 className="text-xl font-bold">Página cadastrada</h2>
                        <p className="text-sm">Modifique os campos a seguir e pressione <b>Salvar</b> para alterar os dados.</p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} encType="multipart/form-data" className='space-y-5'>
                            {object.image && (
                                <Card className="mt-2 h-fit">
                                    <CardHeader className="pb-0">
                                        <div className="flex items-center justify-between">
                                            <b>Imagem</b>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <img src={`/storage/pages/${object.image}`} alt="Imagem" width={1200} height={630} className="mt-4 mx-auto w-full h-auto" /><br />
                                        <div className="text-center">
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive">
                                                        <FaTimes className="text-lg cursor-pointer me-1" /> Remover imagem
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Essa ação não pode ser desfeita, isso excluirá permanentemente a imagem
                                                            e removerá os dados de nossos servidores.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => {
                                                                put(route('pages.file', { id: object.id, file: 'image' }), {
                                                                    onSuccess: () => {
                                                                        toast({
                                                                            title: "Sucesso.",
                                                                            description: "Imagem removida com sucesso!",
                                                                        });
                                                                    }, onError: (errors) => {
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
                            <div className='grid md:grid-cols-2 gap-5'>
                                <FloatInput
                                    label='URL acionadora'
                                    name='url'
                                    value={data.url}
                                    disabled={processing}
                                    error={errors.url}
                                    autoFocus
                                    onChange={(e) => setData('url', e.target.value)}
                                    description='Link com https://.'
                                />
                                <FloatInput
                                    label='Título'
                                    name='title'
                                    value={data.title}
                                    disabled={processing}
                                    error={errors.title}
                                    required={false}
                                    onChange={(e) => setData('title', e.target.value)}
                                    minLength={50}
                                    maxLength={60}
                                    description='Título para página entre 50 e 60 caracteres.'
                                />
                            </div>
                            <CustomTextArea
                                label='Descrição'
                                name='description'
                                value={data.description}
                                disabled={processing}
                                error={errors.description}
                                required={false}
                                onChange={(e: any) => setData('description', e.target.value)}
                                minLength={50}
                                maxLength={160}
                                description='Descrição para página entre 50 e 160 caracteres.'
                            />
                            {data.image ? (
                                <Card className="mt-2">
                                    <CardHeader className="pb-0">
                                        <div className="flex items-center justify-between">
                                            <b>Imagem</b>
                                            <FaTimes className="text-lg cursor-pointer" title="Remover imagem" onClick={() => setData('image', '')} />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <img src={data.image} alt="Imagem" width={1200} height={630} className="mt-4 mx-auto" />
                                    </CardContent>
                                </Card>
                            ) : (
                                <FloatInput
                                    label='Imagem'
                                    type='file'
                                    name='image'
                                    value={data.image}
                                    disabled={processing}
                                    error={errors.image}
                                    required={false}
                                    onChange={(e) => cropperOpen({ img: e, width: 1200, height: 630, setCropper: setCropper })}
                                    description='Imagem com 1200px X 630px de até 2MB.'
                                />
                            )}
                            <div className="flex justify-between">
                                <small>* Campos obrigatórios</small>
                                <div className="flex items-center space-x-3">
                                    <Button asChild type="button" variant="outline" className="flex items-center gap-1" disabled={processing}>
                                        <Link href={route('pages.index')}>
                                            <FaArrowLeft /> Voltar
                                        </Link>
                                    </Button>
                                    <Button type="submit" className="flex items-center gap-1" disabled={processing}>
                                        {processing ? <FaSpinner className="mr-2 h-4 w-4 animate-spin" /> : <FaCheck />}
                                        Salvar
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </section >
        </>
    );
};
