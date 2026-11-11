// Camada de acesso a dados: toda comunicação com a API fica aqui
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3333";

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (response.status === 204) return null;

  const data = await response.json();
  if (!response.ok) {
    const message = data.errors ? data.errors.join(" ") : data.error;
    throw new Error(message || "Erro ao falar com o servidor.");
  }
  return data;
}

// Ocorrências (CRUD)
export const getReports = () => request("/reports");
export const createReport = (report) =>
  request("/reports", { method: "POST", body: JSON.stringify(report) });
export const updateReport = (id, changes) =>
  request(`/reports/${id}`, { method: "PATCH", body: JSON.stringify(changes) });
export const deleteReport = (id) => request(`/reports/${id}`, { method: "DELETE" });

// Setores e sensores
export const getSectors = () => request("/sectors");
export const getLatestReading = () => request("/sensors/latest");
export const startStormDemo = () => request("/sensors/tempestade", { method: "POST" });
export const resetSensors = () => request("/sensors/reset", { method: "POST" });