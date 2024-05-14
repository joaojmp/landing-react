import { FormEventHandler, useState } from 'react';

import { useForm } from '@inertiajs/react';
import { Button } from '@cms/Components/ui/button';
import { Banner } from '@/src/Banners/Types/Banner';
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
        title: '',
        link: '',
        desktop: '',
        tablet: '',
        mobile: '',
    } as Banner);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('banners.store'), {
            onSuccess: () => {
                toast({
                    title: "Sucesso.",
                    description: "Banner criado com sucesso!",
                });
            }, onError: (errors) => {
                toast({
                    title: "Ah! algo deu errado.",
                    description: Object.values(errors).flat().join('\n'),
                });
            }, onFinish: () => {
                reset("desktop", "tablet", "mobile");
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
                                    <h1 className="text-xl font-bold">Cadastrar banner</h1>
                                    <FaChevronDown className={"transition-all " + (open && "rotate-180")} />
                                </div>
                            </CollapsibleTrigger>
                        </CardHeader>
                        <CollapsibleContent className="CollapsibleContent">
                            <CardContent className='pt-2'>
                                <form onSubmit={submit} encType="multipart/form-data" className='space-y-5'>
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <FloatInput
                                            label='Título'
                                            name='title'
                                            value={data.title}
                                            disabled={processing}
                                            error={errors.title}
                                            autoFocus
                                            onChange={(e) => setData('title', e.target.value)}
                                        />
                                        <FloatInput
                                            label='Link'
                                            name='url'
                                            value={data.link}
                                            disabled={processing}
                                            error={errors.link}
                                            required={false}
                                            onChange={(e) => setData('link', e.target.value)}
                                        />
                                    </div>
                                    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5">
                                        {data.desktop ? (
                                            <Card className="mt-2">
                                                <CardHeader className="pb-0">
                                                    <div className="flex items-center justify-between">
                                                        <b>Banner desktop</b>
                                                        <FaTimes className="text-lg cursor-pointer" title="Remover banner desktop" onClick={() => setData('desktop', '')} />
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <img src={data.desktop} alt="Banner desktop" width={1920} height={700} className="mt-4 mx-auto" />
                                                </CardContent>
                                            </Card>
                                        ) : (
                                            <FloatInput
                                                label='Banner desktop'
                                                type='file'
                                                name='desktop'
                                                value={data.desktop}
                                                disabled={processing}
                                                error={errors.desktop}
                                                onChange={(e) => cropperOpen({ img: e, width: 1920, height: 700, setCropper: setCropper })}
                                                description='Imagem com 1920px X 700px de até 2MB.'
                                            />
                                        )}
                                        {data.tablet ? (
                                            <Card className="mt-2">
                                                <CardHeader className="pb-0">
                                                    <div className="flex items-center justify-between">
                                                        <b>Banner tablet</b>
                                                        <FaTimes className="text-lg cursor-pointer" title="Remover banner tablet" onClick={() => setData('tablet', '')} />
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <img src={data.tablet} alt="Banner tablet" width={768} height={300} className="mt-4 mx-auto" />
                                                </CardContent>
                                            </Card>
                                        ) : (
                                            <FloatInput
                                                label='Banner tablet'
                                                type='file'
                                                name='tablet'
                                                value={data.tablet}
                                                disabled={processing}
                                                error={errors.tablet}
                                                required={false}
                                                onChange={(e) => cropperOpen({ img: e, width: 768, height: 300, setCropper: setCropper })}
                                                description='Imagem com 768px X 300px de até 2MB.'
                                            />
                                        )}
                                        {data.mobile ? (
                                            <Card className="mt-2">
                                                <CardHeader className="pb-0">
                                                    <div className="flex items-center justify-between">
                                                        <b>Banner mobile</b>
                                                        <FaTimes className="text-lg cursor-pointer" title="Remover banner mobile" onClick={() => setData('mobile', '')} />
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <img src={data.mobile} alt="Banner mobile" width={425} height={500} className="mt-4 mx-auto" />
                                                </CardContent>
                                            </Card>
                                        ) : (
                                            <FloatInput
                                                label='Banner mobile'
                                                type='file'
                                                name='mobile'
                                                value={data.mobile}
                                                disabled={processing}
                                                error={errors.mobile}
                                                required={false}
                                                onChange={(e) => cropperOpen({ img: e, width: 425, height: 500, setCropper: setCropper })}
                                                description='Imagem com 425px X 500px de até 2MB.'
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
