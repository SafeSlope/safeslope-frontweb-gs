import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AlertBanner from "./components/AlertBanner";
import StatusCard from "./components/StatusCard";
import WeatherCard from "./components/WeatherCard";
import RiskMap from "./components/RiskMap";
import ReportForm from "./components/ReportForm";
import ReportList from "./components/ReportList";
import { useAlerts } from "./hooks/useAlerts";
import { useSensorData } from "./hooks/useSensorData";
import { startStormDemo, resetSensors } from "./services/api";

export default function App() {
  const [view, setView] = useState("cidadao");
  const { reading, estado, isDanger, online, lastUpdate } = useSensorData();
  const { reports, loading, error, urgentCount, addReport, changeStatus, removeReport } = useAlerts();

  return (
    <div className="min-h-screen">
      <AlertBanner show={isDanger} sensor={reading?.sensor} />
      <Header view={view} onChangeView={setView} />

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-6">
        <div className="grid gap-6 md:grid-cols-2">
          <StatusCard
            estado={estado}
            nivelAgua={reading?.nivelAgua}
            taxaSubida={reading?.taxaSubida}
            online={online}
            lastUpdate={lastUpdate}
            sensor={reading?.sensor}
          />
          <WeatherCard chuva={reading?.chuva} chuva24h={reading?.chuva24h} umidadeSolo={reading?.umidadeSolo} />
        </div>

        <RiskMap estado={estado} />

        {view === "cidadao" ? (
          <div className="grid gap-6 md:grid-cols-2">
            <ReportForm onSubmit={addReport} />
            <ReportList reports={reports} loading={loading} error={error} canManage={false} />
          </div>
        ) : (
          <>
            <section className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 p-5">
              <p>
                <span className="text-3xl font-bold text-red-700">{urgentCount}</span>{" "}
                <span className="text-slate-600">chamados de nível alto em aberto</span>
              </p>
              <div className="flex gap-2">
                <button onClick={startStormDemo} className="rounded-md border border-red-600 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50">
                  Simular tempestade
                </button>
                <button onClick={resetSensors} className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
                  Voltar ao normal
                </button>
              </div>
            </section>
            <ReportList
              reports={reports}
              loading={loading}
              error={error}
              canManage={true}
              onChangeStatus={changeStatus}
              onDelete={removeReport}
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
