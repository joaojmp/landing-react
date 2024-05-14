import { FormEventHandler, useState } from 'react';

import { Post } from '@/src/Posts/Types/Post';
import { router, useForm } from '@inertiajs/react';
import { Button } from '@cms/Components/ui/button';
import { Subject } from '@/src/Posts/Types/Subject';
import { toast } from '@cms/Components/ui/use-toast';
import { getLocalISODateTime } from '@cms/lib/utils';
import CustomDate from '@cms/Components/fields/CustomDate';
import { FloatInput } from '@cms/Components/fields/FloatInput';
import CustomSelect from '@cms/Components/fields/CustomSelect';
import CustomTextArea from '@cms/Components/fields/CustomTextarea';
import { Card, CardContent, CardHeader } from '@cms/Components/ui/card';
import { FaCheck, FaChevronDown, FaSpinner, FaTimes } from 'react-icons/fa';
import { Cropper, cropperOpen, ExternalCropperProps } from '@cms/Components/fields/Cropper';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@cms/Components/ui/collapsible';

import Descriptions from './Descriptions';

export default function Create({ subjects }: { subjects: Subject[] }) {
    const [cropper, setCropper] = useState<ExternalCropperProps>({ field: "", src: "", width: 1, height: 1 });
    const [open, setOpen] = useState<boolean>(false);
    const [aditional, setAditional] = useState<boolean>(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        short_description: '',
        source: '',
        image: '',
        date: getLocalISODateTime(),
        subject_id: '',
        descriptions: [],
    } as unknown as Post);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('posts.store'), {
            onSuccess: (post: any) => {
                if (aditional) {
                    router.visit(route('posts.edit', post.props.objects[0].id), {
                        onSuccess: () => {
                            toast({
                                title: "Sucesso.",
                                description: "Publicação criada com sucesso!",
                            });

                            setTimeout(() => {
                                document.getElementById("images-div")?.scrollIntoView({ behavior: 'smooth' });
                            }, 1000);
                        }
                    });
                } else {
                    toast({
                        title: "Sucesso.",
                        description: "Publicação criada com sucesso!",
                    });
                }
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
                                    <h1 className="text-xl font-bold">Cadastrar publicação</h1>
                                    <FaChevronDown className={"transition-all " + (open && "rotate-180")} />
                                </div>
                            </CollapsibleTrigger>
                        </CardHeader>
                        <CollapsibleContent className="CollapsibleContent">
                            <CardContent className='pt-2'>
                                <form onSubmit={submit} encType="multipart/form-data" className='space-y-5'>
                                    <div className="grid lg:grid-cols-4 xl:grid-cols-5 gap-5">
                                        <CustomSelect
                                            label='Assuntos'
                                            name='subject_id'
                                            list={subjects.map(subject => {
                                                return {
                                                    value: subject.id,
                                                    label: subject.title
                                                };
                                            })}
                                            value={data.subject_id}
                                            disabled={processing}
                                            error={errors.subject_id}
                                            onChange={(e: any) => setData('subject_id', e.target.value)}
                                        />
                                        <div className="md:col-span-2 xl:col-span-3">
                                            <FloatInput
                                                label='Título'
                                                name='title'
                                                value={data.title}
                                                disabled={processing}
                                                error={errors.title}
                                                onChange={(e) => setData('title', e.target.value)}
                                            />
                                        </div>
                                        <CustomDate
                                            label='Data de publicação'
                                            name='date'
                                            value={data.date}
                                            disabled={processing}
                                            error={errors.date}
                                            onChange={(e: any) => setData('date', e.target.value)}
                                        />
                                    </div>
                                    <CustomTextArea
                                        label='Breve descrição'
                                        name='short_description'
                                        value={data.short_description}
                                        disabled={processing}
                                        error={errors.short_description}
                                        required={false}
                                        onChange={(e: any) => setData('short_description', e.target.value)}
                                    />
                                    <div className="grid md:grid-cols-2 gap-5">
                                        {data.image ? (
                                            <Card className="mt-2">
                                                <CardHeader className="pb-0">
                                                    <div className="flex items-center justify-between">
                                                        <b>Imagem</b>
                                                        <FaTimes className="text-lg cursor-pointer" title="Remover imagem" onClick={() => setData('image', '')} />
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <img src={data.image} alt="Imagem" width={800} height={800} className="mt-4 mx-auto" />
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
                                                onChange={(e) => cropperOpen({ img: e, width: 800, height: 800, setCropper: setCropper })}
                                                description='Imagem com 800px X 800px de até 2MB.'
                                            />
                                        )}
                                        <FloatInput
                                            label='Fonte'
                                            name='source'
                                            value={data.source}
                                            disabled={processing}
                                            error={errors.source}
                                            required={false}
                                            onChange={(e) => setData('source', e.target.value)}
                                        />
                                    </div>
                                    <Descriptions data={data} processing={processing} errors={errors} setData={setData} />
                                    <div className="flex justify-between">
                                        <small>* Campos obrigatórios</small>
                                        <div className='flex gap-4'>
                                            <Button type="submit" className="flex items-center gap-1" disabled={processing}>
                                                {processing ? <FaSpinner className="mr-2 h-4 w-4 animate-spin" /> : <FaCheck />}
                                                Salvar
                                            </Button>
                                            <Button type="submit" className="flex items-center gap-1" disabled={processing} onClick={() => setAditional(true)}>
                                                {processing ? <FaSpinner className="mr-2 h-4 w-4 animate-spin" /> : <FaCheck />}
                                                Salvar e inserir imagens adicionais
                                            </Button>
                                        </div>
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
