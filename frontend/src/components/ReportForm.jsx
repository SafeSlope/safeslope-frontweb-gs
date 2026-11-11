import { useState } from "react";

const TIPOS = ["Rachadura", "Alagamento", "Deslizamento", "Lixo no córrego", "Outro"];
const NIVEIS = ["Baixo", "Médio", "Alto"];
const VAZIO = { bairro: "", tipo: "Rachadura", nivel: "Médio", relato: "" };

// CREATE: o morador avisa sobre um ponto de risco
export default function ReportForm({ onSubmit }) {
  const [form, setForm] = useState(VAZIO);
  const [message, setMessage] = useState(null);
  const [sending, setSending] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (form.bairro.trim().length < 3 || form.relato.trim().length < 10) {
      setMessage({ type: "error", text: "Preencha o bairro e conte um pouco mais do que você viu." });
      return;
    }

    try {
      setSending(true);
      await onSubmit(form);
      setForm(VAZIO);
      setMessage({ type: "ok", text: "Aviso enviado! A Defesa Civil vai analisar." });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSending(false);
    }
  }

  const inputClass = "mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-base";

  return (
    <section className="rounded-xl border border-slate-200 p-5">
      <h2 className="font-semibold text-ocean-dark">Viu algo perigoso? Avise aqui</h2>
      <p className="text-sm text-slate-500">Não coloque seu nome ou documentos. O aviso é anônimo.</p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <label className="block text-sm font-medium">
          Bairro
          <input name="bairro" value={form.bairro} onChange={handleChange} className={inputClass} placeholder="Ex: Jardim Ângela" />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm font-medium">
            O que aconteceu
            <select name="tipo" value={form.tipo} onChange={handleChange} className={inputClass}>
              {TIPOS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium">
            Gravidade
            <select name="nivel" value={form.nivel} onChange={handleChange} className={inputClass}>
              {NIVEIS.map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="block text-sm font-medium">
          Conte o que você viu
          <textarea name="relato" value={form.relato} onChange={handleChange} rows={3} className={inputClass} placeholder="Ex: apareceu uma rachadura no muro perto da escola" />
        </label>

        {message && (
          <p role="status" className={`text-sm ${message.type === "ok" ? "text-green-700" : "text-red-700"}`}>
            {message.text}
          </p>
        )}

        <button
          type="submit"
          disabled={sending}
          className="w-full rounded-md bg-ocean px-4 py-3 font-semibold text-white hover:bg-ocean-dark disabled:opacity-60"
        >
          {sending ? "Enviando..." : "Enviar aviso"}
        </button>
      </form>
    </section>
  );
}