import { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import grapesjs from 'grapesjs';
// @ts-expect-error
import grapesjsTouch from 'grapesjs-touch';
import grapesjsnavbar from 'grapesjs-navbar';
import grapesjsStyleBg from 'grapesjs-style-bg';
import grapesjsCustomCode from 'grapesjs-custom-code';
import grapesjsBlocksBasic from 'grapesjs-blocks-basic';
import grapesjsPluginForms from 'grapesjs-plugin-forms';
import grapesjsStyleFilter from 'grapesjs-style-filter';
import grapesjsPresetWebpage from 'grapesjs-preset-webpage';
import grapesjsParserPostcss from 'grapesjs-parser-postcss';
import grapesjsTuiImageEditor from 'grapesjs-tui-image-editor';
import grapesjsComponentCountdown from 'grapesjs-component-countdown';

// @ts-expect-error
import pt from 'grapesjs/locale/pt';
import { FaX } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa';
import { User } from '@/src/Users/Types/User';
import { Landing } from '@/src/Landings/Types/Landing';
// @ts-expect-error
import grapesjsUiSuggestClasses from '@silexlabs/grapesjs-ui-suggest-classes';

import 'grapick/dist/grapick.min.css';
import 'grapesjs/dist/css/grapes.min.css';

type GrapeJsEditorProps = {
    landing: Landing;
    user: User;
};

const GrapeJsEditor: React.FC<GrapeJsEditorProps> = ({ landing, user }) => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const [editor, setEditor] = useState<any>(null);
    const [pages, setPages] = useState<any[]>([]);

    useEffect(() => {
        const editor = grapesjs.init({
            container: editorRef.current!,
            fromElement: true,
            height: '100vh',
            width: '100vw',
            storageManager: {
                type: 'remote',
            },
            i18n: {
                locale: 'pt',
                localeFallback: 'pt',
                messages: { pt: pt },
            },
            plugins: [
                grapesjsComponentCountdown,
                grapesjsUiSuggestClasses,
                grapesjsTuiImageEditor,
                grapesjsPresetWebpage,
                grapesjsParserPostcss,
                grapesjsStyleFilter,
                grapesjsPluginForms,
                grapesjsCustomCode,
                grapesjsStyleBg,
                grapesjsnavbar,
                grapesjsTouch,
                (editor) =>
                    grapesjsBlocksBasic(editor, {
                        category: 'Basico',
                        labelColumn1: '1 Coluna',
                        labelColumn2: '2 Colunas',
                        labelColumn3: '3 Colunas',
                        labelColumn37: '2 Colunas 3/7',
                        labelText: 'Texto',
                        labelImage: 'Imagem',
                        labelVideo: 'Vídeo',
                        labelMap: 'Mapa',
                    }),
            ],
            pluginsOpts: {
                'grapesjs-tui-image-editor': {
                    config: {
                        includeUI: {
                            initMenu: 'filter',
                        },
                    },
                },
            },
        });

        editor.StyleManager.addProperty('extra', { extend: 'filter' });
        editor.StyleManager.addProperty('extra', { extend: 'filter', property: 'backdrop-filter' });

        editor.Storage.add('remote', {
            async load() {
                const response = await axios.get(route('api.landings.show', landing.id), {
                    headers: {
                        Authorization: `Bearer ${user.api_token}`,
                    },
                });

                return JSON.parse(response.data.content);
            },

            async store(data) {
                // await axios.patch(route('api.pages.update', landing.id), {
                //     content: data,
                //     html: editor.getHtml(),
                //     css: editor.getCss(),
                //     js: editor.getJs(),
                //     landing_id: landing.id,
                // }, {
                //     headers: {
                //         Authorization: `Bearer ${user.api_token}`,
                //     },
                // });
            },
        });

        setEditor(editor);

        if (editor.Pages.getAll().length <= 0) {
            editor.Pages.add({
                id: `page-${Date.now()}`,
                styles: '.my-class { color: red }',
                component: '<div class="my-class">My element</div>',
            });
        }

        editor.on('pages:add', (page) => {
            setPages([...editor.Pages.getAll()]);
        });

        editor.on('pages:remove', (page) => {
            setPages([...editor.Pages.getAll()]);
        });

        editor.on('pages:select', () => {
            setPages([...editor.Pages.getAll()]);
        });

        setPages([...editor.Pages.getAll()]);

        return () => {
            editor.destroy();
        };
    }, [landing.id, user.api_token]);

    const handleAddPage = () => {
        if (editor) {
            editor.Pages.add({
                id: `page-${Date.now()}`,
                styles: '.my-class { color: red }',
                component: '<div class="my-class">My element</div>',
            });

            setPages([...editor.Pages.getAll()]);
        }
    };

    const handleRemovePage = (page: any) => {
        if (editor) {
            editor.Pages.remove(page);
            setPages([...editor.Pages.getAll()]);
        }
    };

    const handleSelectPage = (page: any) => {
        if (editor) {
            editor.Pages.select(page);
            setPages([...editor.Pages.getAll()]);
        }
    };

    return (
        <section className="bg-[#463a3c]">
            <div className="grid grid-cols-12">
                <div className="col-span-1 p-2">
                    <button
                        type="button"
                        className="flex items-center justify-center gap-1 text-sm border border-[#00000033] text-[#b9a5a6] p-1 rounded-md w-full transition-all hover:text-[#d97aa6] shadow-md mb-2"
                        onClick={handleAddPage}
                    >
                        <FaPlus /> Nova página
                    </button>
                    <div className="space-y-4">
                        {pages.map((page, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-1 border border-[#00000033] overflow-hidden text-[#b9a5a6] p-1 rounded-md w-full transition-all hover:text-[#d97aa6] shadow-md"
                                onClick={() => handleSelectPage(page)}
                            >
                                <FaX className='flex-none cursor-pointer' onClick={() => handleRemovePage(page)} />
                                {page.get('name') || page.id}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-11">
                    <div ref={editorRef}></div>
                </div>
            </div>
        </section>
    );
};

export default GrapeJsEditor;
