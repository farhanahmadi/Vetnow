import React, {Component, useEffect, useState} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import axios from 'axios';
import { MainLink } from '../Link/MainLink';

const Chart =() =>{

  const months = ['farvardin' , 'ordibehesht' ,'khordad' ,'tir' ,'mordad' ,'sharivar' ,
  'mehr' ,'aban' ,'azar' ,'dey' ,'bahman' ,'esfand']
  const [data , setData] = useState([])


  useEffect(() =>{
    axios.get(`${MainLink}/api/v1/total_sells_per_month/`).then(response => 
      {for (let index = 0; index < months.length; index++) {
        data.push(response.data[months[index]].amount__sum)
        console.log(data);
      }}
      )
  },[])

      var chartData = {
        labels: months.map(item => item),
        datasets:[
          {
            label:'Population',
            data:[data.map(item => item)],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ]
          }
        ]
      }

    return (
      <div className="chart">
        <Bar
          data={chartData}
          width={800}
          height={450}
          options={{}}
        />
      </div>
    )}

export default Chart;
