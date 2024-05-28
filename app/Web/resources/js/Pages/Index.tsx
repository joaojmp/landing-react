import { useEffect, useState } from "react";

import axios from "axios";

import { Head } from "@inertiajs/react";
import { Landing } from "@/src/Landings/Types/Landing";

import "../../sass/app.scss";

export default function Index({ landing }: { landing: Landing; }) {
    const [formData, setFormData] = useState({});

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (Object.keys(formData).length === 0) {
            return;
        }

        disableField(true);

        axios.post(route("api.leads.store"), {
            data: formData,
            landing_id: landing.id
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
            document.querySelector('form')?.insertAdjacentHTML('afterbegin', '<p id="success" class="text-success">Obrigado por nos contatar!</p>');

            setTimeout(() => {
                document.getElementById("success")?.remove();
            }, 2000);
        }).finally(() => {
            setFormData({});
            disableField(false);
            document.querySelector('form')?.reset();
        });
    };

    const disableField = (disabled: boolean) => {
        const form = document.querySelector('form');

        ["input", "textarea", "button"].forEach(tag => {
            form?.querySelectorAll(tag).forEach((element: any) => {
                element.disabled = disabled;
            });
        });
    };

    useEffect(() => {
        const form = document.querySelector('form');
        const inputs = form?.querySelectorAll('input');

        inputs?.forEach(input => {
            input.addEventListener('input', handleInputChange);
        });

        form?.addEventListener('submit', handleSubmit);

        return () => {
            inputs?.forEach(input => {
                input.removeEventListener('input', handleInputChange);
            });

            form?.removeEventListener('submit', handleSubmit);
        };
    }, [formData]);

    useEffect(() => {
        if (landing.js) {
            const script = document.createElement("script");
            script.textContent = landing.js;

            document.body.appendChild(script);
        }
    }, []);

    return (
        <>
            <Head>
                <title>{landing.title}</title>
                <meta name="description" content={landing.description} />
            </Head>

            <div dangerouslySetInnerHTML={{ __html: landing.html || "" }} />
        </>
    );
};
