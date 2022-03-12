import React, { useState, useEffect } from 'react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,

  BarElement,

} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import { MainLink } from '../Link/MainLink';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Months = ['farvardin','ordibehesht','khordad','tir','mordad','sharivar',
'mehr','aban','azar','dey','bahman','esfand']
const BarChart = () => {
  const [chart, setChart] = useState([])


  useEffect(() => {
    const fetchCoins = async () => {
      await fetch(`${MainLink}/api/v1/total_sells_per_month/`, {
        method: 'GET',})
        .then((response) => {
          if (response.ok) {
            response.json().then((json) => {
              // console.log(json[Months[0]]);
              for (let index = 0; index < Months.length; index++) {
               chart.length < 12 && setChart(prevstate => [...prevstate , json[Months[index]].amount__sum])
              }
            });
          }
        }).catch((error) => {
          console.log(error);
        });
    };
    fetchCoins()
  }, [])

  var data = {
    labels: Months.map(item => item),
    datasets: [{
      label: `جدول فروش ماهانه`,
      data: chart?.map(x => x),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }

  return (
    <div>
      <Bar
        data={data}
        height={400}
        width={800}
        options={options}

      />
    </div>
  )
}

export default BarChart
