import { useEffect, useRef } from 'react';

import axios from 'axios';
import grapesjs from 'grapesjs';
import grapesjsnavbar from 'grapesjs-navbar';
import grapesjsStyleBg from 'grapesjs-style-bg';
import grapesjsBlocksBasic from 'grapesjs-blocks-basic';
import grapesjsPluginForms from 'grapesjs-plugin-forms';
import grapesjsStyleFilter from 'grapesjs-style-filter';
import grapesjsPresetWebpage from 'grapesjs-preset-webpage';
import grapesjsStyleGradient from 'grapesjs-style-gradient';
import grapesjsBlocksFlexbox from 'grapesjs-blocks-flexbox';
import grapesjsPluginCkeditor from 'grapesjs-plugin-ckeditor';
import grapesjsTuiImageEditor from 'grapesjs-tui-image-editor';
import grapesjsComponentCountdown from 'grapesjs-component-countdown';

// @ts-expect-error
import pt from 'grapesjs/locale/pt';
import { User } from '@/src/Users/Types/User';
import { Landing } from '@/src/Landings/Types/Landing';

import 'grapesjs/dist/css/grapes.min.css';

const GrapeJsEditor = ({ landing, user }: { landing: Landing; user: User; }) => {
    const editorRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const editor = grapesjs.init({
            container: editorRef.current!,
            fromElement: true,
            height: "100vh",
            width: "100vw",
            storageManager: {
                type: 'remote',
            },
            i18n: {
                locale: 'pt',
                localeFallback: 'pt',
                messages: {
                    pt: pt
                }
            },
            plugins: [
                grapesjsComponentCountdown,
                grapesjsPluginCkeditor,
                grapesjsTuiImageEditor,
                grapesjsBlocksFlexbox,
                grapesjsStyleGradient,
                grapesjsPresetWebpage,
                grapesjsStyleFilter,
                grapesjsPluginForms,
                grapesjsStyleBg,
                grapesjsnavbar,
                editor => grapesjsBlocksBasic(editor, {
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
                }
            },
        });

        editor.Storage.add('remote', {
            async load() {
                const response = await axios.get(route('api.landings.show', landing.id), {
                    headers: {
                        'Authorization': `Bearer ${user.api_token}`,
                    }
                });

                return JSON.parse(response?.data?.content);
            },

            async store(data) {
                return await axios.patch(route('api.landings.update', landing.id), {
                    content: data,
                    html: editor.getHtml(),
                    css: editor.getCss(),
                    js: editor.getJs(),
                }, {
                    headers: {
                        'Authorization': `Bearer ${user.api_token}`,
                    }
                });
            },
        });

        return () => {
            editor.destroy();
        };
    }, []);

    return <div ref={editorRef}></div>;
};

export default GrapeJsEditor;
