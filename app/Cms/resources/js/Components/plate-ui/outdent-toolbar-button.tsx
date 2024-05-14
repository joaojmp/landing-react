import React from 'react';
import { withRef } from '@udecode/cn';
import { useOutdentButton } from '@udecode/plate-indent';

import { Icons } from '@cms/Components/Icons';

import { ToolbarButton } from './toolbar';

export const OutdentToolbarButton = withRef<typeof ToolbarButton>(
  (rest, ref) => {
    const { props } = useOutdentButton();

    return (
      <ToolbarButton ref={ref} tooltip="Recuar" {...props} {...rest}>
        <Icons.outdent />
      </ToolbarButton>
    );
  }
);
