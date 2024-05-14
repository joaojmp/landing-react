import { FormEventHandler, useState } from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";

import { cn } from "@web/lib/utils";
import { PageProps } from "@web/types";
import { IoSend } from "react-icons/io5";
import { useForm, usePage } from "@inertiajs/react";
import { FaSpinner, FaTimes, FaWhatsapp } from "react-icons/fa";

import CustomInput from "./CustomInput";
import CustomInputMask from "./CustomInputMask";

export default function Whatsapp({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void; }) {
    const { configs, policies } = usePage<PageProps>().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        origin: 'Whatsapp',
        name: '',
        email: '',
        phone: '',
        policy: false,
    });
    const [success, setSuccess] = useState<boolean>(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const numbers = configs.filter(config => config.name == "whatsapp_numbers")[0].content?.split(",") ?? [];

        var whatsWindow = numbers.length > 0 ? window.open() : null;

        post(route('web.leads.store'), {
            onSuccess: () => {
                reset();
                setSuccess(true);

                const randomNumber = Math.floor(Math.random() * (numbers?.length - 0 + 1) + 0);

                if (whatsWindow) {
                    const number = numbers[randomNumber].replace(/\D/g, '');

                    whatsWindow.location = `https://wa.me/${number}`;
                }

                setTimeout(() => {
                    setSuccess(false);
                    setOpen(false);
                }, 3000);
            }, onError: () => {
                setSuccess(false);
            }
        });
    };

    return (
        <>
            <div className={cn({
                "fixed right-8 bottom-20 bg-[#43A737] p-4 rounded-full text-4xl text-white z-50 cursor-pointer hover:scale-110 transition-all": true,
                "hidden": open
            })} onClick={() => setOpen(!open)}>
                <FaWhatsapp />
            </div>

            <div className={cn({
                "fixed right-8 bottom-8 bg-[#ece5dd] border-2 border-[#43A737] opacity-0 rounded-[0.7rem] space-y-4 overflow-hidden transition-all -z-50 min-w-[20rem]": true,
                "opacity-1 z-50": open
            })}>
                <div className="flex justify-between p-3 bg-[#43A737]">
                    <h1 className="text-lg font-bold text-white flex items-center gap-2">
                        <LazyLoadImage src="/images/whatsapp_icon.webp" placeholderSrc="/images/whatsapp_icon.blur.webp" className="h-8 rounded-full" width={32} height={32} alt={`Logo ${import.meta.env.VITE_APP_NAME}`} loading="lazy" />
                        {import.meta.env.VITE_APP_NAME}
                    </h1>
                    <FaTimes
                        className="text-xl text-red-500 cursor-pointer hover:text-red-600 transition-all"
                        onClick={() => setOpen(!open)}
                    />
                </div>
                <form onSubmit={submit} className="px-4 pb-4 space-y-4">
                    {errors && Object.values(errors).map((error: any) => (
                        <div className="text-red-500 my-2">{error}</div>
                    ))}

                    {success && (
                        <div className="bg-[#25d366] text-white p-5 my-5 rounded-[0.7rem]">
                            Mensagem enviada com sucesso!
                        </div>
                    )}

                    <CustomInput
                        label="Nome completo"
                        name="name"
                        id="whatsapp_name"
                        value={data.name}
                        disabled={processing}
                        onChange={(e) => setData('name', e.target.value)}
                    />

                    <CustomInput
                        type="email"
                        label="Digite seu Email"
                        name="email"
                        id="whatsapp_email"
                        value={data.email}
                        disabled={processing}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <CustomInputMask
                        label="Digite seu Telefone"
                        mask='+55 (99) 99999-9999'
                        name="phone"
                        id="whatsapp_phone"
                        value={data.phone}
                        disabled={processing}
                        onChange={(e) => setData('phone', e.target.value)}
                    />

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="policy"
                            id="whatsapp_policy"
                            checked={data.policy}
                            disabled={processing}
                            onChange={(e) => setData('policy', e.target.checked)}
                            required
                            className="w-[25px] h-[25px] accent-[#686868] rounded-[5px] cursor-pointer"
                        />
                        <label htmlFor="whatsapp_policy" className="text-[16px] text-[#686868] cursor-pointer">
                            Estou de acordo com a <a href={route("web.policy", policies[0].slug)} className="underline transition-all hover:text-secondary" target="_blank" rel="noopener noreferrer">{policies[0].title}</a>.
                        </label>
                    </div>

                    <button
                        type="submit"
                        className={cn({
                            "rounded-[0.5rem] py-2 px-3 ms-auto flex items-center justify-center gap-2 transition-all w-full": true,
                            "bg-[#43A737] border border-[#43A737] text-white": true,
                            "hover:bg-[#42843a]": true
                        })}
                        disabled={processing}
                    >
                        Iniciar conversa {processing ? <FaSpinner className="animate-spin" /> : <IoSend />}
                    </button>
                </form>
            </div>
        </>
    );
};
