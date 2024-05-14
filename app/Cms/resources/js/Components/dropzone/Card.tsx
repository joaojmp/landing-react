import { FC, useRef, useState } from "react";

import axios from "axios";
import { useDrag, useDrop } from "react-dnd";
import { Identifier, XYCoord } from "dnd-core";

import { router } from "@inertiajs/react";
import { User } from "@/src/Users/Types/User";
import { FaCheck, FaTimes } from "react-icons/fa";
import { AlertDialog } from "@radix-ui/react-alert-dialog";

import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { FloatInput } from "../fields/FloatInput";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

export interface CardProps {
    id: any;
    index: number;
    image: any;
    path: string;
    user: User;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
};

interface DragItem {
    index: number;
    id: string;
    type: string;
}

export const ItemTypes = {
    CARD: 'card',
}

export const Card: FC<CardProps> = ({ id, index, image, path, user, moveCard }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            moveCard(dragIndex, hoverIndex);

            item.index = hoverIndex;
        }
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return { id, index }
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    const [legend, setLegend] = useState<string>(image.legend ?? '');
    const [error, setError] = useState<string>('');

    const hadleLegendUpdate = async () => {
        if (!legend) {
            setError('A legenda não pode ser vazia.');
            return;
        }

        await axios.put(route(`api.${path}.update`, image.id), {
            legend: legend,
        }, {
            headers: {
                Authorization: `Bearer ${user.api_token}`,
                Accept: "application/json",
            },
        }).then(() => {
            setError('');
            toast({
                title: "Legenda atualizada com sucesso.",
                description: `A legenda da imagem ${legend} foi atualizada com sucesso.`,
            });
        });
    };

    const remove = async () => {
        await axios.delete(route(`api.${path}.destroy`, image.id), {
            headers: {
                'Authorization': `Bearer ${user.api_token}`,
            }
        }).then(() => {
            router.reload({
                onSuccess: () => {
                    toast({
                        title: "Sucesso.",
                        description: "Imagem removida com sucesso!",
                    });
                }
            });
        }).catch((error) => {
            toast({
                title: "Ah! algo deu errado.",
                description: error.response.data,
            });
        });
    };

    return (
        <div ref={ref} className="border rounded-md p-2 relative" style={{ opacity }} data-handler-id={handlerId}>
            <AlertDialog>
                <TooltipProvider>
                    <Tooltip>
                        <AlertDialogTrigger asChild>
                            <TooltipTrigger asChild>
                                <Button type='button' variant='link' className='absolute top-4 right-4 p-0 h-auto text-red-500 hover:text-red-800'>
                                    <FaTimes className='text-2xl' />
                                </Button>
                            </TooltipTrigger>
                        </AlertDialogTrigger>
                        <TooltipContent>
                            <p>Remover imagem</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Essa ação não pode ser desfeita, isso excluirá permanentemente a imagem
                            e removerá os dados de nossos servidores.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => remove()}>
                            Continuar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <img className='w-full rounded-md mb-4 object-cover' style={{ height: '200px' }} src={`/storage/${path.replace(".", "/")}/${image.name}`} alt={image.legend} width={200} height={200} />
            <div className='flex space-x-2'>
                <FloatInput
                    label='Legenda'
                    name='legend'
                    value={legend}
                    error={error}
                    onChange={(e) => setLegend(e.target.value)}
                />
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button type='button' onClick={() => hadleLegendUpdate()}>
                                <FaCheck />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            Atualizar legenda
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );
};