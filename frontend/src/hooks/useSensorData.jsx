// Custom Hook: busca a leitura do sensor a cada 5 segundos (polling)
import { useState, useEffect } from "react";
import { getLatestReading } from "../services/api";

const INTERVALO = 5000;

export function useSensorData() {
  const [reading, setReading] = useState(null);
  const [online, setOnline] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    let ativo = true;

    async function buscar() {
      try {
        const data = await getLatestReading();
        if (!ativo) return;
        setReading(data);
        setOnline(true);
        setLastUpdate(new Date());
      } catch {
        if (ativo) setOnline(false); // mantém a última leitura na tela
      }
    }

    buscar();
    const timer = setInterval(buscar, INTERVALO);

    // limpa o intervalo quando o componente sai da tela
    return () => {
      ativo = false;
      clearInterval(timer);
    };
  }, []);

  const estado = reading ? reading.estado : "Seguro";
  const isDanger = estado === "Perigo";

  return { reading, estado, isDanger, online, lastUpdate };
}
