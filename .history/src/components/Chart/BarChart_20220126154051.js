import React, { useState, useEffect } from 'react'
import { MainLink } from './Link/MainLink';

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

const Months = ['','','','','','','','','','','','']
const BarChart = () => {
  const [chart, setChart] = useState([])
  var baseUrl = "https://api.coinranking.com/v2/coins";
  var proxyUrl = "https://cors-anywhere.herokuapp.com/";
  var apiKey = "coinranking917a7ba0c7eee1008a05eddf6c7e5a6674d805ad3ed86806";


  useEffect(() => {
    const fetchCoins = async () => {
      await fetch(`${MainLink}`, {
        method: 'GET',})
        .then((response) => {
          if (response.ok) {
            response.json().then((json) => {
              console.log(json.data);
              for (let index = 0; index < array.length; index++) {
                setChart(json.data[Months])
                
              }
            });
          }
        }).catch((error) => {
          console.log(error);
        });
    };
    fetchCoins()
  }, [baseUrl, proxyUrl, apiKey])

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
