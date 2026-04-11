import KanbanBoard from "../components/KanbanBoard";
import { useState } from "react";
import AddApplicationModal from "../components/AddApplicationModal";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">

      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center border-b">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Job Application Tracker
          </h1>
          <p className="text-sm text-gray-500">
            Track and manage your applications
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
          >
            + Add Application
          </button>

          <button
            onClick={handleLogout}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Board */}
      <div className="p-6">
        <KanbanBoard />
      </div>

      {open && <AddApplicationModal onClose={() => setOpen(false)} />}
    </div>
  );
}