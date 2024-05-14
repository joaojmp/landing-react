import { FormEventHandler, useState } from "react";

import { Link, useForm } from "@inertiajs/react";
import { Button } from "@cms/Components/ui/button";
import { CustomLink } from "@/src/Links/Types/Link";
import { toast } from "@cms/Components/ui/use-toast";
import { FloatInput } from "@cms/Components/fields/FloatInput";
import CustomSelect from "@cms/Components/fields/CustomSelect";
import { CustomCheckbox } from "@cms/Components/fields/CustomCheckbox";
import { Card, CardContent, CardHeader } from "@cms/Components/ui/card";
import { CustomInputMask } from "@cms/Components/fields/CustomInputMask";
import { FaArrowLeft, FaCheck, FaSpinner, FaTimes } from "react-icons/fa";
import { Cropper, cropperOpen, ExternalCropperProps } from "@cms/Components/fields/Cropper";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@cms/Components/ui/alert-dialog";

export default function Update({ object, types, icons }: { object: CustomLink; types: string[]; icons: string[]; }) {
    const [cropper, setCropper] = useState<ExternalCropperProps>({ field: "", src: "", width: 1, height: 1 });
    const { data, setData, put, processing, errors, reset } = useForm({
        active: true,
        type: object.type,
        title: object.title,
        value: object.value,
        icon: object.icon,
        image: '',
        old_image: object.image,
    } as CustomLink);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('links.update', { 'id': object.id }), {
            onSuccess: () => {
                toast({
                    title: "Sucesso.",
                    description: "Link atualizado com sucesso!",
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
                        <h2 className="text-xl font-bold">Link cadastrado</h2>
                        <p className="text-sm">Modifique os campos a seguir e pressione <b>Salvar</b> para alterar os dados.</p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} encType="multipart/form-data" className='space-y-5'>
                            {object.image && (
                                <Card className="mt-2 h-fit">
                                    <CardHeader className="pb-0">
                                        <div className="flex items-center justify-between">
                                            <b>Ícone customizado</b>
                                        </div>
                                    </CardHeader>
                                    <CardContent className='text-center'>
                                        <img src={`/storage/links/${object.image}`} alt="Ícone customizado" width={50} height={50} className="mt-4 mx-auto" /><br />
                                        <div className="text-center">
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive">
                                                        <FaTimes className="text-lg cursor-pointer me-1" /> Remover o ícone
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Essa ação não pode ser desfeita, isso excluirá permanentemente o ícone
                                                            e removerá os dados de nossos servidores.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => {
                                                                put(route('links.file', { id: object.id, file: 'image' }), {
                                                                    onSuccess: () => {
                                                                        toast({
                                                                            title: "Sucesso.",
                                                                            description: "ícone removido com sucesso!",
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
                            <CustomCheckbox
                                label='Ativo'
                                name='active'
                                disabled={processing}
                                error={errors.active}
                                checked={data.active}
                                required={false}
                                onChange={(e) => setData('active', e.target.checked)}
                            />
                            <div className="grid lg:grid-cols-5 gap-5">
                                <CustomSelect
                                    label='Tipo'
                                    name='type'
                                    list={types.map((type: string, key: number) => {
                                        return {
                                            value: key,
                                            label: type
                                        };
                                    })}
                                    value={data.type}
                                    disabled={processing}
                                    error={errors.type}
                                    autoFocus
                                    onChange={(e: any) => setData('type', e.target.value)}
                                />
                                <div className='md:col-span-2'>
                                    <FloatInput
                                        label='Título'
                                        name='title'
                                        value={data.title}
                                        disabled={processing}
                                        error={errors.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                    />
                                </div>
                                <div className='md:col-span-2'>
                                    {(Number(data.type) === 0 || Number(data.type) === 1) && (
                                        <FloatInput
                                            label='Link'
                                            name='url'
                                            value={data.value}
                                            disabled={processing}
                                            error={errors.value}
                                            onChange={(e) => setData('value', e.target.value)}
                                        />
                                    )}
                                    {Number(data.type) === 2 && (
                                        <FloatInput
                                            type='email'
                                            label='E-mail'
                                            name='url'
                                            value={data.value}
                                            disabled={processing}
                                            error={errors.value}
                                            onChange={(e) => setData('value', e.target.value)}
                                        />
                                    )}
                                    {Number(data.type) === 3 && (
                                        <CustomInputMask
                                            label='Telefone'
                                            mask='(99) 99999-9999'
                                            name='url'
                                            value={data.value}
                                            disabled={processing}
                                            error={errors.value}
                                            onChange={(e) => setData('value', e.target.value)}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5">
                                <CustomSelect
                                    label='Ícone'
                                    name='icon'
                                    list={icons.map((icon: string, key: number) => {
                                        return {
                                            value: key,
                                            label: icon
                                        };
                                    })}
                                    value={data.icon}
                                    disabled={processing}
                                    error={errors.icon}
                                    required={false}
                                    onChange={(e: any) => setData('icon', e.target.value)}
                                />
                                {!data.icon && (
                                    <>
                                        {data.image ? (
                                            <Card className="mt-2 h-fit">
                                                <CardHeader className="pb-0">
                                                    <div className="flex items-center justify-between">
                                                        <b>Ícone customizado</b>
                                                        <FaTimes className="text-lg cursor-pointer" title="Remover ícone customizado" onClick={() => setData('image', '')} />
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <img src={data.image} alt="Ícone customizado" width={50} height={50} className="mt-4 mx-auto" />
                                                </CardContent>
                                            </Card>
                                        ) : (
                                            <FloatInput
                                                label='Ícone customizado'
                                                type='file'
                                                name='image'
                                                value={data.image}
                                                disabled={processing}
                                                error={errors.image}
                                                required={false}
                                                onChange={(e) => cropperOpen({ img: e, width: 50, height: 50, setCropper: setCropper })}
                                                description='Imagem com 50px X 50px de até 2MB.'
                                            />
                                        )}
                                    </>
                                )}
                            </div>
                            <div className="flex justify-between">
                                <small>* Campos obrigatórios</small>
                                <div className="flex items-center space-x-3">
                                    <Button asChild type="button" variant="outline" className="flex items-center gap-1" disabled={processing}>
                                        <Link href={route('links.index')}>
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