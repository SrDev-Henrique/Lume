"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const data = {
    datasets: [
      {
        label: "Total",
        data: [1250000, 2500000, 3500000],
        backgroundColor: ["#0747b6", "#2265d8", "#2f91fa"],
      },
    ],
    labels: ["Banco 1", "Banco 2", "Banco 3"],
  };
  return <Doughnut
    data={data}
    options={{
      cutout: '65%',
      plugins: {
        legend: {
          display: false,
        }
      }
    }}
  />;
};

export default DoughnutChart;
