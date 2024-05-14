import { FormEventHandler } from 'react';

import { FaSpinner } from 'react-icons/fa';
import GuestLayout from '@cms/Layouts/GuestLayout';
import { Button } from '@cms/Components/ui/button';
import CustomAlert from '@cms/Components/CustomAlert';
import { Head, Link, useForm } from '@inertiajs/react';
import { FloatInput } from '@cms/Components/fields/FloatInput';

export default function ForgotPassword({ success, error, status }: { success?: string, error?: string, status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('cms.password.email'));
    };

    return (
        <GuestLayout title="Restaurar senha.">
            <Head title="Esqueceu sua senha" />

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400 text-center">
                Esqueceu sua senha? Sem problemas. Basta nos informar seu endereço de e-mail e enviaremos um link de redefinição.
            </div>

            <CustomAlert type="success" message={success} />
            <CustomAlert type="error" message={error} />
            <CustomAlert type="status" message={status} />

            <form onSubmit={submit} className='space-y-5'>
                <FloatInput
                    label='E-mail'
                    type='email'
                    name='email'
                    value={data.email}
                    autoComplete="username"
                    disabled={processing}
                    error={errors.email}
                    autoFocus
                    onChange={(e) => setData('email', e.target.value)}
                />

                <div className="flex items-center justify-between mt-4">
                    <Link
                        href={route('cms.login')}
                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        Voltar
                    </Link>
                    <Button className="ms-4" disabled={processing}>
                        {processing && (
                            <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Recuperar senha
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
