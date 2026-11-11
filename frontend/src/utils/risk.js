// Regras de apresentação dos níveis de risco (sem JSX)

export const RISK_STYLES = {
  Seguro: { dot: "bg-green-600", text: "text-green-800", bg: "bg-green-50", border: "border-green-600" },
  "Atenção": { dot: "bg-amber-500", text: "text-amber-800", bg: "bg-amber-50", border: "border-amber-500" },
  Perigo: { dot: "bg-red-600", text: "text-red-800", bg: "bg-red-50", border: "border-red-600" },
};

export const RISK_MESSAGES = {
  Seguro: "Tudo tranquilo. Continue acompanhando em dias de chuva.",
  "Atenção": "A água está subindo. Separe documentos e fique atento aos avisos.",
  Perigo: "Saia agora de áreas de encosta e beira de córrego. Vá para um local alto e seguro.",
};

export const NIVEL_TO_RISK = { Baixo: "Seguro", "Médio": "Atenção", Alto: "Perigo" };

export const STATUS_LIST = ["Em Análise", "Em Atendimento", "Normalizado"];

export function formatDate(iso) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}