import { ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED } from '@udecode/plate-media';
import { useEditorReadOnly } from '@udecode/plate-common';
import { ListStyleType } from '@udecode/plate-indent-list';
import { Icons, iconVariants } from '@cms/Components/Icons';
import { MARK_BG_COLOR, MARK_COLOR } from '@udecode/plate-font';
import { MARK_BOLD, MARK_CODE, MARK_ITALIC, MARK_STRIKETHROUGH, MARK_UNDERLINE } from '@udecode/plate-basic-marks';

import { ToolbarGroup } from './toolbar';
import { ModeDropdownMenu } from './mode-dropdown-menu';
import { MarkToolbarButton } from './mark-toolbar-button';
import { ColorDropdownMenu } from './color-dropdown-menu';
import { AlignDropdownMenu } from './align-dropdown-menu';
import { LinkToolbarButton } from './link-toolbar-button';
import { TableDropdownMenu } from './table-dropdown-menu';
import { EmojiDropdownMenu } from './emoji-dropdown-menu';
import { MediaToolbarButton } from './media-toolbar-button';
import { IndentToolbarButton } from './indent-toolbar-button';
import { OutdentToolbarButton } from './outdent-toolbar-button';
import { TurnIntoDropdownMenu } from './turn-into-dropdown-menu';
import { LineHeightDropdownMenu } from './line-height-dropdown-menu';
import { IndentListToolbarButton } from './indent-list-toolbar-button';

export function FixedToolbarButtons() {
  const readOnly = useEditorReadOnly();

  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex flex-wrap"
        style={{
          transform: 'translateX(calc(-1px))',
        }}
      >
        {!readOnly && (
          <>
            <ToolbarGroup noSeparator>
              <TurnIntoDropdownMenu />
            </ToolbarGroup>

            <ToolbarGroup>
              <MarkToolbarButton tooltip="Negrito (⌘+B)" nodeType={MARK_BOLD}>
                <Icons.bold />
              </MarkToolbarButton>

              <MarkToolbarButton tooltip="Itálico (⌘+I)" nodeType={MARK_ITALIC}>
                <Icons.italic />
              </MarkToolbarButton>

              <MarkToolbarButton tooltip="Sublinhado (⌘+U)" nodeType={MARK_UNDERLINE}>
                <Icons.underline />
              </MarkToolbarButton>

              <MarkToolbarButton tooltip="Riscado (⌘+⇧+M)" nodeType={MARK_STRIKETHROUGH}>
                <Icons.strikethrough />
              </MarkToolbarButton>

              <MarkToolbarButton tooltip="Código (⌘+E)" nodeType={MARK_CODE}>
                <Icons.code />
              </MarkToolbarButton>

              <ColorDropdownMenu nodeType={MARK_COLOR} tooltip="Cor do texto">
                <Icons.color className={iconVariants({ variant: 'toolbar' })} />
              </ColorDropdownMenu>

              <ColorDropdownMenu nodeType={MARK_BG_COLOR} tooltip="Cor de fundo do texto">
                <Icons.bg className={iconVariants({ variant: 'toolbar' })} />
              </ColorDropdownMenu>
            </ToolbarGroup>

            <ToolbarGroup>
              <AlignDropdownMenu />

              <LineHeightDropdownMenu />

              <IndentListToolbarButton nodeType={ListStyleType.Disc} />

              <IndentListToolbarButton nodeType={ListStyleType.Decimal} />

              <OutdentToolbarButton />

              <IndentToolbarButton />
            </ToolbarGroup>

            <ToolbarGroup>
              <LinkToolbarButton />

              <MediaToolbarButton nodeType={ELEMENT_IMAGE} />

              <MediaToolbarButton nodeType={ELEMENT_MEDIA_EMBED} />

              <TableDropdownMenu />

              <EmojiDropdownMenu />
            </ToolbarGroup>
          </>
        )}

        <div className="grow" />

        <ToolbarGroup noSeparator>
          <ModeDropdownMenu />
        </ToolbarGroup>
      </div>
    </div>
  );
}
