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
              console.log(json);
              for (let index = 0; index < Months.length; index++) {
                setChart(json[Months[index]].amount_some)
                
              }
            });
          }
        }).catch((error) => {
          console.log(error);
        });
    };
    fetchCoins()
  }, [])

  console.log("chart", chart);
  var data = {
    labels: chart?.coins?.map(x => x.name),
    datasets: [{
      label: `${chart?.coins?.length} Coins Available`,
      data: chart?.coins?.map(x => x.price),
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
        options={options}

      />
    </div>
  )
}

export default BarChart
