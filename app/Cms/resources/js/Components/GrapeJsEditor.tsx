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
import { User } from '@/src/Users/Types/User';
import { FaArrowsAlt, FaPlus } from 'react-icons/fa';
import { Landing } from '@/src/Landings/Types/Landing';
// @ts-expect-error
import grapesjsUiSuggestClasses from '@silexlabs/grapesjs-ui-suggest-classes';

import 'grapick/dist/grapick.min.css';
import 'grapesjs/dist/css/grapes.min.css';
import { useDrag, useDrop } from 'react-dnd';

type GrapeJsEditorProps = {
    landing: Landing;
    user: User;
};

const GrapeJsEditor: React.FC<GrapeJsEditorProps> = ({ landing, user }) => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const [editor, setEditor] = useState<any>(null);
    const [pages, setPages] = useState<any[]>([]);

    useEffect(() => {
        let editorData = {
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
                (pluginEditor: any) =>
                    grapesjsBlocksBasic(pluginEditor, {
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
        } as any;

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

                    const pageId = landing.pages.filter((landingPage) => landingPage.name === page.getId());

                    if (pageId.length > 0) {
                        updatedPages.push({
                            id: pageId[0].id,
                            name: page.getId(),
                            html: html,
                            css: css,
                            js: js,
                        });
                    } else {
                        updatedPages.push({
                            name: page.getId(),
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

    const handleAddPage = () => {
        if (editor) {
            editor.Pages.add({
                id: `Página ${editor.Pages.getAll().length + 1}`,
                component: `<div>Página ${editor.Pages.getAll().length + 1}</div>`,
            });

            setPages([...editor.Pages.getAll()]);
        }
    };

    const handleRemovePage = (page: any) => {
        if (editor) {
            editor.Pages.remove(pages.filter((gpPage) => gpPage.id === page.name)[0]);
            setPages([...editor.Pages.getAll()]);
        }
    };

    const handleSelectPage = (page: any) => {
        if (editor) {
            editor.Pages.select(pages.filter((gpPage) => gpPage.id === page.name)[0]);
            setPages([...editor.Pages.getAll()]);
        }
    };

    const reorderItems = (draggedRowIndex: number, targetRowIndex: number) => {
        landing.pages.splice(targetRowIndex, 0, landing.pages.splice(draggedRowIndex, 1)[0] as any);

        axios.put(route('api.landings.pages.reorder'), {
            ids: landing.pages.map((item: any) => item.id),
        }, {
            headers: {
                'Authorization': `Bearer ${user.api_token}`,
            }
        });
    }

    return (
        <section className="bg-[#463a3c]">
            <div className="grid grid-cols-12">
                <div className="col-span-1 p-2">
                    <button
                        type="button"
                        className="flex items-center justify-center gap-1 text-sm border border-[#00000033] text-[#b9a5a6] p-1 rounded-md w-full transition-all hover:text-[#d97aa6] shadow-md mb-2"
                        onClick={handleAddPage}
                        title="Criar nova página"
                    >
                        <FaPlus className='w-3 h-3' /> Nova página
                    </button>
                    <div className="flex flex-col space-y-4">
                        {landing.pages.map((page, actualIndex) => {
                            const [, dropRef] = useDrop({
                                accept: 'grid',
                                drop: (draggedRow: any) => reorderItems(landing.pages.findIndex((item) => item.id === draggedRow.id), actualIndex),
                            });

                            const [{ isDragging }, dragRef] = useDrag({
                                collect: monitor => ({
                                    isDragging: monitor.isDragging(),
                                }),
                                item: () => landing.pages[actualIndex],
                                type: 'grid',
                            });

                            return (
                                <div
                                    key={actualIndex}
                                    ref={dropRef}
                                    style={{ opacity: isDragging ? 0.5 : 1 }}
                                    className="flex items-center justify-between gap-1 text-sm border border-[#00000033] overflow-hidden text-[#b9a5a6] p-1 rounded-md w-full transition-all hover:text-[#d97aa6] shadow-md cursor-pointer"
                                    onClick={() => handleSelectPage(page)}
                                    title={page.name}
                                >
                                    <span className='whitespace-nowrap w-[calc(100%-1.5rem)] overflow-hidden flex gap-1 items-center' ref={dragRef}>
                                        <FaArrowsAlt className="w-3 h-3 cursor-move" /> {page.name}
                                    </span>
                                    <FaX
                                        className='w-5 h-5 flex-none cursor-pointer border text-[#b9a5a6] border-[#00000033] rounded p-1 transition-all hover:bg-[#d97aa6] hover:text-[#463a3c]'
                                        onClick={() => handleRemovePage(page)}
                                        title={`Remover ${page.name}`}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="col-span-11">
                    <div className='!w-full' ref={editorRef}></div>
                </div>
            </div>
        </section>
    );
};

export default GrapeJsEditor;
