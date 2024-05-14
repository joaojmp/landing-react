import { useEffect, useRef } from 'react';

import grapesjs from 'grapesjs';
import plugin from 'grapesjs-blocks-basic';

// @ts-expect-error
import pt from 'grapesjs/locale/pt';

import 'grapesjs/dist/css/grapes.min.css';

const GrapeJsEditor = () => {
    const editorRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const editor = grapesjs.init({
            container: editorRef.current!,
            fromElement: true,
            height: "100vh",
            width: "100vw",
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

        return () => {
            editor.destroy();
        };
    }, []);

    return <div ref={editorRef}></div>;
};

export default GrapeJsEditor;