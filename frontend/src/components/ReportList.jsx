import { useState } from "react";
import { Trash2 } from "lucide-react";
import { NIVEL_TO_RISK, RISK_STYLES, STATUS_LIST, formatDate } from "../utils/risk";

// READ / UPDATE / DELETE: lista de chamados
export default function ReportList({ reports, loading, error, canManage, onChangeStatus, onDelete }) {
  const [filtro, setFiltro] = useState("Todos");

  const lista = filtro === "Todos" ? reports : reports.filter((r) => r.nivel === filtro);

  function confirmarExclusao(id) {
    if (window.confirm("Excluir este chamado? Use só para duplicados ou resolvidos.")) {
      onDelete(id);
    }
  }

  return (
    <section className="rounded-xl border border-slate-200 p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-semibold text-ocean-dark">
          {canManage ? "Chamados recebidos" : "Avisos da comunidade"}
        </h2>
        <div className="flex gap-1" role="group" aria-label="Filtrar por gravidade">
          {["Todos", "Alto", "Médio", "Baixo"].map((n) => (
            <button
              key={n}
              onClick={() => setFiltro(n)}
              className={`rounded-md border px-3 py-1 text-sm ${
                filtro === n ? "border-ocean bg-ocean text-white" : "border-slate-300 text-slate-600"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {loading && <p className="mt-4 text-sm text-slate-500">Carregando...</p>}
      {error && <p className="mt-4 text-sm text-red-700">{error}</p>}
      {!loading && !error && lista.length === 0 && (
        <p className="mt-4 text-sm text-slate-500">Nenhum chamado por aqui.</p>
      )}

      <ul className="mt-4 divide-y divide-slate-200">
        {lista.map((r) => {
          const style = RISK_STYLES[NIVEL_TO_RISK[r.nivel]];
          return (
            <li key={r.id} className="py-4">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className={`rounded px-2 py-0.5 font-medium ${style.bg} ${style.text}`}>{r.nivel}</span>
                <span className="font-semibold">{r.tipo}</span>
                <span className="text-slate-500">· {r.bairro} · {formatDate(r.criadoEm)}</span>
              </div>
              <p className="mt-1 text-slate-700">{r.relato}</p>

              {canManage ? (
                <div className="mt-2 flex items-center gap-2">
                  <label className="text-sm text-slate-600">
                    Status{" "}
                    <select
                      value={r.status}
                      onChange={(e) => onChangeStatus(r.id, e.target.value)}
                      className="ml-1 rounded-md border border-slate-300 px-2 py-1"
                    >
                      {STATUS_LIST.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </label>
                  <button
                    onClick={() => confirmarExclusao(r.id)}
                    className="flex items-center gap-1 rounded-md px-2 py-1 text-sm text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" /> Excluir
                  </button>
                </div>
              ) : (
                <p className="mt-1 text-sm text-slate-500">Status: {r.status}</p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}