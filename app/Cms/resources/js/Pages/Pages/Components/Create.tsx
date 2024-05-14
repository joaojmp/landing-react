import { FormEventHandler, useState } from 'react';

import { useForm } from '@inertiajs/react';
import { Page } from '@/src/Pages/Types/Page';
import { Button } from '@cms/Components/ui/button';
import { toast } from '@cms/Components/ui/use-toast';
import { FloatInput } from '@cms/Components/fields/FloatInput';
import CustomTextArea from '@cms/Components/fields/CustomTextarea';
import { Card, CardContent, CardHeader } from '@cms/Components/ui/card';
import { FaCheck, FaChevronDown, FaSpinner, FaTimes } from 'react-icons/fa';
import { Cropper, cropperOpen, ExternalCropperProps } from '@cms/Components/fields/Cropper';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@cms/Components/ui/collapsible';

export default function Create() {
    const [cropper, setCropper] = useState<ExternalCropperProps>({ field: "", src: "", width: 1, height: 1 });
    const [open, setOpen] = useState<boolean>(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        url: '',
        title: '',
        description: '',
        image: '',
    } as Page);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('pages.store'), {
            onSuccess: () => {
                toast({
                    title: "Sucesso.",
                    description: "Página criada com sucesso!",
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
                    <Collapsible open={open} onOpenChange={setOpen}>
                        <CardHeader>
                            <CollapsibleTrigger>
                                <div className="flex items-center justify-between">
                                    <h1 className="text-xl font-bold">Cadastrar página</h1>
                                    <FaChevronDown className={"transition-all " + (open && "rotate-180")} />
                                </div>
                            </CollapsibleTrigger>
                        </CardHeader>
                        <CollapsibleContent className="CollapsibleContent">
                            <CardContent className='pt-2'>
                                <form onSubmit={submit} encType="multipart/form-data" className='space-y-5'>
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
