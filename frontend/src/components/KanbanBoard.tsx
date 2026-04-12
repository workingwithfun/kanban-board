import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import API from "../api/axios";
export default function KanbanBoard() {
  const queryClient = useQueryClient();
  const [selectedApp, setSelectedApp] = useState<any>(null);

 const userId = localStorage.getItem("userId");

const { data: applications = [], isLoading } = useQuery({
  queryKey: ["applications", userId],
  queryFn: async () => {
    const res = await API.get("/applications", {
      params: { userId },
    });
    return res.data;
  },
  enabled: !!userId, // ✅ prevents 400 error
});
  // ✅ Group data dynamically (NO extra state needed)
  const groupedData = useMemo(() => {
    const grouped: any = {
      Applied: [],
      Interview: [],
      Offer: [],
      Rejected: [],
    };

    applications.forEach((app: any) => {
      if (grouped[app.status]) {
        grouped[app.status].push(app);
      }
    });

    return grouped;
  }, [applications]);

  // ✅ Drag handler


const onDragEnd = async (result: any) => {
  if (!result.destination) return;

  const { draggableId, destination } = result;
  const newStatus = destination.droppableId;

  const key = ["applications", userId];

  const previousData = queryClient.getQueryData(key);

  // optimistic update
  queryClient.setQueryData(key, (old: any = []) => {
    return old.map((app: any) =>
      app._id === draggableId
        ? { ...app, status: newStatus }
        : app
    );
  });

  try {
    await API.put(`/applications/${draggableId}`,
      {
        status: newStatus,
        userId,
      }
    );
  } catch (err) {
    queryClient.setQueryData(key, previousData);
  }
};

  if (isLoading) {
    return <p className="p-4 text-gray-500">Loading applications...</p>;
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {Object.entries(groupedData).map(([status, apps]: any) => (
            <Column
              key={status}
              title={status}
              apps={apps}
              onCardClick={setSelectedApp}
            />
          ))}
        </div>
      </DragDropContext>

      {/* ✅ Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[380px] shadow-lg">

            <h2 className="font-bold text-lg mb-2">
              {selectedApp.company}
            </h2>

            <p className="text-sm text-gray-600">
              {selectedApp.role}
            </p>

            <p className="text-xs text-gray-400 mb-4">
              {selectedApp.dateApplied}
            </p>

            <div className="flex justify-between items-center">
              <button
                onClick={() => setSelectedApp(null)}
                className="text-gray-500 hover:text-black"
              >
                Close
              </button>

              <button
                onClick={async () => {
                  await API.delete(`/applications/${selectedApp._id}`
                  );

                  queryClient.invalidateQueries({
                    queryKey: ["applications"],
                  });

                  setSelectedApp(null);
                }}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}