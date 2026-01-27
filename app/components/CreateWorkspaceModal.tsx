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

  async function handleCreate() {
    if (!name) return;

    setLoading(true);
    await createWorkspace(name);
    onCreate(name);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-96 shadow-2xl">
        <h2 className="text-lg font-bold mb-4 text-black">Create workspace</h2>

        <input
          className="w-full border border-gray-300 p-2 mb-4 text-black bg-white rounded"
          placeholder="workspace_name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-black hover:bg-gray-100 rounded">Cancel</button>
          <button
            onClick={handleCreate}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
