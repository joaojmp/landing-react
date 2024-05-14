import { ChangeEvent, useRef } from 'react';

import { CropperRef, FixedCropper, ImageRestriction, RectangleStencil } from 'react-advanced-cropper';

import { cn } from '@cms/lib/utils';
import { FaSave, FaTimes } from 'react-icons/fa';
import { CgEditFlipH, CgEditFlipV } from 'react-icons/cg';
import { FaRotateLeft, FaRotateRight } from 'react-icons/fa6';

import { Button } from '../ui/button';

import 'react-advanced-cropper/dist/style.css';

export type ExternalCropperProps = {
    field: string;
    src: string;
    width: number;
    height: number;
};

export function Cropper({
    field,
    src,
    width,
    height,
    setCropper,
    data,
    setData
}: {
    field: string;
    src: string;
    width: number;
    height: number;
    setCropper: (cropper: { field: string, src: string, width: number, height: number }) => void;
    data: any;
    setData: any;
}) {
    const cropperRef = useRef<CropperRef>(null);

    const defaultSize = ({ imageSize, visibleArea }: { imageSize: { width: number, height: number }, visibleArea: { width: number, height: number } }) => {
        return {
            width: (visibleArea || imageSize).width,
            height: (visibleArea || imageSize).height,
        }
    };

    const flip = (horizontal: boolean, vertical: boolean) => {
        if (cropperRef.current) {
            cropperRef.current.flipImage(horizontal, vertical);
        }
    };

    const rotate = (angle: number) => {
        if (cropperRef.current) {
            cropperRef.current.rotateImage(angle);
        }
    };

    const onCrop = () => {
        if (cropperRef.current) {
            setCropper({ field: "", src: "", width: 1, height: 1 });
            const newValue = cropperRef.current.getCanvas()?.toDataURL();

            if (field.includes("[")) {
                const fieldArray = field.split("[");
                const arrayName = fieldArray[0];
                const fieldIndex = fieldArray[1].replace("]", "");
                const fieldName = fieldArray[2].replace("]", "");

                const updatedData = { ...data };
                const updatedArray = updatedData?.[arrayName] ?? [];
                updatedData[arrayName] = updatedArray;
                updatedArray[fieldIndex] = { ...updatedArray[fieldIndex], [fieldName]: newValue };

                setData(arrayName, updatedArray);
            } else {
                setData(field, newValue);
            }
        }
    }

    return (
        <dialog open={src !== ""} className={cn({
            "fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center rounded-xl overflow-hidden": src !== "",
            "hidden": src === ""
        })}>
            <div className="flex flex-col items-center justify-center gap-2 w-screen h-screen bg-black">
                <FixedCropper
                    className="w-full h-full"
                    style={{
                        maxWidth: "90%",
                        maxHeight: "100%",
                    }}
                    ref={cropperRef as any}
                    src={src}
                    defaultSize={defaultSize as any}
                    stencilSize={{
                        width: width,
                        height: height
                    }}
                    stencilProps={{
                        resizable: false,
                        handlers: false,
                        movable: true,
                        lines: true,
                        grid: true,
                    }}
                    stencilComponent={RectangleStencil}
                    imageRestriction={ImageRestriction.stencil}
                />
                <div className="absolute z-10 left-4 flex flex-col gap-5">
                    <Button type="button" variant="secondary" title="Flip Horizontal" className="flex items-center gap-1" onClick={() => flip(true, false)}>
                        <CgEditFlipH />
                    </Button>
                    <Button type="button" variant="secondary" title="Flip Vertical" className="flex items-center gap-1" onClick={() => flip(false, true)}>
                        <CgEditFlipV />
                    </Button>
                    <Button type="button" variant="secondary" title="Rotate 90°" className="flex items-center gap-1" onClick={() => rotate(90)}>
                        <FaRotateRight />
                    </Button>
                    <Button type="button" variant="secondary" title="Rotate 90°" className="flex items-center gap-1" onClick={() => rotate(-90)}>
                        <FaRotateLeft />
                    </Button>
                </div>
                <div className="flex items-center justify-evenly gap-4 w-full mx-8 mt-4 mb-6">
                    <Button type="button" className="flex items-center gap-1" onClick={() => setCropper({ field: "", src: "", width: 1, height: 1 })}>
                        <FaTimes /> Cancelar
                    </Button>
                    <Button type="button" className="flex items-center gap-1" onClick={() => onCrop()}>
                        <FaSave /> Salvar
                    </Button>
                </div>
            </div>
        </dialog>
    )
};

export const cropperOpen = ({
    img,
    width,
    height,
    setCropper
}: {
    img: ChangeEvent<HTMLInputElement>,
    width: number,
    height: number,
    setCropper: (any: { field: any, src: any, width: any, height: any }) => void
}) => {
    const file = img.target.files && img.target.files[0];

    setCropper({ field: img.target.name, src: URL.createObjectURL(file as Blob | MediaSource), width: width, height: height });

    img.target.innerHTML = img.target.files?.[0].name as string;
    img.target.value = "";
};