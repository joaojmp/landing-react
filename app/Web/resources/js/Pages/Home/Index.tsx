import { PageProps } from '@web/types';
import { Head } from '@inertiajs/react';
import Default from '@web/Layouts/Default';
import { Banner } from '@/src/Banners/Types/Banner';

import Banners from './Banners';

export default function Index({ page, banners }: PageProps & { banners: Banner[] }) {
    return (
        <Default>
            {!page && (
                <Head>
                    <title>Home</title>
                    <meta name="description" content="" />
                </Head>
            )}

            {banners.length > 0 && <Banners banners={banners} />}

            <section className='py-10'>
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-5">
                        <div className="border border-black rounded-md p-5">
                            <h1>Banner 1</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisi eu scelerisque aliquam, nunc nunc aliquet nisi, eu aliquet nisi nunc nunc.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisi eu scelerisque aliquam, nunc nunc aliquet nisi, eu aliquet nisi nunc nunc.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisi eu scelerisque aliquam, nunc nunc aliquet nisi, eu aliquet nisi nunc nunc.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisi eu scelerisque aliquam, nunc nunc aliquet nisi, eu aliquet nisi nunc nunc.</p>
                        </div>
                        <div className="border border-black rounded-md p-5">
                            <h2>Hello World</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisi eu scelerisque aliquam, nunc nunc aliquet nisi, eu aliquet nisi nunc nunc.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisi eu scelerisque aliquam, nunc nunc aliquet nisi, eu aliquet nisi nunc nunc.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisi eu scelerisque aliquam, nunc nunc aliquet nisi, eu aliquet nisi nunc nunc.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisi eu scelerisque aliquam, nunc nunc aliquet nisi, eu aliquet nisi nunc nunc.</p>
                        </div>
                    </div>
                </div>
            </section>
        </Default>
    );
}
