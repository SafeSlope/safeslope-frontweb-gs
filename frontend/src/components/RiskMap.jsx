import { useState, useEffect } from "react";
import { getSectors } from "../services/api";
import { RISK_STYLES } from "../utils/risk";

// Mapa simplificado: cada bloco é um setor monitorado
export default function RiskMap() {
  const [sectors, setSectors] = useState([]);
  const [filtro, setFiltro] = useState("Todos");

  useEffect(() => {
    getSectors()
      .then(setSectors)
      .catch(() => setSectors([]));
  }, []);

  const bairros = ["Todos", ...new Set(sectors.map((s) => s.bairro))];
  const visiveis = filtro === "Todos" ? sectors : sectors.filter((s) => s.bairro === filtro);

  return (
    <section className="rounded-xl border border-slate-200 p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-semibold text-ocean-dark">Mapa de setores</h2>
        <label className="text-sm text-slate-600">
          Bairro{" "}
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="ml-1 rounded-md border border-slate-300 px-2 py-1"
          >
            {bairros.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </label>
      </div>

      {sectors.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">Não foi possível carregar os setores.</p>
      ) : (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {visiveis.map((sector) => {
            const style = RISK_STYLES[sector.risco];
            return (
              <li key={sector.id} className={`rounded-lg border-2 ${style.border} ${style.bg} p-3`}>
                <p className="text-xs text-slate-500">{sector.id} · {sector.bairro}</p>
                <p className="font-medium">{sector.nome}</p>
                <p className={`text-sm font-semibold ${style.text}`}>{sector.risco}</p>
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-4 flex gap-4 text-xs text-slate-600" aria-label="Legenda">
        {Object.keys(RISK_STYLES).map((risco) => (
          <span key={risco} className="flex items-center gap-1">
            <span className={`h-3 w-3 rounded-full ${RISK_STYLES[risco].dot}`} /> {risco}
          </span>
        ))}
      </div>
    </section>
  );
}