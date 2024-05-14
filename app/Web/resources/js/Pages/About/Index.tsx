import { PageProps } from '@web/types';
import { Head } from '@inertiajs/react';
import Default from '@web/Layouts/Default';

export default function Index({ page }: PageProps) {
    return (
        <Default>
            {!page && (
                <Head>
                    <title>Sobre</title>
                    <meta name="description" content="" />
                </Head>
            )}

            <section>
                <div className="container">
                    <h1>Sobre nós</h1>
                    <hr className='my-5' />
                </div>
            </section>
        </Default>
    );
}
