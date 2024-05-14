import { useState } from "react";

import { cn } from "@cms/lib/utils";
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from "react-icons/fa";

import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export default function CustomAlert({ type, message }: { type: string, message?: string }) {
    const [closed, setClosed] = useState<boolean>(false);
    const title = type === "success" ? "Sucesso" : type === "error" ? "Erro" : "Status";

    return message && !closed && (
        <div className="relative">
            <FaTimes className="absolute top-2 right-1.5 h-4 w-4 z-10 text-gray-600 dark:text-gray-400 cursor-pointer" onClick={() => setClosed(true)} />
            <Alert
                className={cn({
                    "mb-4 font-medium text-sm": true,
                    "border-green-600 text-green-600 dark:border-green-400 dark:text-green-400": type === "success",
                    "border-red-600 text-red-600 dark:border-red-400 dark:text-red-400": type === "error",
                    "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400": type === "status",
                })}
            >
                {type === "success" && <FaCheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />}
                {type === "error" && <FaExclamationTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />}
                {type === "status" && <FaInfoCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>
                    {message}
                </AlertDescription>
            </Alert>
        </div>
    );
};
