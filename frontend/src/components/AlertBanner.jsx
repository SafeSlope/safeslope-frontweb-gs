import { TriangleAlert } from "lucide-react";
import { RISK_MESSAGES } from "../utils/risk";

// Aparece sozinho quando o sensor entra em PERIGO
export default function AlertBanner({ show, sensor }) {
  if (!show) return null;

  return (
    <div role="alert" className="bg-red-600 text-white">
      <div className="mx-auto flex max-w-5xl items-start gap-3 px-4 py-3">
        <TriangleAlert className="mt-0.5 h-6 w-6 shrink-0 animate-pulse" aria-hidden="true" />
        <div>
          <p className="font-bold uppercase tracking-wide">
            Perigo: risco de deslizamento{sensor ? ` — ${sensor.setor} (${sensor.bairro})` : ""}
          </p>
          <p className="text-sm">{RISK_MESSAGES.Perigo} Ligue 199 se precisar de ajuda.</p>
        </div>
      </div>
    </div>
  );
}