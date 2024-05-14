import YouTube from 'react-youtube';

import { PageProps } from '@web/types';
import { Head } from '@inertiajs/react';
import Default from '@web/Layouts/Default';
import { Post } from '@/src/Posts/Types/Post';
import PlateEditor from '@web/Components/PlateEditor';

export default function Index({ page, post }: PageProps & { post: Post }) {
    return (
        <Default>
            {!page && (
                <Head>
                    <title>{post.title}</title>
                    <meta name="description" content={post.short_description} />
                </Head>
            )}

            <section>
                <div className="container">
                    <div className="grid md:grid-cols-4">
                        <div className="col-span-1"></div>
                        <div className="col-span-2">
                            <h1 className='text-xl text-center'>
                                {post.title}
                            </h1>
                            <hr className='my-5' />
                            {post.short_description && <p>{post.short_description}</p>}
                            <img src={`/storage/posts/${post.image}`} alt={post.title} className="w-full h-auto my-5 shadow shadow-black" />
                            {post.descriptions && (
                                <>
                                    <ul>
                                        {post.descriptions.map((description) => description.title && (
                                            <li key={description.id}>
                                                <u>{description.title}</u>
                                            </li>
                                        ))}
                                    </ul>
                                    {post.descriptions.map((description) => {
                                        const videoId = description.url?.split('v=')[1];

                                        const opts = {
                                            height: '390',
                                            width: '100%',
                                            playerVars: {
                                                autoplay: 0,
                                            },
                                        };

                                        return (
                                            <div key={description.id}>
                                                {description.title && (<h2>{description.title}</h2>)}
                                                {description.image && <img src={`/storage/posts/${description.image}`} alt={description.title} className="w-full h-auto my-5 shadow shadow-black" />}
                                                {description.url && <YouTube videoId={videoId} opts={opts} />}
                                                {description.text && <PlateEditor value={description.text} />}
                                            </div>
                                        )
                                    })}
                                </>
                            )}
                        </div>
                        <div className="col-span-1"></div>
                    </div>
                </div>
            </section>
        </Default>
    );
}
