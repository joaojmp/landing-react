import React from 'react';
import { withRef } from '@udecode/cn';
import {
  ListStyleType,
  useIndentListToolbarButton,
  useIndentListToolbarButtonState,
} from '@udecode/plate-indent-list';

import { Icons } from '@cms/Components/Icons';

import { ToolbarButton } from './toolbar';

export const IndentListToolbarButton = withRef<
  typeof ToolbarButton,
  {
    nodeType?: ListStyleType;
  }
>(({ nodeType = ListStyleType.Disc }, ref) => {
  const state = useIndentListToolbarButtonState({ nodeType });
  const { props } = useIndentListToolbarButton(state);

  return (
    <ToolbarButton
      ref={ref}
      tooltip={
        nodeType === ListStyleType.Disc ? 'Lista com marcadores' : 'Lista Numerada'
      }
      {...props}
    >
      {nodeType === ListStyleType.Disc ? <Icons.ul /> : <Icons.ol />}
    </ToolbarButton>
  );
});
