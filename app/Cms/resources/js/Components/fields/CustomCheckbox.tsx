import { forwardRef } from "react";

import { cn } from "@cms/lib/utils";
import { FaInfoCircle } from "react-icons/fa";

import { Label } from "../ui/label";
import InputError from "./InputError";
import { InputProps } from "../ui/input";

const CustomCheckbox = forwardRef<HTMLInputElement, InputProps & {
    label: string;
    error?: string;
    groupClass?: string;
    className?: string;
    description?: string
}>(({
    label,
    error,
    groupClass,
    className,
    description,
    ...props
}, ref) => {
    const required = props.required ?? true;

    return (
        <div className={cn({
            'w-full': true,
            groupClass: true
        })}>
            <div className="flex items-center space-x-2">
                <input
                    id={props.name}
                    required={required}
                    {...props}
                    type='checkbox'
                    className={className}
                    ref={ref}
                />
                <Label htmlFor={props.id ?? props.name} className="text-sm">
                    {label}  {required ? <span>*</span> : <span className="text-sm">(opcional)</span>}
                </Label>
            </div>
            {description && (
                <div className="flex items-center bg-primary py-1 px-2 rounded-md text-sm mt-4">
                    <FaInfoCircle className="me-1" /> {description}
                </div>
            )}
            <InputError message={error} className="mt-2" />
        </div>
    )
});

CustomCheckbox.displayName = "CustomCheckbox";

export { CustomCheckbox };
