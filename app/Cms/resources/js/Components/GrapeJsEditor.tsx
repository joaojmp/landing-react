import { useEffect, useRef } from 'react';

import axios from 'axios';
import grapesjs from 'grapesjs';
import plugin from 'grapesjs-blocks-basic';

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
                editor => plugin(editor, {
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
