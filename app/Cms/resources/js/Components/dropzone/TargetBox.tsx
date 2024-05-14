import { type FC } from 'react';

import { useDrop } from 'react-dnd';
import { type DropTargetMonitor } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';

import { FaSpinner } from 'react-icons/fa';

export interface TargetBoxProps {
    onDrop: (item: { files: any[] }) => void;
    size: string;
    loading: boolean;
}

export const TargetBox: FC<TargetBoxProps> = (props) => {
    const { onDrop, size, loading } = props;

    const [{ canDrop, isOver }, drop] = useDrop(
        () => ({
            accept: [NativeTypes.FILE],
            drop(item: { files: any[] }) {
                if (onDrop) {
                    onDrop(item)
                }
            },
            canDrop() {
                return true
            },
            collect: (monitor: DropTargetMonitor) => {
                return {
                    isOver: monitor.isOver(),
                    canDrop: monitor.canDrop(),
                }
            },
        }),
        [props],
    );

    const isActive = canDrop && isOver;

    return (
        <div ref={drop} className='border border-dashed rounded-md flex flex-col items-center justify-center h-40'>
            {loading ? <FaSpinner className="animate-spin" /> : (
                <>
                    {isActive ? 'Solte para adicionar suas imagens.' : 'Arraste e solte suas imagens aqui.'}
                    <small className='block mt-3'>Imagem com no mínimo <b>{size}</b>.</small>
                </>
            )}
        </div>
    );
}