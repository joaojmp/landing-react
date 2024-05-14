import React from 'react';
import { withRef } from '@udecode/cn';
import { useIndentButton } from '@udecode/plate-indent';

import { Icons } from '@cms/Components/Icons';

import { ToolbarButton } from './toolbar';

export const IndentToolbarButton = withRef<typeof ToolbarButton>(
  (rest, ref) => {
    const { props } = useIndentButton();

    return (
      <ToolbarButton ref={ref} tooltip="Avançar" {...props} {...rest}>
        <Icons.indent />
      </ToolbarButton>
    );
  }
);
