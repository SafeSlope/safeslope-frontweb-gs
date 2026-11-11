import { CloudRain, Droplets } from "lucide-react";

// Métricas de chuva e umidade do solo
export default function WeatherCard({ chuva, chuva24h, umidadeSolo }) {
  const soloEncharcado = umidadeSolo >= 85;

  return (
    <section className="rounded-xl border border-slate-200 p-5">
      <h2 className="font-semibold text-ocean-dark">Chuva e solo</h2>

      <div className="mt-4 space-y-4">
        <div className="flex items-center gap-3">
          <CloudRain className="h-6 w-6 text-ocean" aria-hidden="true" />
          <div>
            <p className="text-sm text-slate-500">Chuva agora</p>
            <p className="text-lg font-semibold">{chuva ?? "--"} mm/h</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CloudRain className="h-6 w-6 text-ocean-dark" aria-hidden="true" />
          <div>
            <p className="text-sm text-slate-500">Acumulado em 24h</p>
            <p className="text-lg font-semibold">{chuva24h ?? "--"} mm</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Droplets className="h-6 w-6 text-ocean" aria-hidden="true" />
          <div className="flex-1">
            <p className="text-sm text-slate-500">Umidade do solo</p>
            <p className="text-lg font-semibold">{umidadeSolo ?? "--"}%</p>
            <div className="mt-1 h-2 rounded bg-slate-100" aria-hidden="true">
              <div
                className={`h-2 rounded ${soloEncharcado ? "bg-red-600" : "bg-ocean"}`}
                style={{ width: `${umidadeSolo ?? 0}%` }}
              />
            </div>
            {soloEncharcado && <p className="mt-1 text-sm text-red-700">Solo encharcado: risco maior de deslizamento.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}