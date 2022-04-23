import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

const labels = [];

export const LineChart = ({ locationData }) => {
  const arrayHours = locationData?.forecast?.forecastday[0]?.hour;
  const newArray = arrayHours?.map((item, i) => {
    return { x: moment(item?.time).format('HH'), y: item?.temp_c };
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Temp',
        data: newArray,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return <Line options={options} data={data} />;
};
