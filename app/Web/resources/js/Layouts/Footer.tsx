import { Dispatch, SetStateAction } from "react";

import { PageProps } from "@web/types";
import { Link, usePage } from "@inertiajs/react";
import { Policy } from "@/src/Policies/Types/Policy";

export default function Footer({ policyOpen, setPolicyOpen }: { policyOpen: boolean; setPolicyOpen: Dispatch<SetStateAction<boolean>>; }) {
    const { footer, configs } = usePage<PageProps>().props;

    return (
        <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © {new Date().getFullYear()} {import.meta.env.VITE_APP_NAME}™. Todos os direitos reservados.
                </span>
                <ul className="flex flex-wrap items-center space-x-5 mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <Link href={route("web.about")} className="hover:underline">Sobre</Link>
                    </li>
                    {footer.policies.map((policy: Policy) => (
                        <li key={policy.id}>
                            <Link href={route("web.policy", policy.slug)} className="hover:underline">{policy.title}</Link>
                        </li>
                    ))}
                    {Boolean(Number(configs.filter(config => config.name == "policy")[0].content)) && (
                        <li>
                            <Link href="#" className="hover:underline" onClick={(e) => { e.preventDefault(); setPolicyOpen(!policyOpen); }}>
                                Gerenciar políticas
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link href={route("web.contact")} className="hover:underline">Contato</Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
};
