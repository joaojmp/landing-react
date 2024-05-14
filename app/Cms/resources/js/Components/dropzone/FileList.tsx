import { type FC, useCallback, useState } from 'react';

import axios from 'axios';
import update from 'immutability-helper';

import { User } from '@/src/Users/Types/User';

import { Card } from './Card';

export const FileList: FC<{ user: User, images?: Array<any>; path: string; }> = ({ user, images, path }) => {
    if (images?.length === 0) {
        return null;
    }

    const [cards, setCards] = useState(images ?? []);

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        setCards((prevCards: any[]) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex] as any],
                ],
            }),
        )
    }, []);

    const renderCard = useCallback(
        (card: any, index: number) => {
            return (
                <Card
                    key={card.id}
                    index={index}
                    id={card.id}
                    image={card}
                    path={path}
                    user={user}
                    moveCard={moveCard}
                />
            )
        },
        [],
    );

    axios.put(route(`api.${path}.reorder`), cards.map((card: any) => card.id), {
        headers: {
            'Authorization': `Bearer ${user.api_token}`,
        }
    });

    return images && images?.length > 0 && (
        <>
            <hr className='mt-6 mb-4' />
            <h2 className="text-md font-bold">Imagens cadastradas:</h2>
            <ul className='mt-5 list-none ps-0 grid md:grid-cols-4 gap-5'>
                {cards.map((card, i) => renderCard(card, i))}
            </ul >
        </>
    );
}