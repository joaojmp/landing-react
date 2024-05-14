import { FormEventHandler, useEffect } from 'react';

import { FaSpinner } from 'react-icons/fa';
import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@cms/Layouts/GuestLayout';
import { Button } from '@cms/Components/ui/button';
import { FloatInput } from '@cms/Components/fields/FloatInput';

export default function ResetPassword({ token, email }: { token: string, email: string }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('cms.password.store'));
    };

    return (
        <GuestLayout title="Resetar senha">
            <Head title="Resetar senha" />

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

                <FloatInput
                    label='Nova senha'
                    type='password'
                    name='password'
                    value={data.password}
                    autoComplete="new-password"
                    disabled={processing}
                    error={errors.password}
                    onChange={(e) => setData('password', e.target.value)}
                />

                <FloatInput
                    label='Confirmar nova senha'
                    type='password'
                    name='password_confirmation'
                    value={data.password_confirmation}
                    autoComplete="new-password"
                    disabled={processing}
                    error={errors.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                />

                <div className="flex items-center justify-end mt-4">
                    <Button className="ms-4" disabled={processing}>
                        {processing && (
                            <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Resetar senha
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
