import { FormEventHandler } from "react";

import { FaX } from "react-icons/fa6";
import { useForm } from "@inertiajs/react";
import { cn, slugify } from "@cms/lib/utils";
import { Page } from "@/src/Landings/Types/Page";

import { toast } from "../ui/use-toast";
import { FloatInput } from "../fields/FloatInput";
import CustomTextArea from "../fields/CustomTextarea";

const PageConfig = ({ open, setOpen }: { open: boolean; setOpen: any; }) => {
    const { data, setData, put, processing, errors } = useForm({
        slug: '',
        title: '',
        description: '',
    } as unknown as Page);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('pages.update'), {
            onSuccess: () => {
                toast({
                    title: "Sucesso.",
                    description: "Landing criada com sucesso!",
                });
            }, onError: (errors) => {
                toast({
                    title: "Ah! algo deu errado.",
                    description: Object.values(errors).flat().join('\n'),
                });
            }
        });
    };

    const handleTitle = async (e: string) => {
        setData((prevData: Page) => ({
            ...prevData,
            title: e,
            slug: slugify(e)
        }));
    };

    return (
        <dialog
            className={cn({
                'absolute inset-0 z-50 w-full h-full bg-[#463a3c] bg-opacity-70 items-center justify-center hidden': true,
                'flex': open,
            })}
        >
            <div className='bg-[#463a3c] rounded-md py-2 px-3 border border-[#00000033] text-[#b9a5a6] space-y-3'>
                <div className="flex items-center justify-between gap-5">
                    <h3 className='font-bold text-2xl'>
                        Configurações da página
                    </h3>
                    <FaX
                        className='w-6 h-6 flex-none cursor-pointer border text-[#b9a5a6] border-[#00000033] rounded p-1 transition-all hover:bg-[#d97aa6] hover:text-[#463a3c]'
                        onClick={() => setOpen(!open)}
                    />
                </div>
                <div className='space-y-5'>
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
                </div>
            </div>
        </dialog>
    );
};

export default PageConfig;