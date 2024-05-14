import { FormEventHandler, useState } from 'react';

import { PageProps } from '@web/types';
import Default from '@web/Layouts/Default';
import { Head, useForm } from '@inertiajs/react';
import CustomInput from '@web/Components/CustomInput';
import { FaArrowRight, FaSpinner } from 'react-icons/fa';
import CustomInputMask from "@web/Components/CustomInputMask";

export default function Index({ page, policies }: PageProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        origin: 'Contato',
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        policy: false,
    });
    const [success, setSuccess] = useState<boolean>(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('web.leads.store'), {
            onSuccess: () => {
                reset();
                setSuccess(true);

                setTimeout(() => {
                    setSuccess(false);
                }, 3000);
            }, onError: () => {
                setSuccess(false);
            }
        });
    };

    return (
        <Default>
            {!page && (
                <Head>
                    <title>Contato</title>
                    <meta name="description" content="" />
                </Head>
            )}

            <section>
                <div className="container">
                    <h1>Contato</h1>
                    <hr className='my-5' />
                    <div className="grid md:grid-cols-4">
                        <div className="col-span-1"></div>
                        <div className='col-span-2'>
                            <p className='mb-4 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                            <form onSubmit={submit} className='space-y-5'>
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
                                    id="contact_name"
                                    value={data.name}
                                    disabled={processing}
                                    onChange={(e) => setData('name', e.target.value)}
                                />

                                <CustomInput
                                    type="email"
                                    label="Digite seu Email"
                                    name="email"
                                    id="contact_email"
                                    value={data.email}
                                    disabled={processing}
                                    onChange={(e) => setData('email', e.target.value)}
                                />

                                <CustomInputMask
                                    label="WhatsApp"
                                    mask='+55 (99) 99999-9999'
                                    name="phone"
                                    id="contact_phone"
                                    value={data.phone}
                                    disabled={processing}
                                    onChange={(e) => setData('phone', e.target.value)}
                                />

                                <CustomInput
                                    label="Assunto"
                                    name="subject"
                                    id="contact_subject"
                                    value={data.subject}
                                    disabled={processing}
                                    onChange={(e) => setData('subject', e.target.value)}
                                />

                                <CustomInput
                                    type="textarea"
                                    label="Mensagem"
                                    name="message"
                                    id="contact_message"
                                    value={data.message}
                                    disabled={processing}
                                    onChange={(e) => setData('message', e.target.value)}
                                />

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="policy"
                                        id="contact_policy"
                                        checked={data.policy}
                                        disabled={processing}
                                        onChange={(e) => setData('policy', e.target.checked)}
                                        required
                                        className="w-[25px] h-[25px] accent-primary rounded-[5px] cursor-pointer"
                                    />
                                    <label htmlFor="contact_policy" className="text-[16px] text-primary cursor-pointer">
                                        Estou de acordo com a <a href={route("web.policy", policies[0].slug)} className="underline transition-all hover:text-secondary" target="_blank" rel="noopener noreferrer">{policies[0].title}</a>.
                                    </label>
                                </div>

                                <button type='submit' className='bg-slate-700 text-white cursor-pointer flex items-center ms-auto gap-2 px-3 py-1' disabled={processing}>
                                    {processing ? <FaSpinner className="h-6 w-6 animate-spin" /> : <>Enviar mensagem <FaArrowRight /></>}
                                </button>
                            </form>
                        </div>
                        <div className="col-span-1"></div>
                    </div>
                </div>
            </section>
        </Default>
    );
}
