import { Droppable, Draggable } from "@hello-pangea/dnd";
import Card from "./Card";

export default function Column({ title, apps, onCardClick }: any) {
  return (
    <div className="min-w-[280px] bg-white rounded-2xl p-4 shadow-md border border-gray-200">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold text-gray-700">
          {title}
        </h2>

        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
          {apps.length}
        </span>
      </div>

      {/* Droppable */}
      <Droppable droppableId={title}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`space-y-3 min-h-[120px] p-2 rounded-lg transition
              ${
                snapshot.isDraggingOver
                  ? "bg-blue-50"
                  : "bg-gray-50"
              }`}
          >
            {apps.map((app: any, index: number) => (
              <Draggable
                key={app._id}
                draggableId={app._id}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`transition ${
                      snapshot.isDragging
                        ? "rotate-1 scale-105"
                        : ""
                    }`}
                  >
                    <Card app={app} onClick={onCardClick} />
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}