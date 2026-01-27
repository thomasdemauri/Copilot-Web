import { useState } from "react";
import CreateWorkspaceModal from "app/components/CreateWorkspaceModal";

type Namespace = {
  name: string;
  tables: string[];
};

type Props = {
  workspaces: Namespace[];
  active?: string;
  onSelect: (workspace: string) => void;
  onWorkspaceCreated: (workspace: string) => void;
};

export default function Sidebar({
  workspaces = [],
  active,
  onSelect,
  onWorkspaceCreated,
}: Props) {
  const [showCreate, setShowCreate] = useState(false);
  const [expandedNamespace, setExpandedNamespace] = useState<string | null>(null);

  const toggleExpand = (name: string) => {
    setExpandedNamespace(expandedNamespace === name ? null : name);
  };

  return (
    <aside className="w-72 bg-gradient-to-b from-slate-900 to-slate-950 text-white flex flex-col shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-slate-700/50 bg-slate-900/50">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Workspaces
        </h1>
        <p className="text-xs text-slate-400 mt-1">Manage your databases</p>
      </div>

      {/* Workspaces List */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-2">
        {!workspaces || workspaces.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <p className="text-sm text-slate-400">No workspaces yet</p>
            <p className="text-xs text-slate-500 mt-2">Create one to get started</p>
          </div>
        ) : (
          workspaces.map((ws) => (
            <div key={ws.name} className="group">
              {/* Workspace Header */}
              <div className="flex items-center gap-1 rounded-lg transition-all hover:bg-slate-800/50">
                <button
                  onClick={() => toggleExpand(ws.name)}
                  className="px-3 py-2 text-slate-400 hover:text-blue-400 transition-colors"
                  title={expandedNamespace === ws.name ? "Collapse" : "Expand"}
                >
                  {expandedNamespace === ws.name ? (
                    <span className="text-sm">📁</span>
                  ) : (
                    <span className="text-sm">📂</span>
                  )}
                </button>
                <button
                  onClick={() => onSelect(ws.name)}
                  className={`flex-1 text-left px-3 py-2 rounded-md transition-all font-medium text-sm ${
                    active === ws.name
                      ? "bg-blue-600/30 text-blue-300 border-l-2 border-blue-500"
                      : "text-slate-300 hover:bg-slate-700/30 hover:text-white"
                  }`}
                >
                  {ws.name}
                  <span className="text-xs text-slate-400 ml-2">
                    {(ws.tables && ws.tables.length > 0) && `(${ws.tables.length})`}
                  </span>
                </button>
              </div>

              {/* Expandable Tables List */}
              {expandedNamespace === ws.name && (
                <div className="ml-4 mt-1 border-l border-slate-700/50 pl-3 py-2 space-y-1">
                  {!ws.tables || ws.tables.length === 0 ? (
                    <p className="px-3 py-2 text-xs text-slate-500 italic">
                      No tables
                    </p>
                  ) : (
                    ws.tables.map((table) => (
                      <div
                        key={table}
                        className="px-3 py-2 text-xs text-slate-400 hover:text-slate-200 rounded hover:bg-slate-800/30 transition-colors cursor-default flex items-center gap-2"
                      >
                        <span className="text-blue-400">▸</span>
                        <span className="truncate">{table}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </nav>

      {/* Create Button */}
      <div className="p-4 border-t border-slate-700/50 bg-slate-900/50">
        <button
          onClick={() => setShowCreate(true)}
          className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-lg text-white text-sm font-semibold transition-all shadow-lg hover:shadow-blue-500/20 flex items-center justify-center gap-2"
        >
          <span>➕</span>
          New Workspace
        </button>
      </div>

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
