import { FormEventHandler, useState } from 'react';

import { useForm } from '@inertiajs/react';
import { Button } from '@cms/Components/ui/button';
import { Subject } from '@/src/Posts/Types/Subject';
import { toast } from '@cms/Components/ui/use-toast';
import { FloatInput } from '@cms/Components/fields/FloatInput';
import { FaCheck, FaChevronDown, FaSpinner } from 'react-icons/fa';
import { Card, CardContent, CardHeader } from '@cms/Components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@cms/Components/ui/collapsible';

export default function Create() {
    const [open, setOpen] = useState<boolean>(false);
    const { data, setData, post, processing, errors } = useForm({
        title: '',
    } as Subject);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('subjects.store'), {
            onSuccess: () => {
                toast({
                    title: "Sucesso.",
                    description: "Assunto criado com sucesso!",
                });
            }, onError: (errors) => {
                toast({
                    title: "Ah! algo deu errado.",
                    description: Object.values(errors).flat().join('\n'),
                });
            }
        });
    };

    return (
        <section>
            <Card>
                <Collapsible open={open} onOpenChange={setOpen}>
                    <CardHeader>
                        <CollapsibleTrigger>
                            <div className="flex items-center justify-between">
                                <h1 className="text-xl font-bold">Cadastrar assunto</h1>
                                <FaChevronDown className={"transition-all " + (open && "rotate-180")} />
                            </div>
                        </CollapsibleTrigger>
                    </CardHeader>
                    <CollapsibleContent className="CollapsibleContent">
                        <CardContent className='pt-2'>
                            <form onSubmit={submit} className='space-y-5'>
                                <div className="grid md:grid-cols-2 gap-5">
                                    <FloatInput
                                        label='Título'
                                        name='title'
                                        value={data.title}
                                        disabled={processing}
                                        error={errors.title}
                                        autoFocus
                                        onChange={(e) => setData('title', e.target.value)}
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <small>* Campos obrigatórios</small>
                                    <Button type="submit" className="flex items-center gap-1" disabled={processing}>
                                        {processing ? <FaSpinner className="mr-2 h-4 w-4 animate-spin" /> : <FaCheck />}
                                        Salvar
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </CollapsibleContent>
                </Collapsible>
            </Card>
        </section>
    );
};
