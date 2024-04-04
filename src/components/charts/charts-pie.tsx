import { getAllVehicles } from "@/services/vehicles";
import userStore from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export default function ChartPie() {
  const { data: vehicles } = useQuery({
    queryKey: ["vehicles"],
    queryFn: () => getAllVehicles(userStore.getState().token),
  });

  const [options, setOptions] = useState({
    title: "Tipos de Carros",
  });

  const [data, setData] = useState<(string | number)[][]>([
    ["Tipo", "Quantidade"],
  ]);
  useEffect(() => {
    if (vehicles) {
      const carCount = vehicles.filter(
        (vehicle) => vehicle.type === "car"
      ).length;
      const motoCount = vehicles.filter(
        (vehicle) => vehicle.type === "moto"
      ).length;

      setData([
        ["Tipo", "Quantidade"],
        ["Carro", carCount],
        ["Moto", motoCount],
      ]);
    }
  }, [vehicles]);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Chart
            width={"500px"}
            height={"300px"}
            chartType="PieChart"
            data={data}
            options={options}
          />
        </div>
      </header>
    </div>
  );
}
