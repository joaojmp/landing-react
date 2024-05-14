import { FormEventHandler, useEffect } from 'react';

import { FaSpinner } from 'react-icons/fa';
import GuestLayout from '@cms/Layouts/GuestLayout';
import { Button } from '@cms/Components/ui/button';
import { toast } from '@cms/Components/ui/use-toast';
import CustomAlert from '@cms/Components/CustomAlert';
import { Head, Link, useForm } from '@inertiajs/react';
import { Checkbox } from '@cms/Components/ui/checkbox';
import { FloatInput } from '@cms/Components/fields/FloatInput';

export default function Login({ success, error, status }: { success?: string, error?: string, status?: string }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('cms.store'));

        toast({
            title: "Login efetuado!",
            description: "Seja bem vindo.",
        });
    };

    return (
        <GuestLayout title="Conecte-se com a sua conta.">
            <Head title="Login" />

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

                <FloatInput
                    label='Senha'
                    type='password'
                    name='password'
                    value={data.password}
                    autoComplete="current-password"
                    disabled={processing}
                    error={errors.password}
                    onChange={(e) => setData('password', e.target.value)}
                />

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="remember"
                        name="remember"
                        checked={data.remember}
                        disabled={processing}
                        onClick={() => setData('remember', !data.remember)}
                    />
                    <label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Lembre de mim
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('cms.password.request')}
                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        Esqueci minha senha
                    </Link>

                    <Button className="ms-4" disabled={processing}>
                        {processing && (
                            <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Acessar
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
