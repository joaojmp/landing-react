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
// @ts-expect-error
import grapesjsUiSuggestClasses from '@silexlabs/grapesjs-ui-suggest-classes';

let editorConfig = {
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

export default editorConfig;