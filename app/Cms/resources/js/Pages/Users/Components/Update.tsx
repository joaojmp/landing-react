import { FormEventHandler, useState } from "react";

import { User } from "@/src/Users/Types/User";
import { Button } from "@cms/Components/ui/button";
import { toast } from "@cms/Components/ui/use-toast";
import { Link, router, useForm } from "@inertiajs/react";
import { FloatInput } from "@cms/Components/fields/FloatInput";
import { Card, CardContent, CardHeader } from "@cms/Components/ui/card";
import { FaArrowLeft, FaCheck, FaSpinner, FaTimes } from "react-icons/fa";
import { Cropper, cropperOpen, ExternalCropperProps } from "@cms/Components/fields/Cropper";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@cms/Components/ui/alert-dialog";

export default function Update({ object }: { object: User }) {
    const [cropper, setCropper] = useState<ExternalCropperProps>({ field: "", src: "", width: 1, height: 1 });
    const { data, setData, put, processing, errors, reset } = useForm({
        photo: '',
        old_photo: object.photo,
        name: object.name,
        email: object.email,
        password: '',
        password_confirmation: '',
    } as User);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('users.update', { 'id': object.id }), {
            onSuccess: () => {
                toast({
                    title: "Sucesso.",
                    description: "Usuário atualizado com sucesso!",
                });
            }, onError: (errors) => {
                toast({
                    title: "Ah! algo deu errado.",
                    description: Object.values(errors).flat().join('\n'),
                });
            }, onFinish: () => {
                reset("photo", "password", "password_confirmation");
            }
        });
    };

    return (
        <>
            <Cropper field={cropper.field} src={cropper.src} width={cropper.width} height={cropper.height} setCropper={setCropper} data={data} setData={setData} />

            <section>
                <Card>
                    <CardHeader>
                        <h2 className="text-xl font-bold">Usuário cadastrado</h2>
                        <p className="text-sm">Modifique os campos a seguir e pressione <b>Salvar</b> para alterar os dados.</p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} encType="multipart/form-data" className='space-y-5'>
                            {object.photo && (
                                <div className="flex justify-center pb-5">
                                    <Card className="mt-2 h-fit">
                                        <CardHeader className="pb-0">
                                            <div className="flex items-center justify-between">
                                                <b>Foto</b>
                                            </div>
                                        </CardHeader>
                                        <CardContent className='text-center'>
                                            <img src={`/storage/users/${object.photo}`} alt="Foto" width={300} height={300} className="mt-4 mx-auto" /><br />
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
                                                                    put(route('links.file', { id: object.id, file: 'icon' }), {
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
                                </div>
                            )}
                            <div className="grid md:grid-cols-2 gap-5">
                                <FloatInput
                                    label='Nome'
                                    name='name'
                                    value={data.name}
                                    disabled={processing}
                                    error={errors.name}
                                    autoFocus
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                <FloatInput
                                    label='Email'
                                    type='email'
                                    name='email'
                                    value={data.email}
                                    disabled={processing}
                                    error={errors.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                            </div>
                            <div className="grid md:grid-cols-2 gap-5">
                                <FloatInput
                                    label='Senha'
                                    type='password'
                                    name='password'
                                    value={data.password}
                                    disabled={processing}
                                    error={errors.password}
                                    required={false}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <FloatInput
                                    label='Confirme a senha'
                                    type='password'
                                    name='password_confirmation'
                                    value={data.password_confirmation}
                                    disabled={processing}
                                    error={errors.password_confirmation}
                                    required={false}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                />
                            </div>
                            <div className="grid md:grid-cols-2 gap-5">
                                {data.photo ? (
                                    <Card className="mt-2">
                                        <CardHeader className="pb-0">
                                            <div className="flex items-center justify-between">
                                                <b>Foto</b>
                                                <FaTimes className="text-lg cursor-pointer" title="Remover foto" onClick={() => setData('photo', '')} />
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <img src={data.photo} alt="Foto" width={800} height={800} className="mt-4 mx-auto" />
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <FloatInput
                                        label='Foto'
                                        type='file'
                                        name='photo'
                                        value={data.photo}
                                        disabled={processing}
                                        error={errors.photo}
                                        required={false}
                                        onChange={(e) => cropperOpen({ img: e, width: 800, height: 800, setCropper: setCropper })}
                                        description='Imagem com 800px X 800px de até 2MB.'
                                    />
                                )}
                            </div>
                            <div className="flex justify-between">
                                <small>* Campos obrigatórios</small>
                                <div className="flex items-center space-x-3">
                                    <Button asChild type="button" variant="outline" className="flex items-center gap-1" disabled={processing}>
                                        <Link href={route('users.index')}>
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