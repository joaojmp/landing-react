import { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import grapesjs from 'grapesjs';

import { slugify } from '@cms/lib/utils';
import { User } from '@/src/Users/Types/User';
import { Landing } from '@/src/Landings/Types/Landing';

import Pages from './Pages';
import editorConfig from './Configs';
import PageConfig from './PageConfig';

import 'grapick/dist/grapick.min.css';
import 'grapesjs/dist/css/grapes.min.css';

type GrapeJsEditorProps = {
    landing: Landing;
    user: User;
};

const GrapeJsEditor: React.FC<GrapeJsEditorProps> = ({ landing, user }) => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [editor, setEditor] = useState<any>(null);
    const [pages, setPages] = useState<any[]>([]);

    useEffect(() => {
        let editorData = editorConfig;
        editorData.container = editorRef.current!;

        if (landing.pages.length <= 0) {
            editorData.pageManager = {
                pages: [
                    {
                        id: 'Página 1',
                        component: '<div>Página 1</div>',
                    },
                ]
            };
        } else {
            editorData.pageManager = {
                pages: JSON.parse(landing.content ?? "")?.pages
            };
        }

        const pageEditor = grapesjs.init(editorData);

        pageEditor.StyleManager.addProperty('extra', { extend: 'filter' });
        pageEditor.StyleManager.addProperty('extra', { extend: 'filter', property: 'backdrop-filter' });

        pageEditor.Storage.add('remote', {
            async load() {
                const response = await axios.get(route('api.landings.show', landing.id), {
                    headers: {
                        Authorization: `Bearer ${user.api_token}`,
                    },
                });

                return JSON.parse(response.data.content);
            },

            async store(data) {
                const allPages = pageEditor.Pages.getAll();
                let updatedPages = [] as any;

                allPages.map(async (page: any) => {
                    const component = page.getMainComponent();

                    const html = pageEditor.getHtml({ component });
                    const css = pageEditor.getCss({ component });
                    const js = pageEditor.getJs({ component });

                    const pageId = landing.pages.filter((landingPage) => landingPage.title === page.getId());

                    if (pageId.length > 0) {
                        updatedPages.push({
                            id: pageId[0].id,
                            title: page.getId(),
                            html: html,
                            css: css,
                            js: js,
                        });
                    } else {
                        updatedPages.push({
                            slug: slugify(page.getId()),
                            title: page.getId(),
                            html: html,
                            css: css,
                            js: js,
                        });
                    }
                });

                await axios.patch(route('api.landings.update', landing.id), {
                    content: data,
                    pages: updatedPages,
                }, {
                    headers: {
                        Authorization: `Bearer ${user.api_token}`,
                    },
                });
            },
        });

        setEditor(pageEditor);

        pageEditor.on('pages:add', (page) => {
            setPages([...pageEditor.Pages.getAll()]);
        });

        pageEditor.on('pages:remove', (page) => {
            setPages([...pageEditor.Pages.getAll()]);
        });

        pageEditor.on('pages:select', () => {
            setPages([...pageEditor.Pages.getAll()]);
        });

        setPages([...pageEditor.Pages.getAll()]);

        return () => {
            pageEditor.destroy();
        };
    }, [landing.id, user.api_token]);

    return (
        <>
            <section className="bg-[#463a3c]">
                <div className="grid grid-cols-12">
                    <div className="col-span-1 p-2">
                        <Pages editor={editor} pages={pages} setPages={setPages} landing={landing} user={user} setOpen={setOpen} />
                    </div>
                    <div className="col-span-11">
                        <div className='!w-full' ref={editorRef}></div>
                    </div>
                </div>
            </section>

            <PageConfig open={open} setOpen={setOpen} />
        </>
    );
};

export default GrapeJsEditor;
