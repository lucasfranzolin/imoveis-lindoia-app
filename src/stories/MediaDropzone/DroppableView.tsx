import { memo } from 'react';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';

type Props = {
    children: React.ReactNode;
};

const DroppableView = ({ children }: Props) => {
    return (
        <Droppable droppableId="droppable">
            {(provided: DroppableProvided) => (
                <ul
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex flex-col space-y-4 max-h-80 overflow-y-auto overflow-x-hidden px-4 pb-4"
                >
                    {children}
                    {provided.placeholder}
                </ul>
            )}
        </Droppable>
    );
};

export default memo(DroppableView);
