import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AlertBanner from "./components/AlertBanner";
import StatusCard from "./components/StatusCard";
import WeatherCard from "./components/WeatherCard";
import { useSensorData } from "./hooks/useSensorData";

export default function App() {
  const [view, setView] = useState("cidadao");
  const { reading, estado, isDanger, online, lastUpdate } = useSensorData();

  return (
    <div className="min-h-screen">
      <AlertBanner show={isDanger} />
      <Header view={view} onChangeView={setView} />

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-6">
        <div className="grid gap-6 md:grid-cols-2">
          <StatusCard
            estado={estado}
            nivelAgua={reading?.nivelAgua}
            taxaSubida={reading?.taxaSubida}
            online={online}
            lastUpdate={lastUpdate}
          />
          <WeatherCard chuva={reading?.chuva} chuva24h={reading?.chuva24h} umidadeSolo={reading?.umidadeSolo} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
