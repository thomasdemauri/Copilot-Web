import { Outlet, useNavigate, useParams } from "react-router";
import { useState } from "react";
import Sidebar from "app/components/Sidebar";

export default function WorkspaceLayout() {
  const [workspaces, setWorkspaces] = useState<string[]>([]);
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      <Sidebar
        workspaces={workspaces}
        active={workspaceId}
        onSelect={(ws) => navigate(`/workspaces/${ws}`)}
        onWorkspaceCreated={(ws) => {
          setWorkspaces((prev) => [...prev, ws]);
          navigate(`/workspaces/${ws}`);
        }}
      />

      <div className="flex-1 relative">
        <Outlet />
      </div>
    </div>
  );
}
