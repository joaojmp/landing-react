import { ReactNode } from 'react';

import ModeToggle from '@cms/Components/ModeToggle';

export default function Guest({ title, children }: { title: string, children: ReactNode }) {
    return (
        <div className="container relative grid h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="absolute right-4 top-4 md:right-8 md:top-8">
                <ModeToggle />
            </div>
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                <div className="absolute inset-0 bg-primary" />
                <div className="relative z-20 flex items-center justify-center h-full">
                    <img src="/images/logo.webp" alt={`Logo ${import.meta.env.VITE_APP_NAME}`} width={400} height={400} className="mx-auto rounded-md" loading="lazy" />
                </div>
            </div>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            CMS {import.meta.env.VITE_APP_NAME}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {title}
                        </p>
                    </div>
                    {children}
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        Desenvolvido por{" "}
                        <a href={`https://agenciakombi.com.br?utm_source=cms&utm_campaign=${import.meta.env.VITE_APP_NAME}`} target="_blank">
                            <u>Agência Kombi</u>
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
