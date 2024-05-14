import { useEffect } from "react";
import { Dispatch, SetStateAction } from "react";

import ReactGA from "react-ga4";

import { PageProps } from "@web/types";
import { FaTimes } from "react-icons/fa";
import { Link, usePage } from "@inertiajs/react";
import { Policy } from "@/src/Policies/Types/Policy";

const initializeGA = () => {
    ReactGA.initialize(import.meta.env.VITE_GA_ID);
    ReactGA.gtag("consent", "default", {
        ad_storage: "denied",
        analytics_storage: "denied",
        functionality_storage: "denied",
        personalization_storage: "denied",
        security_storage: "denied",
        wait_for_update: 2000,
    });
    ReactGA.gtag("set", "url_passthrough", true);
    ReactGA.gtag("set", "ads_data_redaction", true);
};

const updateConsentAndReload = ({ consent, setPolicyOpen }: { consent: string; setPolicyOpen: Dispatch<SetStateAction<boolean>>; }) => {
    if (window.localStorage) {
        window.localStorage.setItem("cookiesAccepted", consent);
    }

    setPolicyOpen(false);

    ReactGA.gtag("consent", "update", {
        ad_storage: consent,
        analytics_storage: consent,
        functionality_storage: consent,
        personalization_storage: consent,
        security_storage: consent,
    });

    location.reload();
};

const Policies = ({ policyOpen, setPolicyOpen }: { policyOpen: boolean; setPolicyOpen: Dispatch<SetStateAction<boolean>>; }) => {
    const { policies, configs } = usePage<PageProps>().props;

    useEffect(() => {
        initializeGA();
    }, []);

    const allowAll = () => {
        updateConsentAndReload({ consent: "granted", setPolicyOpen });
    };

    const denyAll = () => {
        updateConsentAndReload({ consent: "denied", setPolicyOpen });
    };

    const renderPolicyDialog = () => (
        <dialog
            open={policyOpen}
            className="fixed top-0 left-0 z-50 h-screen w-screen bg-black bg-opacity-50"
        >
            <div className="bg-white w-1/4 h-full">
                <div className="flex justify-between p-3 bg-blue-500">
                    <h1 className="text-lg font-bold text-white flex items-center gap-2">
                        <img src="/images/logo.webp" className="h-8 rounded-full" alt={`Logo ${import.meta.env.VITE_APP_NAME}`} />
                        {import.meta.env.VITE_APP_NAME}
                    </h1>
                    <FaTimes
                        className="text-xl text-red-500 cursor-pointer hover:text-red-600 transition-all"
                        onClick={() => setPolicyOpen(!policyOpen)}
                    />
                </div>
                <div className="p-5 space-y-6">
                    <h2 className="text-xl font-bold">Centro de preferências de privacidade</h2>

                    <p className="text-sm font-bold">
                        Nos preocupamos com sua privacidade.
                    </p>

                    <p className="text-sm">
                        Quando você navega em um site, ele pode coletar informações ou armazenar em seu computador, geralmente
                        em forma de cookies. As informações coletadas/armazenadas podem ser sobre você, suas preferências ou
                        dispositivos, porém normalmente não o identificam diretamente, mas podem oferecer uma experiência web
                        mais personalizada.
                    </p>

                    <p className="text-sm">
                        Você pode definir suas preferências ou rejeitar os cookies (exceto os de funcionalidade), no entanto
                        rejeitando os cookies pode afetar na sua experiência de navegação no site.
                    </p>

                    <div className="flex items-center justify-evenly">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-all" onClick={allowAll}>
                            Aceitar todos
                        </button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-all" onClick={denyAll}>
                            Rejeitar todos
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    );

    const renderCookieNotification = () => (
        <div className="fixed right-32 bottom-8 z-50 bg-white border-2 border-black rounded-xl p-5 text-center">
            Ao usar nosso site, você reconhece que leu e entendeu nossa
            <div className="mt-4 mb-7">
                {policies.map((policy: Policy) => (
                    <span key={policy.id}>
                        <Link key={policy.id} href={`/politicas/${policy.slug}`} className="underline">{policy.title}</Link>
                        {policies.indexOf(policy) < policies.length - 1 ? " e nossa " : "."}
                    </span>
                ))}
            </div>
            <div className="flex items-center justify-center gap-5">
                {Boolean(Number(configs.filter(config => config.name == "policy")[0].content)) && (
                    <button className="border border-black px-4 py-2 rounded-xl" onClick={() => setPolicyOpen(!policyOpen)}>
                        Gerenciar políticas
                    </button>
                )}
                <button className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-all" onClick={allowAll}>
                    Aceitar todas
                </button>
            </div>
        </div>
    );

    return (
        <>
            {Boolean(Number(configs.filter((config) => config.name === "policy")[0].content)) && renderPolicyDialog()}

            {!window.localStorage.getItem("cookiesAccepted") && renderCookieNotification()}
        </>
    );
};

export default Policies;
