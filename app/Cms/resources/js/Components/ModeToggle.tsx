import { useEffect, useState } from "react";

import { FaCircle, FaMoon, FaSun } from 'react-icons/fa';

export default function ModeToggle() {
    const [theme, setTheme] = useState<string>(localStorage.theme ?? "dark");
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        document.body.classList.remove("light", "dark")
        document.body.classList.add(theme)
        setLoaded(true);
    }, [setLoaded]);

    function changeTheme() {
        const newTheme = theme == "dark" ? "light" : "dark";

        setTheme(newTheme);

        document.body.classList.remove("light", "dark")
        document.body.classList.add(newTheme)

        localStorage.setItem("theme", newTheme);
    }

    return (
        <button type="button" className="bg-secondary rounded-md p-2" onClick={changeTheme} title="Mudar tema">
            {loaded ? (theme == "dark" ? <FaSun /> : <FaMoon />) : <FaCircle />}
        </button >
    );
};
