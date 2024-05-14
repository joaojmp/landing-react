import Default from '@web/Layouts/Default';
import { Head, Link } from '@inertiajs/react';
import { Post } from '@/src/Posts/Types/Post';
import { PageProps, Pagination } from '@web/types';
import CustomPagination from '@web/Components/CustomPagination';

export default function Index({ page, posts }: PageProps & { posts: Pagination & { data: Post[] } }) {
    return (
        <Default>
            {!page && (
                <Head>
                    <title>Blog</title>
                    <meta name="description" content="" />
                </Head>
            )}

            <section>
                <div className="container">
                    <h1>Publicações</h1>
                    <hr className='my-5' />
                    {posts.data.length > 0 ? (
                        <>
                            <div className="grid md:grid-cols-3 gap-5">
                                {posts.data.map((post) => {
                                    const date = new Date(post.date);
                                    const year = date.getFullYear();
                                    const month = (date.getMonth() + 1).toString().padStart(2, "0");
                                    const day = date.getDate().toString().padStart(2, "0");
                                    const slug = `/blog/${year}/${month}/${day}/${post.slug}`;

                                    return (
                                        <Link href={slug} key={post.id}>
                                            <article className="bg-white border shadow">
                                                <img src={`/storage/posts/${post.image}`} alt={post.title} className="w-full h-56 object-cover" />
                                                <div className="p-4">
                                                    <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                                                    {post.short_description && <p className="text-gray-600">{post.short_description}</p>}
                                                </div>
                                            </article>
                                        </Link>
                                    )
                                })}
                            </div>

                            <CustomPagination links={posts.links} />
                        </>
                    ) : (
                        <div className="text-center">
                            <h1>Nenhuma postagem encontrada.</h1>
                        </div>
                    )}
                </div>
            </section>
        </Default>
    );
}
