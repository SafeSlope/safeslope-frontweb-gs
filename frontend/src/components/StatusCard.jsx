import { RISK_STYLES, RISK_MESSAGES } from "../utils/risk";

// Card principal: estado atual do córrego (Verde, Amarelo, Vermelho)
export default function StatusCard({ estado, nivelAgua, taxaSubida, online, lastUpdate, sensor }) {
  const style = RISK_STYLES[estado];

  return (
    <section className={`rounded-xl border-l-8 ${style.border} ${style.bg} p-5`} aria-live="polite">
      <p className="text-sm font-medium text-slate-600">
        {sensor ? `${sensor.setorId} · ${sensor.setor} · ${sensor.bairro}` : "Situação agora no córrego"}
      </p>
      <div className="mt-1 flex items-center gap-2">
        <span className={`h-4 w-4 rounded-full ${style.dot}`} aria-hidden="true" />
        <h2 className={`text-3xl font-bold ${style.text}`}>{estado}</h2>
      </div>
      <p className="mt-2 text-base text-slate-700">{RISK_MESSAGES[estado]}</p>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-slate-500">Nível da água</dt>
          <dd className="text-lg font-semibold">{nivelAgua ?? "--"} cm</dd>
        </div>
        <div>
          <dt className="text-slate-500">Velocidade de subida</dt>
          <dd className="text-lg font-semibold">{taxaSubida ?? "--"} cm/min</dd>
        </div>
      </dl>

      <p className="mt-3 text-xs text-slate-500">
        {online
          ? `Atualizado às ${lastUpdate ? lastUpdate.toLocaleTimeString("pt-BR") : "--"}`
          : "Sem conexão com o sensor. Mostrando a última leitura."}
      </p>
    </section>
  );
}