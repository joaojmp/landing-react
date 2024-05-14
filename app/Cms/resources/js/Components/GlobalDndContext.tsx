import propTypes from 'prop-types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const GlobalDndContext = (props: any) => {
    return <DndProvider backend={HTML5Backend} key={Math.random()}>{props.children}</DndProvider>
}

GlobalDndContext.propTypes = { children: propTypes.node };

export default GlobalDndContext;