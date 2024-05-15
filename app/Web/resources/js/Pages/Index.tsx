import { Head } from "@inertiajs/react";
import { Landing } from "@/src/Landings/Types/Landing";

export default function Index({ landing }: { landing: Landing; }) {
    return (
        <>
            <Head>
                <title>{landing.title}</title>
            </Head>

            {landing.content}
        </>
    );
};
