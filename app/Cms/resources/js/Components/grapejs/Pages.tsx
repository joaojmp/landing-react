import axios from "axios";
import { useDrag, useDrop } from "react-dnd";

import { FaX } from "react-icons/fa6";
import { User } from "@/src/Users/Types/User";
import { FaArrowsAlt, FaPlus } from "react-icons/fa";
import { Landing } from "@/src/Landings/Types/Landing";

const Pages = ({ editor, pages, setPages, landing, user, setOpen }: { editor: any; pages: any; setPages: any; landing: Landing; user: User; setOpen: any; }) => {
    const handleAddPage = () => {
        if (editor) {
            editor.Pages.add({
                id: `Página ${editor.Pages.getAll().length + 1}`,
                component: `<div>Página ${editor.Pages.getAll().length + 1}</div>`,
            });

            setPages([...editor.Pages.getAll()]);
        }
    };

    const handleRemovePage = (page: any) => {
        if (editor) {
            editor.Pages.remove(pages.filter((gpPage: any) => gpPage.id === page.title)[0]);
            setPages([...editor.Pages.getAll()]);
        }
    };

    const handleSelectPage = (page: any) => {
        if (editor) {
            editor.Pages.select(pages.filter((gpPage: any) => gpPage.id === page.title)[0]);
            setPages([...editor.Pages.getAll()]);
        }
    };

    const reorderItems = (draggedRowIndex: number, targetRowIndex: number) => {
        landing.pages.splice(targetRowIndex, 0, landing.pages.splice(draggedRowIndex, 1)[0] as any);

        axios.put(route('api.landings.pages.reorder'), {
            ids: landing.pages.map((item: any) => item.id),
        }, {
            headers: {
                'Authorization': `Bearer ${user.api_token}`,
            }
        });
    }

    return (
        <>
            <button
                type="button"
                className="flex items-center justify-center gap-1 text-sm border border-[#00000033] text-[#b9a5a6] p-1 rounded-md w-full transition-all hover:text-[#d97aa6] shadow-md mb-2"
                onClick={handleAddPage}
                title="Criar nova página"
            >
                <FaPlus className='w-3 h-3' /> Nova página
            </button>
            <div className="flex flex-col space-y-4">
                {landing.pages.length > 0 && landing.pages.map((page, actualIndex) => {
                    const [, dropRef] = useDrop({
                        accept: 'grid',
                        drop: (draggedRow: any) => reorderItems(landing.pages.findIndex((item) => item.id === draggedRow.id), actualIndex),
                    });

                    const [{ isDragging }, dragRef] = useDrag({
                        collect: monitor => ({
                            isDragging: monitor.isDragging(),
                        }),
                        item: () => landing.pages[actualIndex],
                        type: 'grid',
                    });

                    return (
                        <div
                            key={actualIndex}
                            ref={dropRef}
                            style={{ opacity: isDragging ? 0.5 : 1 }}
                            className="flex items-center justify-between gap-1 text-sm border border-[#00000033] overflow-hidden text-[#b9a5a6] p-1 rounded-md w-full transition-all hover:text-[#d97aa6] shadow-md cursor-pointer"
                            onClick={() => handleSelectPage(page)}
                            onDoubleClick={() => setOpen(!open)}
                            title={page.title}
                        >
                            <span className='whitespace-nowrap w-[calc(100%-1.5rem)] overflow-hidden flex gap-1 items-center' ref={dragRef}>
                                <FaArrowsAlt className="w-3 h-3 cursor-move" /> {page.title}
                            </span>
                            <FaX
                                className='w-5 h-5 flex-none cursor-pointer border text-[#b9a5a6] border-[#00000033] rounded p-1 transition-all hover:bg-[#d97aa6] hover:text-[#463a3c]'
                                onClick={() => handleRemovePage(page)}
                                title={`Remover ${page.title}`}
                            />
                        </div>
                    )
                })}
            </div>
        </>
    );
};

export default Pages;