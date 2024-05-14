import { Link } from "@inertiajs/react";

export default function CustomPagination({ links }: { links: Array<any> }) {

    function getClassName(active: boolean) {
        if (active) {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary focus:text-primary bg-blue-700 text-white";
        } else {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary focus:text-primary";
        }
    }

    return links.length > 3 && (
        <div className="mb-4">
            <div className="flex flex-wrap justify-center mt-8">
                {links.map((link, key) => link.url === null ? (
                    <div key={key} className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded">
                        {link.label}
                    </div>
                ) : (
                    <Link key={key} href={link.url} className={getClassName(link.active)}>
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}