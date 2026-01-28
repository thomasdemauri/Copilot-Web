import { Outlet, useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import Sidebar from "app/components/Sidebar";
import { listNamespaces } from "app/api/api";

type Namespace = {
  name: string;
  tables: string[];
};

export default function WorkspaceLayout() {
  const [workspaces, setWorkspaces] = useState<Namespace[]>([]);
  const [loading, setLoading] = useState(true);
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  // Carregar namespaces ao montar o componente
  useEffect(() => {
    loadWorkspaces();
  }, []);

  async function loadWorkspaces() {
    try {
      const data = await listNamespaces();
      setWorkspaces(data.namespaces || []);
    } catch (error) {
      console.error("Erro ao carregar workspaces:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen">
      <Sidebar
        workspaces={workspaces}
        active={workspaceId}
        onSelect={(ws) => navigate(`/workspaces/${ws}`)}
        onWorkspaceCreated={(ws) => {
          setWorkspaces((prev) => [...prev, { name: ws, tables: [] }]);
          navigate(`/workspaces/${ws}`);
        }}
      />

      <div className="flex-1 relative">
        <Outlet context={{ reloadWorkspaces: loadWorkspaces }} />
      </div>
    </div>
  );
}
