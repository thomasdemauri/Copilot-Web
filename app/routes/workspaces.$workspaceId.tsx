import { useParams } from "react-router";
import { useState } from "react";
import Chat from "../components/Chat";
import UploadModal from "../components/UploadModal";
import { uploadFiles } from "../api/api";

export default function WorkspaceRoute() {
  const { workspaceId } = useParams();
  const [showUpload, setShowUpload] = useState(false);

  if (!workspaceId) return null;

  return (
    <>
      <button
        onClick={() => setShowUpload(true)}
        className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Upload Data
      </button>

      <Chat workspace={workspaceId} />

      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          onUpload={(files) => uploadFiles(workspaceId, files)}
        />
      )}
    </>
  );
}
