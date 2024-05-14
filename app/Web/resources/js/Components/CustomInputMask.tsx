import { InputHTMLAttributes } from "react";

import { cn } from "@web/lib/utils";
import ReactInputMask from "react-input-mask";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label: string;
    mask: string;
}

const CustomInputMask = ({ label, mask, ...props }: CustomInputProps) => {
    const required = props.required ?? true;

    return (
        <div className="relative">
            {props.type === "textarea" ? (
                <textarea
                    id={props.name}
                    required={required}
                    className={cn({
                        "w-full min-h-[3rem] pt-5 pb-[0.2rem] rounded-[0.5rem] text-sm appearance-none border-[#686868] text-[#686868] placeholder:text-sm placeholder:text-[#686868] disabled:opacity-50 peer": true,
                        "focus:border-primary focus:ring-primary": true,
                    })}
                    placeholder=' '
                    {...props}
                />
            ) : (
                <ReactInputMask
                    type="text"
                    id={props.name}
                    required={required}
                    mask={mask}
                    className={cn({
                        "w-full min-h-[3rem] pt-5 pb-[0.2rem] rounded-[0.5rem] text-sm appearance-none border-[#686868] text-[#686868] placeholder:text-sm placeholder:text-[#686868] disabled:opacity-50 peer": true,
                        "focus:border-primary focus:ring-primary": true,
                    })}
                    placeholder=' '
                    {...props}
                />
            )}
            <label htmlFor={props.id ?? props.name} className={cn({
                "absolute top-[0.1rem] left-3 text-sm opacity-70 transition-all cursor-text peer-disabled:opacity-50": true,
                "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:opacity-100": props.type !== "textarea",
                "peer-focus:top-[0.1rem] peer-focus:-translate-y-0 peer-focus:text-sm peer-focus:opacity-70": true,
                "peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:opacity-100": props.type === "textarea",
            })}>
                {label} {required ? <span className="text-secondary">*</span> : <span className="text-[0.7rem]">(opcional)</span>}
            </label>
        </div>
    )
};

export default CustomInputMask;