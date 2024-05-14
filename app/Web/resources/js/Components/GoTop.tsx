import { useEffect, useState } from "react";

import { cn } from "@web/lib/utils";
import { GoMoveToTop } from "react-icons/go";

export default function GoTop() {
    const [visible, setVisible] = useState<boolean>(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleScroll = () => {
        const isFixed = window.scrollY > 0;

        if (isFixed !== visible) {
            setVisible(isFixed);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [visible])

    return (
        <div className={cn({
            "fixed bottom-5 right-12 text-3xl cursor-pointer opacity-100 z-40 transition-all": true,
            "opacity-0 -z-50": !visible
        })} onClick={scrollToTop}>
            <GoMoveToTop className="animate-bounce" />
        </div>
    )
};
