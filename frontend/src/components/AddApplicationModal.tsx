import { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AddApplicationModal({ onClose }: any) {
  const [jd, setJd] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [parsedData, setParsedData] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loadingParse, setLoadingParse] = useState(false);

  const queryClient = useQueryClient();

  // -------------------------
  // MUTATION (SAVE APPLICATION)
  // -------------------------
  const mutation = useMutation({
    mutationFn: async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) throw new Error("User not logged in");
      if (!company.trim() || !role.trim())
        throw new Error("Company and role are required");

      return axios.post("http://localhost:5000/api/applications", {
        company: company.trim(),
        role: role.trim(),
        status: "Applied",
        dateApplied: new Date().toISOString().split("T")[0],
        jd,
        requiredSkills: parsedData?.requiredSkills ?? [],
        niceToHaveSkills: parsedData?.niceToHaveSkills ?? [],
        userId,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });

      // reset form
      setJd("");
      setCompany("");
      setRole("");
      setParsedData(null);
      setSuggestions([]);

      onClose();
    },

    onError: (err: any) => {
      console.error("Save error:", err);
      alert(err.message || "Failed to save application");
    },
  });

  // -------------------------
  // PARSE JD
  // -------------------------
  const handleParse = async () => {
    if (!jd.trim()) {
      alert("Please enter job description");
      return;
    }

    try {
      setLoadingParse(true);

      const res = await axios.post(
        "http://localhost:5000/api/ai/parse",
        { jd }
      );

      const { parsed, suggestions } = res.data;

      setParsedData(parsed || {});
      setSuggestions(suggestions || []);
      setCompany(parsed?.company || "");
      setRole(parsed?.role || "");
    } catch (err) {
      console.error(err);
      alert("Parsing failed");
    } finally {
      setLoadingParse(false);
    }
  };

  // -------------------------
  // SAVE HANDLER
  // -------------------------
  const handleSave = () => {
    mutation.mutate();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[460px] max-h-[90vh] overflow-y-auto rounded-xl shadow-xl border border-gray-200">

        {/* HEADER */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Add Application</h2>
          <p className="text-sm text-gray-500">
            Parse job description and track your application
          </p>
        </div>

        <div className="p-6 space-y-4">

          {/* JD */}
          <textarea
            className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            rows={4}
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste job description..."
          />

          {/* PARSE BUTTON */}
          <button
            onClick={handleParse}
            disabled={loadingParse}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
          >
            {loadingParse ? "Parsing..." : "Parse with AI"}
          </button>

          {/* COMPANY / ROLE */}
          <input
            className="w-full border p-2 bg-gray-100 text-gray-600"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company"
          />

          <input
            className="w-full border p-2 bg-gray-100 text-gray-600"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role"
          />

          {/* PARSED DATA */}
          {/* PARSED DATA (PROFESSIONAL FORM STYLE) */}
{parsedData && (
  <div className="grid grid-cols-2 gap-3">

    {/* Skills */}
    <div className="col-span-2">
      <label className="text-xs text-gray-600">Required Skills</label>
      <input
        className="mt-1 w-full border p-2 bg-gray-50 text-gray-700 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        value={parsedData.requiredSkills?.join(", ") || ""}
        onChange={(e) =>
          setParsedData({
            ...parsedData,
            requiredSkills: e.target.value.split(",").map(s => s.trim())
          })
        }
        placeholder="React, Node, MongoDB"
      />
    </div>

    {/* Nice to have */}
    <div className="col-span-2">
      <label className="text-xs text-gray-600">Nice to Have</label>
      <input
        className="mt-1 w-full border p-2 bg-gray-50 text-gray-700 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        value={parsedData.niceToHaveSkills?.join(", ") || ""}
        onChange={(e) =>
          setParsedData({
            ...parsedData,
            niceToHaveSkills: e.target.value.split(",").map(s => s.trim())
          })
        }
        placeholder="AWS, Docker, Kubernetes"
      />
    </div>

    {/* Seniority */}
    <div>
      <label className="text-xs text-gray-600">Seniority</label>
      <input
        className="mt-1 w-full border p-2 bg-gray-50 text-gray-700 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        value={parsedData.seniority || ""}
        onChange={(e) =>
          setParsedData({
            ...parsedData,
            seniority: e.target.value
          })
        }
        placeholder="Junior / Mid / Senior"
      />
    </div>

    {/* Location */}
    <div>
      <label className="text-xs text-gray-600">Location</label>
      <input
        className="mt-1 w-full border p-2 bg-gray-50 text-gray-700 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        value={parsedData.location || ""}
        onChange={(e) =>
          setParsedData({
            ...parsedData,
            location: e.target.value
          })
        }
        placeholder="Remote / Pune / Bangalore"
      />
    </div>

  </div>
)}

          {/* SUGGESTIONS */}
          {suggestions.length > 0 && (
            <div className="space-y-2">
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  className="text-xs bg-gray-100 p-2 rounded"
                >
                  {s}
                </div>
              ))}
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={mutation.isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm transition"
            >
              {mutation.isPending ? "Saving..." : "Save"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}