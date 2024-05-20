import { FormEventHandler, useState } from "react";

import { slugify } from "@cms/lib/utils";
import { Link, useForm } from "@inertiajs/react";
import { Button } from "@cms/Components/ui/button";
import { toast } from "@cms/Components/ui/use-toast";
import { Landing } from "@/src/Landings/Types/Landing";
import ReactSelect from "@cms/Components/fields/ReactSelect";
import { FloatInput } from "@cms/Components/fields/FloatInput";
import CustomTextArea from "@cms/Components/fields/CustomTextarea";
import { Card, CardContent, CardHeader } from "@cms/Components/ui/card";
import { FaArrowLeft, FaCheck, FaSpinner, FaTimes } from "react-icons/fa";
import { Cropper, cropperOpen, ExternalCropperProps } from "@cms/Components/fields/Cropper";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../../Components/ui/alert-dialog";

export default function Update({ object }: { object: Landing }) {
    const [cropper, setCropper] = useState<ExternalCropperProps>({ field: "", src: "", width: 1, height: 1 });
    const { data, setData, put, processing, errors, reset } = useForm({
        slug: object.slug,
        title: object.title,
        description: object.description,
        image: object.image,
        favicon: object.favicon,
        emails: object.emails,
        script_head: object.script_head,
        script_body: object.script_body,
    } as Landing);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('landings.update', { 'id': object.id }), {
            onSuccess: () => {
                toast({
                    title: "Sucesso.",
                    description: "Landing atualizada com sucesso!",
                });
            }, onError: (errors) => {
                toast({
                    title: "Ah! algo deu errado.",
                    description: Object.values(errors).flat().join('\n'),
                });
            }, onFinish: () => {
                reset("image", "favicon");
            }
        });
    };

    const handleTitle = async (e: string) => {
        setData((prevData: Landing) => ({
            ...prevData,
            title: e,
            slug: slugify(e)
        }));
    };

    return (
        <>
            <Cropper field={cropper.field} src={cropper.src} width={cropper.width} height={cropper.height} setCropper={setCropper} data={data} setData={setData} />

            <section>
                <Card>
                    <CardHeader>
                        <h2 className="text-xl font-bold">Landing cadastrada</h2>
                        <p className="text-sm">Modifique os campos a seguir e pressione <b>Salvar</b> para alterar os dados.</p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} encType="multipart/form-data" className='space-y-5'>
                            <div className="grid md:grid-cols-2 gap-5">
                                <FloatInput
                                    label='Título da página'
                                    name='title'
                                    value={data.title}
                                    disabled={processing}
                                    error={errors.title}
                                    autoFocus
                                    onChange={(e) => handleTitle(e.target.value)}
                                />
                                <FloatInput
                                    label='Slug da página'
                                    name='slug'
                                    value={data.slug}
                                    disabled={processing}
                                    error={errors.slug}
                                    onChange={(e) => setData('slug', slugify(e.target.value))}
                                />
                            </div>
                            <CustomTextArea
                                label='Descrição da página'
                                name='description'
                                value={data.description}
                                disabled={processing}
                                error={errors.description}
                                required={false}
                                onChange={(e: any) => setData('description', e.target.value)}
                            />
                            <div className="grid md:grid-cols-2 gap-5">
                                {object.image && (
                                    <Card className="mt-2 h-fit">
                                        <CardHeader className="pb-0">
                                            <div className="flex items-center justify-between">
                                                <b>Imagem de compartilhamento</b>
                                            </div>
                                        </CardHeader>
                                        <CardContent className='text-center'>
                                            <img src={`/storage/landings/${object.image}`} alt="Imagem de compartilhamento" width={1200} height={630} className="mt-4 mx-auto w-full h-auto" /><br />
                                            <div className="text-center">
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="destructive">
                                                            <FaTimes className="text-lg cursor-pointer me-1" /> Remover imagem de compartilhamento
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Essa ação não pode ser desfeita, isso excluirá permanentemente a imagem de compartilhamento
                                                                e removerá os dados de nossos servidores.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => {
                                                                    put(route('landings.file', { id: object.id, file: 'image' }), {
                                                                        onSuccess: () => {
                                                                            toast({
                                                                                title: "Sucesso.",
                                                                                description: "Imagem de compartilhamento removida com sucesso!",
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
                                {data.image ? (
                                    <Card className="mt-2">
                                        <CardHeader className="pb-0">
                                            <div className="flex items-center justify-between">
                                                <b>Imagem de compartilhamento</b>
                                                <FaTimes className="text-lg cursor-pointer" title="Remover imagem de compartilhamento" onClick={() => setData('image', '')} />
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <img src={data.image} alt="Imagem de compartilhamento" width={1200} height={630} className="mt-4 mx-auto" />
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <FloatInput
                                        label='Imagem de compartilhamento'
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
                                {object.favicon && (
                                    <Card className="mt-2 h-fit">
                                        <CardHeader className="pb-0">
                                            <div className="flex items-center justify-between">
                                                <b>Ícone da página</b>
                                            </div>
                                        </CardHeader>
                                        <CardContent className='text-center'>
                                            <img src={`/storage/landings/${object.favicon}`} alt="Ícone da página" width={48} height={48} className="mt-4 mx-auto w-full h-auto" /><br />
                                            <div className="text-center">
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="destructive">
                                                            <FaTimes className="text-lg cursor-pointer me-1" /> Remover ícone da página
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Essa ação não pode ser desfeita, isso excluirá permanentemente o ícone da página
                                                                e removerá os dados de nossos servidores.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => {
                                                                    put(route('landings.file', { id: object.id, file: 'favicon' }), {
                                                                        onSuccess: () => {
                                                                            toast({
                                                                                title: "Sucesso.",
                                                                                description: "Ícone da página removido com sucesso!",
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
                                {data.favicon ? (
                                    <Card className="mt-2">
                                        <CardHeader className="pb-0">
                                            <div className="flex items-center justify-between">
                                                <b>Ícone da página</b>
                                                <FaTimes className="text-lg cursor-pointer" title="Remover ícone da página" onClick={() => setData('favicon', '')} />
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <img src={data.favicon} alt="Ícone da página" width={48} height={48} className="mt-4 mx-auto" />
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <FloatInput
                                        label='Ícone da página'
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
                            </div>
                            <ReactSelect
                                label='E-mail de contato'
                                name='emails'
                                list={[]}
                                value={data.emails}
                                disabled={processing}
                                error={errors.emails}
                                isMulti
                                required={false}
                                onChange={(e: any) => setData('emails', e.map((email: { value: string, label: string }) => email.value))}
                                description='E-mail de contato para envio de e-mails automáticos.'
                            />
                            <div className="grid md:grid-cols-2 gap-5">
                                <CustomTextArea
                                    label='Script tag head'
                                    name='script_head'
                                    value={data.script_head}
                                    disabled={processing}
                                    error={errors.script_head}
                                    required={false}
                                    onChange={(e: any) => setData('script_head', e.target.value)}
                                />
                                <CustomTextArea
                                    label='Script tag body'
                                    name='script_body'
                                    value={data.script_body}
                                    disabled={processing}
                                    error={errors.script_body}
                                    required={false}
                                    onChange={(e: any) => setData('script_body', e.target.value)}
                                />
                            </div>
                            <div className="flex justify-between">
                                <small>* Campos obrigatórios</small>
                                <div className="flex items-center space-x-3">
                                    <Button asChild type="button" variant="outline" className="flex items-center gap-1" disabled={processing}>
                                        <Link href={route('landings.index')}>
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
            </section>
        </>
    );
};
