import { FormEventHandler } from "react";

import { Link, useForm } from "@inertiajs/react";
import { Button } from "@cms/Components/ui/button";
import { toast } from "@cms/Components/ui/use-toast";
import { Policy } from "@/src/Policies/Types/Policy";
import PlateEditor from "@cms/Components/fields/PlateEditor";
import { FloatInput } from "@cms/Components/fields/FloatInput";
import { FaArrowLeft, FaCheck, FaSpinner } from "react-icons/fa";
import { Card, CardContent, CardHeader } from "@cms/Components/ui/card";

export default function Update({ object }: { object: Policy }) {
    const { data, setData, put, processing, errors } = useForm(object);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('policies.update', { 'id': object.id }), {
            onSuccess: () => {
                toast({
                    title: "Sucesso.",
                    description: "Política atualizada com sucesso!",
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
                <CardHeader>
                    <h2 className="text-xl font-bold">Política cadastrada</h2>
                    <p className="text-sm">Modifique os campos a seguir e pressione <b>Salvar</b> para alterar os dados.</p>
                </CardHeader>
                <CardContent>
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
                        <PlateEditor
                            label='Descrição'
                            value={data.description}
                            disabled={processing}
                            error={errors.description}
                            onChange={(e: Array<any>) => setData('description', e)}
                        />
                        <div className="flex justify-between">
                            <small>* Campos obrigatórios</small>
                            <div className="flex items-center space-x-3">
                                <Button asChild type="button" variant="outline" className="flex items-center gap-1" disabled={processing}>
                                    <Link href={route('policies.index')}>
                                        <FaArrowLeft /> Voltar
                                    </Link>
                                </Button>
                                <Button type="submit" className="flex items-center gap-1" disabled={processing}>
                                    {processing ? <FaSpinner className="mr-2 h-4 w-4 animate-spin" /> : <FaCheck />}
                                    Salvar
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </section>
    );
};
