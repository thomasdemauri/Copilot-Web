const API_URL = "http://localhost:8000/api";

export async function createWorkspace(name: string) {
  return fetch(`${API_URL}/namespaces`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ namespace_name: name }),
  }).then((r) => r.json());
}

export async function uploadFiles(
  workspace: string,
  files: File[]
) {
  const formData = new FormData();
  formData.append("namespace_name", workspace);
  files.forEach((f) => formData.append("files", f));

  return fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  }).then((r) => r.json());
}

export async function askQuestion(
  workspace: string,
  question: string
) {
  return fetch(`${API_URL}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      namespace_name: workspace,
      question,
    }),
  }).then((r) => r.json());
}
