export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:justify-between">
        <p>SafeSlope · Global Solution FIAP 2026 · ODS 11 e ODS 13</p>
        <p>
          Emergência: <strong className="text-slate-700">Defesa Civil 199</strong> ·{" "}
          <strong className="text-slate-700">Bombeiros 193</strong>
        </p>
      </div>
    </footer>
  );
}
