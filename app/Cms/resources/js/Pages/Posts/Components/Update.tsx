import { FormEventHandler, useState } from "react";

import { User } from "@/src/Users/Types/User";
import { Post } from "@/src/Posts/Types/Post";
import { Link, useForm } from "@inertiajs/react";
import { Button } from "@cms/Components/ui/button";
import { Subject } from "@/src/Posts/Types/Subject";
import { toast } from "@cms/Components/ui/use-toast";
import DropZone from "@cms/Components/dropzone/Dropzone";
import CustomDate from "@cms/Components/fields/CustomDate";
import { FloatInput } from "@cms/Components/fields/FloatInput";
import CustomSelect from "@cms/Components/fields/CustomSelect";
import CustomTextArea from "@cms/Components/fields/CustomTextarea";
import { Card, CardContent, CardHeader } from "@cms/Components/ui/card";
import { FaArrowLeft, FaCheck, FaSpinner, FaTimes } from "react-icons/fa";
import { Cropper, cropperOpen, ExternalCropperProps } from "@cms/Components/fields/Cropper";

import Descriptions from "./Descriptions";

export default function Update({ user, object, subjects }: { user: User; object: Post; subjects: Subject[] }) {
    const [cropper, setCropper] = useState<ExternalCropperProps>({ field: "", src: "", width: 1, height: 1 });
    const { data, setData, put, processing, errors, reset } = useForm({
        title: object.title,
        short_description: object.short_description,
        source: object.source,
        image: '',
        old_image: object.image,
        date: object.date,
        subject_id: object.subject_id,
        descriptions: object.descriptions ?? [],
    } as Post);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('posts.update', { 'id': object.id }), {
            onSuccess: () => {
                toast({
                    title: "Sucesso.",
                    description: "Publicação atualizada com sucesso!",
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
                        <h2 className="text-xl font-bold">Publicação cadastrada</h2>
                        <p className="text-sm">Modifique os campos a seguir e pressione <b>Salvar</b> para alterar os dados.</p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} encType="multipart/form-data" className='space-y-5'>
                            {object.image && (
                                <div className="flex justify-center mb-10">
                                    <Card className="mt-2 h-fit">
                                        <CardHeader className="pb-0">
                                            <div className="flex items-center justify-between">
                                                <b>Imagem</b>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <img src={`/storage/posts/${object.image}`} alt={data.title} width={300} height={300} className="mt-4 mx-auto" />
                                        </CardContent>
                                    </Card>
                                </div>
                            )}
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
                                <div className="col-span-3">
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
                                        required={false}
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
                            <Descriptions data={data} processing={processing} errors={errors} setData={setData} object={object} />
                            <div className="flex justify-between">
                                <small>* Campos obrigatórios</small>
                                <div className='fixed bottom-12 right-12 p-3 bg-background border rounded-md'>
                                    <div className="flex items-center space-x-3">
                                        <Button asChild type="button" variant="outline" className="flex items-center gap-1" disabled={processing}>
                                            <Link href={route('posts.index')}>
                                                <FaArrowLeft /> Voltar
                                            </Link>
                                        </Button>
                                        <Button type="submit" className="flex items-center gap-1" disabled={processing}>
                                            {processing ? <FaSpinner className="mr-2 h-4 w-4 animate-spin" /> : <FaCheck />}
                                            Salvar
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </section>

            <div id="images-div">
                <DropZone user={user} path="posts.images" relationAttribute="post_id" relationId={object.id} images={object.images} />
            </div>
        </>
    );
};
