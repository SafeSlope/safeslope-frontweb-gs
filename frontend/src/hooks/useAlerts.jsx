// Custom Hook: regras e estado das ocorrências (CRUD)
import { useState, useEffect, useCallback } from "react";
import { getReports, createReport, updateReport, deleteReport } from "../services/api";

export function useAlerts() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // READ
  const loadReports = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getReports();
      setReports(data);
      setError("");
    } catch (err) {
      setError("Não foi possível carregar as ocorrências. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  // CREATE
  async function addReport(report) {
    const created = await createReport(report);
    setReports((prev) => [created, ...prev]);
    return created;
  }

  // UPDATE
  async function changeStatus(id, status) {
    const updated = await updateReport(id, { status });
    setReports((prev) => prev.map((r) => (r.id === id ? updated : r)));
  }

  // DELETE
  async function removeReport(id) {
    await deleteReport(id);
    setReports((prev) => prev.filter((r) => r.id !== id));
  }

  // regra de negócio: ocorrências abertas de nível alto
  const urgentCount = reports.filter((r) => r.nivel === "Alto" && r.status !== "Normalizado").length;

  return { reports, loading, error, urgentCount, loadReports, addReport, changeStatus, removeReport };
}
