import { useCallback, useState } from "react";

import axios from "axios";

import { router } from "@inertiajs/react";
import { User } from "@/src/Users/Types/User";

import { FileList } from "./FileList";
import { TargetBox } from "./TargetBox";
import { toast } from "../ui/use-toast";
import { Card, CardContent, CardHeader } from "../ui/card";

export default function DropZone({
    user,
    path,
    relationAttribute,
    relationId,
    size = "800x800",
    images
}: {
    user: User;
    path: string;
    relationAttribute: string;
    relationId: number;
    size?: string;
    images?: Array<any>;
}) {
    const [loading, setLoading] = useState<boolean>(false);

    const sendFiles = async ({ images }: { images: Array<any> }) => {
        if (images.length > 0) {
            const promises = Object.values(images).map(async (image) => {
                let data = new FormData();
                data.append("name", image);
                data.append(relationAttribute, relationId.toString());
                data.append("legend", image.name);

                let response = await axios.post(route(`api.${path}.store`), data, {
                    headers: {
                        Authorization: `Bearer ${user.api_token}`,
                        Accept: "application/json",
                    },
                });

                if (response.status === 422) {
                    toast({
                        title: "Ah! algo deu errado.",
                        description: `${image.name} não tem um formato válido.`,
                    });
                }

                return response;
            });

            await Promise.all(promises).then((images) => {
                router.reload({
                    onSuccess: () => {
                        toast({
                            title: "Sucesso!",
                            description: `${images.length} ${images.length > 1 ? 'imagens' : 'imagem'} adicionada${images.length > 1 ? 's' : ''}.`,
                        });
                    }
                });
            });
        }
    };

    const handleFileDrop = useCallback(
        (item: { files: any[] }) => {
            if (item) {
                setLoading(true);
                const images = item.files;

                sendFiles({ images });
            }
        },
        [sendFiles],
    );

    return (
        <section className="mt-7">
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-bold">Imagens relacionadas</h2>
                    <p className="text-sm">Adicione imagens adicionais ao cadastro.</p>
                </CardHeader>
                <CardContent>
                    <TargetBox onDrop={handleFileDrop} size={size} loading={loading} />
                    <FileList user={user} images={images} path={path} />
                </CardContent>
            </Card>
        </section>
    );
};