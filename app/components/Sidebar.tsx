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
    <aside className="w-72 bg-white border-r border-gray-200 flex flex-col shadow-sm h-screen">
      {/* Header */}
      <div className="p-5 border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
        <h1 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
          Workspaces
        </h1>
        <p className="text-xs text-gray-500 mt-1">Organize your databases</p>
      </div>

      {/* Workspaces List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {!workspaces || workspaces.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 mb-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-900">No workspaces yet</p>
            <p className="text-xs text-gray-500 mt-2">Create one to get started</p>
          </div>
        ) : (
          workspaces.map((ws) => (
            <div key={ws.name} className="group">
              {/* Workspace Header */}
              <div className="flex items-center gap-0 rounded-lg transition-all hover:bg-gray-50 group">
                <button
                  onClick={() => toggleExpand(ws.name)}
                  className="px-3 py-2.5 text-gray-400 hover:text-blue-600 transition-colors flex-shrink-0"
                  title={expandedNamespace === ws.name ? "Collapse" : "Expand"}
                >
                  {expandedNamespace === ws.name ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                  )}
                </button>
                <button
                  onClick={() => onSelect(ws.name)}
                  className={`flex-1 text-left px-2 py-2.5 rounded-md transition-all font-medium text-sm ${
                    active === ws.name
                      ? "bg-blue-50 text-blue-700 border-l-2 border-blue-600"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      active === ws.name ? "bg-blue-600" : "bg-gray-300"
                    }`} />
                    <span className="flex-1 truncate">{ws.name}</span>
                    {ws.tables && ws.tables.length > 0 && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        active === ws.name 
                          ? "bg-blue-100 text-blue-700" 
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {ws.tables.length}
                      </span>
                    )}
                  </div>
                </button>
              </div>

              {/* Expandable Tables List */}
              {expandedNamespace === ws.name && (
                <div className="ml-6 mt-1 border-l border-gray-200 pl-3 py-2 space-y-1 animate-fadeIn">
                  {!ws.tables || ws.tables.length === 0 ? (
                    <p className="px-3 py-2 text-xs text-gray-400 italic">
                      No tables
                    </p>
                  ) : (
                    ws.tables.map((table) => (
                      <div
                        key={table}
                        className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-900 rounded hover:bg-gray-100 transition-colors cursor-default flex items-center gap-2 group/table"
                      >
                        <svg className="w-3 h-3 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M6 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H6zm0 2h10v10H6V5z" /></svg>
                        <span className="truncate font-medium">{table}</span>
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
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <button
          onClick={() => setShowCreate(true)}
          className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg text-white text-sm font-semibold transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
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
