import { PageProps } from "@web/types";
import { Head } from "@inertiajs/react";
import Default from "@web/Layouts/Default";
import { Policy } from "@/src/Policies/Types/Policy";
import PlateEditor from "@web/Components/PlateEditor";

export default function Index({ page, policy }: PageProps & { policy: Policy }) {
    return (
        <Default>
            {!page && (
                <Head>
                    <title>{policy.title}</title>
                    <meta name="description" content="" />
                </Head>
            )}

            <section>
                <div className="container">
                    <h1>{policy.title}</h1>
                    <hr className="my-5" />
                    <PlateEditor value={policy.description} />
                </div>
            </section>
        </Default>
    );
};
