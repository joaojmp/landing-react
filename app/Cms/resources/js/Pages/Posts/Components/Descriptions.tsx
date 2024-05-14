import { useState } from "react";

import { Post } from "@/src/Posts/Types/Post";
import { FaPlus, FaTimes } from "react-icons/fa";
import { Button } from "@cms/Components/ui/button";
import PlateEditor from "@cms/Components/fields/PlateEditor";
import { FloatInput } from "@cms/Components/fields/FloatInput";
import { Card, CardContent, CardHeader } from "@cms/Components/ui/card";
import { Cropper, cropperOpen, ExternalCropperProps } from "@cms/Components/fields/Cropper";
import { Link } from "@inertiajs/react";

export default function Descriptions({ data, processing, errors, setData, object }: { data: Post; processing: boolean; errors: any; setData: any; object?: Post; }) {
    const [cropper, setCropper] = useState<ExternalCropperProps>({ field: "", src: "", width: 1, height: 1 });

    return (
        <>
            <Cropper field={cropper.field} src={cropper.src} width={cropper.width} height={cropper.height} setCropper={setCropper} data={data} setData={setData} />

            <hr />
            <h2>Descrições:</h2>
            <div className="grid grid-cols-1 gap-5">
                {data?.descriptions && data?.descriptions.map((description, actualIndex) => (
                    <Card key={actualIndex}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                Descrição:
                                <FaTimes
                                    className="cursor-pointer hover:text-red-700 transition-all"
                                    onClick={() => setData("descriptions", data?.descriptions && data?.descriptions.filter((_, index) => index !== actualIndex))}
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            {object && object?.descriptions && object?.descriptions.filter((objectDescription) => objectDescription.id === description.id)[0] && object?.descriptions.filter((objectDescription) => objectDescription.id === description.id)[0].old_image && (
                                <div className="flex justify-center mb-10">
                                    <Card className="mt-2 h-fit">
                                        <CardHeader className="pb-0">
                                            <div className="flex items-center justify-between">
                                                <b>Imagem</b>
                                            </div>
                                        </CardHeader>
                                        <CardContent className='text-center'>
                                            <img src={`/storage/posts/${object.descriptions.filter((objectDescription) => objectDescription.id === description.id)[0].old_image}`} alt={data.title} width={300} height={300} className="mt-4 mx-auto" /><br />
                                            <Button variant="destructive" asChild>
                                                <Link href={route('posts.descriptions.file', { id: description.id, file: 'image' })} method="put" as="button" type="button">
                                                    <FaTimes className="text-lg cursor-pointer me-1" /> Remover imagem
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}
                            {description.image ? (
                                <Card className="mt-2">
                                    <CardHeader className="pb-0">
                                        <div className="flex items-center justify-between">
                                            <b>Imagem</b>
                                            <FaTimes className="text-lg cursor-pointer" title="Remover imagem" onClick={() => {
                                                const updatedDescriptions = data?.descriptions ?? [];
                                                updatedDescriptions[actualIndex] = { ...description, image: '' };
                                                setData("descriptions", updatedDescriptions);
                                            }} />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <img src={description.image} alt="Imagem" width={800} height={800} className="mt-4 mx-auto" />
                                    </CardContent>
                                </Card>
                            ) : (
                                <FloatInput
                                    label='Imagem'
                                    type='file'
                                    name={`descriptions[${actualIndex}][image]`}
                                    value={description.image}
                                    disabled={processing}
                                    error={errors.image}
                                    required={false}
                                    onChange={(e) => cropperOpen({ img: e, width: 800, height: 800, setCropper: setCropper })}
                                    description='Imagem com 800px X 800px de até 2MB.'
                                />
                            )}
                            <FloatInput
                                label='Título'
                                name={`descriptions[${actualIndex}][title]`}
                                value={description.title ?? ''}
                                disabled={processing}
                                error={errors.length > 0 && errors.description[actualIndex].title}
                                required={false}
                                onChange={(event) => {
                                    const newValue = event.target.value;
                                    const updatedDescriptions = data?.descriptions ?? [];
                                    updatedDescriptions[actualIndex] = { ...description, title: newValue };
                                    setData("descriptions", updatedDescriptions);
                                }}
                            />
                            <FloatInput
                                type='url'
                                label='Vídeo/Url'
                                name={`descriptions[${actualIndex}][url]`}
                                value={description.url ?? ''}
                                disabled={processing}
                                error={errors.length > 0 && errors.description[actualIndex].url}
                                required={false}
                                onChange={(event) => {
                                    const newValue = event.target.value;
                                    const updatedDescriptions = data?.descriptions ?? [];
                                    updatedDescriptions[actualIndex] = { ...description, url: newValue };
                                    setData("descriptions", updatedDescriptions);
                                }}
                            />
                            <PlateEditor
                                label='Descrição'
                                name={`descriptions[${actualIndex}][text]`}
                                value={description.text?.length ? description.text : [{
                                    id: '1',
                                    type: 'p',
                                    children: [{ text: '' }],
                                }]}
                                disabled={processing}
                                error={errors.text}
                                required={false}
                                onChange={(e: any) => {
                                    const updatedDescriptions = data?.descriptions ?? [];
                                    updatedDescriptions[actualIndex] = { ...description, text: e };
                                    setData("descriptions", updatedDescriptions);
                                }}
                            />
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Button
                type="button"
                className="flex items-center gap-2 m-auto"
                onClick={() => setData("descriptions", data?.descriptions ? [...data?.descriptions, {}] : {})}
            >
                <FaPlus /> Adicionar nova descrição
            </Button>
        </>
    );
};
