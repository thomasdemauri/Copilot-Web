import { useState } from "react";
import { createWorkspace } from "app/api/api";

type Props = {
  onClose: () => void;
  onCreate: (workspace: string) => void;
};

export default function CreateWorkspaceModal({
  onClose,
  onCreate,
}: Props) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCreate() {
    if (!name) return;

    setLoading(true);
    setError("");
    try {
      await createWorkspace(name);
      onCreate(name);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create workspace");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl w-96 shadow-2xl border border-gray-200 overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Create New Workspace</h2>
          <p className="text-sm text-gray-500 mt-1">Set up a new workspace for your data</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Workspace Name
            </label>
            <input
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-500 transition-all focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="e.g. Marketing DB"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && name && handleCreate()}
              autoFocus
              disabled={loading}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium text-sm transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={loading || !name}
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
