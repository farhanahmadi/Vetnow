import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import axios from 'axios';

class Chart extends Component{

  constructor(props){
    super(props);
    this.state = {
      chartData:{
        labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
        datasets:[
          {
            label:'Population',
            data:[
              617594,
              181045,
              153060,
              106519,
              105162,
              95072
            ],
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
    }
  }
  componentWillUnmount(){
    axios.get(`${}`)
  }
  render(){
    return (
      <div className="chart">
        <Bar
          data={this.state.chartData}
          width={800}
          height={450}
          options={{}}
        />
      </div>
    )
  }
}

export default Chart;
