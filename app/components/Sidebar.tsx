import { useState } from "react";
import CreateWorkspaceModal from "app/components/CreateWorkspaceModal";

type Props = {
  workspaces: string[];
  active?: string;
  onSelect: (workspace: string) => void;
  onWorkspaceCreated: (workspace: string) => void;
};

export default function Sidebar({
  workspaces,
  active,
  onSelect,
  onWorkspaceCreated,
}: Props) {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-4 font-bold text-lg">Workspaces</div>

      <nav className="flex-1 overflow-y-auto">
        {workspaces.length === 0 && (
          <p className="px-4 py-2 text-sm text-gray-400">
            No workspaces yet
          </p>
        )}

        {workspaces.map((ws) => (
          <button
            key={ws}
            onClick={() => onSelect(ws)}
            className={`w-full text-left px-4 py-2 transition ${
              active === ws ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
          >
            {ws}
          </button>
        ))}
      </nav>

      <button
        onClick={() => setShowCreate(true)}
        className="m-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
      >
        + New Workspace
      </button>

      {showCreate && (
        <CreateWorkspaceModal
          onClose={() => setShowCreate(false)}
          onCreate={(name) => {
            onWorkspaceCreated(name);
            setShowCreate(false);
          }}
        />
      )}
    </aside>
  );
}
