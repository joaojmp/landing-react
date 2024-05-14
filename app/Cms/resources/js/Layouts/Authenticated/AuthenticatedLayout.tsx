import { PropsWithChildren, useState } from 'react';

import { cn } from '@cms/lib/utils';
import { User } from '@/src/Users/Types/User';
import { Toaster } from '@cms/Components/ui/toaster';

import Topbar from './Topbar';
import Sidebar from './Sidebar';

export type ExpandProps = {
    blocked: boolean;
    opened: boolean;
}

export default function Authenticated({ user, children }: PropsWithChildren<{ user: User }>) {
    const [expanded, setExpanded] = useState<ExpandProps>({
        blocked: window.innerWidth > 992,
        opened: window.innerWidth > 992,
    });

    return (
        <>
            <Sidebar expanded={expanded} setExpanded={setExpanded} user={user} />
            <div className="w-full">
                <Topbar expanded={expanded} setExpanded={setExpanded} user={user} />
                <div className={cn({
                    "transition-all px-7 pt-20 pb-7 w-[calc(100%_-_5rem)] ms-20": true,
                    "lg:w-[calc(100%_-_18rem)] lg:ms-72": expanded.opened,
                    "lg:w-[calc(100%_-_5rem)] lg:ms-20": !expanded.opened
                })}>
                    {children}
                    <Toaster />
                </div>
            </div>
        </>
    );
}
