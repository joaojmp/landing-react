import { FormEventHandler, useState } from 'react';

import { PageProps } from "@cms/types";
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@cms/Components/ui/button';
import { Config } from '@/src/Configs/Types/Config';
import { toast } from '@cms/Components/ui/use-toast';
import { FloatInput } from '@cms/Components/fields/FloatInput';
import { FaCheck, FaPlus, FaSpinner, FaTimes } from 'react-icons/fa';
import { Card, CardContent, CardHeader } from '@cms/Components/ui/card';
import { CustomInputMask } from '@cms/Components/fields/CustomInputMask';
import AuthenticatedLayout from '@cms/Layouts/Authenticated/AuthenticatedLayout';
import { Cropper, cropperOpen, ExternalCropperProps } from '@cms/Components/fields/Cropper';

export default function Whatsapp({ auth, configs }: PageProps & { configs: Config[] }) {
    const [cropper, setCropper] = useState<ExternalCropperProps>({ field: "", src: "", width: 1, height: 1 });
    const { data, setData, put, processing, errors, reset } = useForm({
        whatsapp_icon: '',
        whatsapp_active: configs.filter(config => config.name == "whatsapp_active")[0].content,
        whatsapp_numbers: configs.filter(config => config.name == "whatsapp_numbers")[0].content?.split(","),
    } as any);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('configs.whatsapp.update'), {
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
                reset("whatsapp_icon");
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Whatsapp" />

            <Cropper field={cropper.field} src={cropper.src} width={cropper.width} height={cropper.height} setCropper={setCropper} data={data} setData={setData} />

            <Card>
                <CardHeader>
                    <h2 className="text-xl font-bold">Whatsapp</h2>
                    <p className="text-sm">Modifique os campos a seguir e pressione <b>Salvar</b> para alterar os dados.</p>
                </CardHeader>
                <CardContent className='pt-2'>
                    <form onSubmit={submit} className='space-y-5'>
                        <div className="grid xl:grid-cols-2 gap-5">
                            <div>
                                {configs.filter(config => config.name == "whatsapp_icon")[0].content && (
                                    <Card className="mb-8 h-fit">
                                        <CardHeader className="pb-0">
                                            <div className="flex items-center justify-between">
                                                <b>Ícone</b>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <img src={`/images/${configs.filter(config => config.name == "whatsapp_icon")[0].content}?id=${Date.now()}`} alt="Ícone" width={48} height={48} className="mt-4 mx-auto" />
                                        </CardContent>
                                    </Card>
                                )}
                                {data.whatsapp_icon ? (
                                    <Card className="h-fit">
                                        <CardHeader className="pb-0">
                                            <div className="flex items-center justify-between">
                                                <b>Ícone</b>
                                                <FaTimes className="text-lg cursor-pointer" title="Remover ícone" onClick={() => setData('whatsapp_icon', '')} />
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <img src={data.whatsapp_icon} alt="Ícone" width={48} height={48} className="mt-4 mx-auto" />
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <FloatInput
                                        label='Ícone'
                                        type='file'
                                        name='whatsapp_icon'
                                        value={data.whatsapp_icon}
                                        disabled={processing}
                                        error={errors.whatsapp_icon}
                                        required={false}
                                        onChange={(e) => cropperOpen({ img: e, width: 48, height: 48, setCropper: setCropper })}
                                        description='Imagem com 48px X 48px de até 2MB.'
                                    />
                                )}
                            </div>
                        </div>
                        {data.whatsapp_numbers.length > 0 && (
                            <>
                                <hr />
                                <h2 className='font-bold'>
                                    Números cadastrados:
                                </h2>
                                <div className="grid xl:grid-cols-4 gap-5 mt-10">
                                    {data.whatsapp_numbers.map((number: string, index: number) => (
                                        <Card key={index}>
                                            <CardHeader>
                                                <div className="flex items-center justify-between gap-2">
                                                    <span>Número {index + 1}</span>
                                                    <FaTimes className="text-lg cursor-pointer" title="Remover número" onClick={() => setData("whatsapp_numbers", data.whatsapp_numbers.filter((_: string, i: number) => i !== index))} />
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <CustomInputMask
                                                    label='Número'
                                                    mask='+55 (99) 99999-9999'
                                                    type='text'
                                                    name={`whatsapp_numbers[${index}]`}
                                                    value={number}
                                                    disabled={processing}
                                                    error={errors.whatsapp_numbers}
                                                    required={false}
                                                    onChange={(e) => setData("whatsapp_numbers", data.whatsapp_numbers.map((n: string, i: number) => (i === index ? e.target.value : n)))}
                                                    description='Número com DDD.'
                                                />
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </>
                        )}
                        <div className="text-center">
                            <Button type='button' className='btn-primary mt-10' onClick={() => setData("whatsapp_numbers", [...data.whatsapp_numbers, ""])}>
                                <FaPlus className="mr-2" /> Adicionar novo número
                            </Button>
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
    );
};
