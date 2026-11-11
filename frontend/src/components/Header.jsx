import { Mountain } from "lucide-react";

const TABS = [
  { id: "cidadao", label: "Para moradores" },
  { id: "defesa", label: "Defesa Civil" },
];

export default function Header({ view, onChangeView }) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Mountain className="h-7 w-7 text-ocean" aria-hidden="true" />
          <div>
            <p className="text-xl font-bold text-ocean-dark">SafeSlope</p>
            <p className="text-xs text-slate-500">Safe slopes, peaceful lives.</p>
          </div>
        </div>

        <nav aria-label="Escolher painel" className="flex gap-1 rounded-lg border border-slate-200 p-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onChangeView(tab.id)}
              aria-current={view === tab.id ? "page" : undefined}
              className={`rounded-md px-4 py-2 text-sm font-medium ${
                view === tab.id ? "bg-ocean text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
