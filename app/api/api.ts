const API_URL = "http://localhost:8000/api";

export async function listNamespaces() {
  return fetch(`${API_URL}/namespaces`)
    .then((r) => r.json());
}

export async function createWorkspace(name: string) {
  const response = await fetch(`${API_URL}/namespaces`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ namespace_name: name }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create workspace: ${response.statusText}`);
  }

  return response.json();
}

export async function uploadFiles(
  workspace: string,
  files: File[]
) {
  const formData = new FormData();
  formData.append("namespace_name", workspace);
  files.forEach((f) => formData.append("files", f));

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload files: ${response.statusText}`);
  }

  return response.json();
}

export async function askQuestion(
  workspace: string,
  question: string,
  messages: Array<{ role: "user" | "assistant"; content: string }> = []
) {
  const response = await fetch(`${API_URL}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      namespace_name: workspace,
      question,
      messages,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to ask question: ${response.statusText}`);
  }

  return response.json();
}
