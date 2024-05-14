import { ReactNode, useState } from "react";

import { PageProps } from "@web/types";
import GoTop from "@web/Components/GoTop";
import Whatsapp from "@web/Components/Whatsapp";
import Policies from "@web/Components/Policies";
import { Head, usePage } from "@inertiajs/react";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Default({ children }: { children: ReactNode }) {
    const { configs, page } = usePage<PageProps>().props;
    const [policyOpen, setPolicyOpen] = useState<boolean>(false);
    const [whatsappOpen, setWhatsappOpen] = useState<boolean>(false);

    const whatsappActive = configs.find(config => config.name === "whatsapp_active");
    const isWhatsappActive = whatsappActive && Number(whatsappActive.content) === 1;

    return (
        <>
            {page && (
                <Head>
                    {page.title && <title>{page.title}</title>}
                    {page.description && <meta name="description" content={page.description} />}
                </Head>
            )}

            {location.pathname === "/links" ? (
                <main>{children}</main>
            ) : (
                <>
                    <Navbar />

                    <main>{children}</main>

                    <Footer policyOpen={policyOpen} setPolicyOpen={setPolicyOpen} />

                    {isWhatsappActive && <Whatsapp open={whatsappOpen} setOpen={setWhatsappOpen} />}

                    <GoTop />

                    <Policies policyOpen={policyOpen} setPolicyOpen={setPolicyOpen} />
                </>
            )}
        </>
    );
};
