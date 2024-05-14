import { FormEventHandler, useState } from 'react';

import { useForm } from '@inertiajs/react';
import { User } from '@/src/Users/Types/User';
import { Button } from '@cms/Components/ui/button';
import { toast } from '@cms/Components/ui/use-toast';
import { FloatInput } from '@cms/Components/fields/FloatInput';
import { Card, CardContent, CardHeader } from '@cms/Components/ui/card';
import { FaCheck, FaChevronDown, FaSpinner, FaTimes } from 'react-icons/fa';
import { Cropper, cropperOpen, ExternalCropperProps } from '@cms/Components/fields/Cropper';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@cms/Components/ui/collapsible';

export default function Create() {
    const [cropper, setCropper] = useState<ExternalCropperProps>({ field: "", src: "", width: 1, height: 1 });
    const [open, setOpen] = useState<boolean>(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        photo: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    } as User & { password_confirmation: string });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('users.store'), {
            onSuccess: () => {
                toast({
                    title: "Sucesso.",
                    description: "Usuário criado com sucesso!",
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
                    <Collapsible open={open} onOpenChange={setOpen}>
                        <CardHeader>
                            <CollapsibleTrigger>
                                <div className="flex items-center justify-between">
                                    <h1 className="text-xl font-bold">Cadastrar usuário</h1>
                                    <FaChevronDown className={"transition-all " + (open && "rotate-180")} />
                                </div>
                            </CollapsibleTrigger>
                        </CardHeader>
                        <CollapsibleContent className="CollapsibleContent">
                            <CardContent className='pt-2'>
                                <form onSubmit={submit} encType="multipart/form-data" className='space-y-5'>
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
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        <FloatInput
                                            label='Confirme a senha'
                                            type='password'
                                            name='password_confirmation'
                                            value={data.password_confirmation}
                                            disabled={processing}
                                            error={errors.password_confirmation}
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
                                        <Button type="submit" className="flex items-center gap-1" disabled={processing}>
                                            {processing ? <FaSpinner className="mr-2 h-4 w-4 animate-spin" /> : <FaCheck />}
                                            Salvar
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </CollapsibleContent>
                    </Collapsible>
                </Card>
            </section>
        </>
    );
};