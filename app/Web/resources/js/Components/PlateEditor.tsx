import { withProps } from '@udecode/cn';
import { createDndPlugin } from '@udecode/plate-dnd';
import { createEmojiPlugin } from '@udecode/plate-emoji';
import { createJuicePlugin } from '@udecode/plate-juice';
import { Editor } from '@cms/Components/plate-ui/editor';
import { createIndentPlugin } from '@udecode/plate-indent';
import { createNodeIdPlugin } from '@udecode/plate-node-id';
import { KbdLeaf } from '@cms/Components/plate-ui/kbd-leaf';
import { createCaptionPlugin } from '@udecode/plate-caption';
import { createAlignPlugin } from '@udecode/plate-alignment';
import { CodeLeaf } from '@cms/Components/plate-ui/code-leaf';
import { createKbdPlugin, MARK_KBD } from '@udecode/plate-kbd';
import { createTabbablePlugin } from '@udecode/plate-tabbable';
import { createComboboxPlugin } from '@udecode/plate-combobox';
import { HrElement } from '@cms/Components/plate-ui/hr-element';
import { createAutoformatPlugin } from '@udecode/plate-autoformat';
import { createIndentListPlugin } from '@udecode/plate-indent-list';
import { createLineHeightPlugin } from '@udecode/plate-line-height';
import { LinkElement } from '@cms/Components/plate-ui/link-element';
import { createLinkPlugin, ELEMENT_LINK } from '@udecode/plate-link';
import { createBlockSelectionPlugin } from '@udecode/plate-selection';
import { ImageElement } from '@cms/Components/plate-ui/image-element';
import { TableElement } from '@cms/Components/plate-ui/table-element';
import { HighlightLeaf } from '@cms/Components/plate-ui/highlight-leaf';
import { withPlaceholders } from '@cms/Components/plate-ui/placeholder';
import { EmojiCombobox } from '@cms/Components/plate-ui/emoji-combobox';
import { createDeserializeMdPlugin } from '@udecode/plate-serializer-md';
import { createTrailingBlockPlugin } from '@udecode/plate-trailing-block';
import { HeadingElement } from '@cms/Components/plate-ui/heading-element';
import { withDraggables } from '@cms/Components/plate-ui/with-draggables';
import { createDeserializeCsvPlugin } from '@udecode/plate-serializer-csv';
import { CodeSyntaxLeaf } from '@cms/Components/plate-ui/code-syntax-leaf';
import { createTodoListPlugin, ELEMENT_TODO_LI } from '@udecode/plate-list';
import { createDeserializeDocxPlugin } from '@udecode/plate-serializer-docx';
import { CodeLineElement } from '@cms/Components/plate-ui/code-line-element';
import { TableRowElement } from '@cms/Components/plate-ui/table-row-element';
import { TodoListElement } from '@cms/Components/plate-ui/todo-list-element';
import { ParagraphElement } from '@cms/Components/plate-ui/paragraph-element';
import { CodeBlockElement } from '@cms/Components/plate-ui/code-block-element';
import { BlockquoteElement } from '@cms/Components/plate-ui/blockquote-element';
import { createHighlightPlugin, MARK_HIGHLIGHT } from '@udecode/plate-highlight';
import { MediaEmbedElement } from '@cms/Components/plate-ui/media-embed-element';
import { createParagraphPlugin, ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { createExitBreakPlugin, createSoftBreakPlugin } from '@udecode/plate-break';
import { LinkFloatingToolbar } from '@cms/Components/plate-ui/link-floating-toolbar';
import { createBlockquotePlugin, ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import { createHorizontalRulePlugin, ELEMENT_HR } from '@udecode/plate-horizontal-rule';
import { createDeletePlugin, createSelectOnBackspacePlugin } from '@udecode/plate-select';
import { createPlugins, Plate, PlateLeaf, RenderAfterEditable } from '@udecode/plate-common';
import { TableCellElement, TableCellHeaderElement } from '@cms/Components/plate-ui/table-cell-element';
import { createTablePlugin, ELEMENT_TABLE, ELEMENT_TD, ELEMENT_TH, ELEMENT_TR } from '@udecode/plate-table';
import { createFontBackgroundColorPlugin, createFontColorPlugin, createFontSizePlugin } from '@udecode/plate-font';
import { createImagePlugin, createMediaEmbedPlugin, ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED } from '@udecode/plate-media';
import { createCodeBlockPlugin, ELEMENT_CODE_BLOCK, ELEMENT_CODE_LINE, ELEMENT_CODE_SYNTAX } from '@udecode/plate-code-block';
import { createHeadingPlugin, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6, KEYS_HEADING } from '@udecode/plate-heading';
import { createBoldPlugin, createCodePlugin, createItalicPlugin, createStrikethroughPlugin, createSubscriptPlugin, createSuperscriptPlugin, createUnderlinePlugin, MARK_BOLD, MARK_CODE, MARK_ITALIC, MARK_STRIKETHROUGH, MARK_SUBSCRIPT, MARK_SUPERSCRIPT, MARK_UNDERLINE } from '@udecode/plate-basic-marks';

const plugins = createPlugins(
    [
        createParagraphPlugin(),
        createHeadingPlugin(),
        createBlockquotePlugin(),
        createCodeBlockPlugin(),
        createHorizontalRulePlugin(),
        createLinkPlugin({
            renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
        }),
        createImagePlugin(),
        createMediaEmbedPlugin(),
        createCaptionPlugin({
            options: {
                pluginKeys: [
                    ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED
                ]
            },
        }),
        createTablePlugin(),
        createTodoListPlugin(),
        createBoldPlugin(),
        createItalicPlugin(),
        createUnderlinePlugin(),
        createStrikethroughPlugin(),
        createCodePlugin(),
        createSubscriptPlugin(),
        createSuperscriptPlugin(),
        createFontColorPlugin(),
        createFontBackgroundColorPlugin(),
        createFontSizePlugin(),
        createHighlightPlugin(),
        createKbdPlugin(),
        createAlignPlugin({
            inject: {
                props: {
                    validTypes: [
                        ELEMENT_PARAGRAPH, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3
                    ],
                },
            },
        }),
        createIndentPlugin({
            inject: {
                props: {
                    validTypes: [
                        ELEMENT_PARAGRAPH, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK
                    ],
                },
            },
        }),
        createIndentListPlugin({
            inject: {
                props: {
                    validTypes: [
                        ELEMENT_PARAGRAPH, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK
                    ],
                },
            },
        }),
        createLineHeightPlugin({
            inject: {
                props: {
                    defaultNodeValue: 1.5,
                    validNodeValues: [1, 1.2, 1.5, 2, 3],
                    validTypes: [
                        ELEMENT_PARAGRAPH, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3
                    ],
                },
            },
        }),
        createBlockSelectionPlugin({
            options: {
                sizes: {
                    top: 0,
                    bottom: 0,
                },
            },
        }),
        createDndPlugin({
            options: { enableScroller: true },
        }),
        createEmojiPlugin({
            renderAfterEditable: EmojiCombobox,
        }),
        createExitBreakPlugin({
            options: {
                rules: [
                    {
                        hotkey: 'mod+enter',
                    },
                    {
                        hotkey: 'mod+shift+enter',
                        before: true,
                    },
                    {
                        hotkey: 'enter',
                        query: {
                            start: true,
                            end: true,
                            allow: KEYS_HEADING,
                        },
                        relative: true,
                        level: 1,
                    },
                ],
            },
        }),
        createNodeIdPlugin(),
        createSelectOnBackspacePlugin({
            options: {
                query: {
                    allow: [
                        ELEMENT_IMAGE, ELEMENT_HR
                    ],
                },
            },
        }),
        createDeletePlugin(),
        createSoftBreakPlugin({
            options: {
                rules: [
                    { hotkey: 'shift+enter' },
                    {
                        hotkey: 'enter',
                        query: {
                            allow: [
                                ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD
                            ],
                        },
                    },
                ],
            },
        }),
        createTabbablePlugin(),
        createTrailingBlockPlugin({
            options: { type: ELEMENT_PARAGRAPH },
        }),
        createAutoformatPlugin({
            options: {
                rules: [
                    // Usage: https://platejs.org/docs/autoformat
                ],
                enableUndoOnDelete: true,
            },
        }),
        createComboboxPlugin(),
        createDeserializeDocxPlugin(),
        createDeserializeCsvPlugin(),
        createDeserializeMdPlugin(),
        createJuicePlugin(),
    ],
    {
        components: withDraggables(withPlaceholders({
            [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
            [ELEMENT_CODE_BLOCK]: CodeBlockElement,
            [ELEMENT_CODE_LINE]: CodeLineElement,
            [ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf,
            [ELEMENT_HR]: HrElement,
            [ELEMENT_IMAGE]: ImageElement,
            [ELEMENT_LINK]: LinkElement,
            [ELEMENT_H1]: withProps(HeadingElement, { variant: 'h1' }),
            [ELEMENT_H2]: withProps(HeadingElement, { variant: 'h2' }),
            [ELEMENT_H3]: withProps(HeadingElement, { variant: 'h3' }),
            [ELEMENT_H4]: withProps(HeadingElement, { variant: 'h4' }),
            [ELEMENT_H5]: withProps(HeadingElement, { variant: 'h5' }),
            [ELEMENT_H6]: withProps(HeadingElement, { variant: 'h6' }),
            [ELEMENT_MEDIA_EMBED]: MediaEmbedElement,
            [ELEMENT_PARAGRAPH]: ParagraphElement,
            [ELEMENT_TABLE]: TableElement,
            [ELEMENT_TR]: TableRowElement,
            [ELEMENT_TD]: TableCellElement,
            [ELEMENT_TH]: TableCellHeaderElement,
            [ELEMENT_TODO_LI]: TodoListElement,
            [MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
            [MARK_CODE]: CodeLeaf,
            [MARK_HIGHLIGHT]: HighlightLeaf,
            [MARK_ITALIC]: withProps(PlateLeaf, { as: 'em' }),
            [MARK_KBD]: KbdLeaf,
            [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: 's' }),
            [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: 'sub' }),
            [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: 'sup' }),
            [MARK_UNDERLINE]: withProps(PlateLeaf, { as: 'u' }),
        })),
    }
);

export default function PlateEditor({ value }: { value: Array<any> }) {
    return (
        <Plate plugins={plugins} initialValue={value} value={value}>
            <Editor value={value} readOnly className="p-0 border-0" />
        </Plate>
    );
};
