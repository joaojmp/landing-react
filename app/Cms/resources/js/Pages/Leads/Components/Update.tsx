import { Link } from "@inertiajs/react";
import { FaArrowLeft } from "react-icons/fa";
import { Lead } from "@/src/Leads/Types/Lead";
import { Button } from "@cms/Components/ui/button";
import { Card, CardContent, CardHeader } from "@cms/Components/ui/card";

export default function Update({ object }: { object: Lead }) {
    return (
        <section>
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-bold">Lead cadastrado</h2>
                </CardHeader>
                <CardContent className="space-y-2">
                    {Object.keys(object.data)?.map((value: any, key: number) => (
                        <p>
                            <b>{value}:</b> {Object.values(object.data)[key]}
                        </p>
                    ))}
                    <div className="flex justify-end">
                        <div className="flex items-center space-x-3">
                            <Button asChild type="button" variant="outline" className="flex items-center gap-1">
                                <Link href={route('landings.index')}>
                                    <FaArrowLeft /> Voltar
                                </Link>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};
