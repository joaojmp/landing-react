import { cn } from "@cms/lib/utils";
import { FaInfoCircle } from "react-icons/fa";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import InputError from "./InputError";

export default function CustomDate({
    label,
    error,
    groupClass,
    className,
    description,
    ...props
}: {
    label: string;
    error?: string;
    groupClass?: string;
    className?: string;
    description?: string;
    [x: string]: any;
}) {
    const required = props.required ?? true;

    return (
        <div className={cn({
            'w-full': true,
            groupClass: true
        })}>
            <div className="relative">
                <Input
                    id={props.name}
                    placeholder=" "
                    required={required}
                    {...props}
                    type="datetime-local"
                    className={cn({
                        'px-2.5 pb-2.5 pt-2 block border border-gray-300 dark:border-gray-600 text-sm text-gray-900 bg-background rounded-lg appearance-none dark:text-white peer w-full': true,
                        className: true
                    })}
                />
                <Label
                    htmlFor={props.name}
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white dark:bg-background px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                    {label}  {required ? <span>*</span> : <span className="text-sm">(opcional)</span>}
                </Label>

            </div>
            {description && (
                <div className="flex items-center bg-primary py-1 px-2 rounded-md text-sm mt-2">
                    <FaInfoCircle className="me-1" /> {description}
                </div>
            )}
            <InputError message={error} className="mt-2" />
        </div>
    )
};
