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

  const newArrayWind = arrayHours?.map((item, i) => {
    const maxwind = item?.wind_mph * 0.44704;
    var maxwindTwoDecimals = parseFloat(maxwind).toFixed(0);
    return { x: moment(item?.time).format('HH'), y: maxwindTwoDecimals };
  });

  const uvArray = arrayHours?.map((item, i) => {
    return { x: moment(item?.time).format('HH'), y: item?.uv };
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
      {
        label: 'Vind',
        data: newArrayWind,
        borderColor: 'rgb(0,191,255)',
        backgroundColor: 'rgb(0,191,255)',
      },
      {
        label: 'UV',
        data: uvArray,
        borderColor: 'rgb(154,205,50)',
        backgroundColor: 'rgb(154,205,50)',
      },
    ],
  };
  return <Line options={options} data={data} />;
};
