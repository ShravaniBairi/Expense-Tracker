import React from 'react';
import {  Pie } from 'react-chartjs-2';
import './chartComponent.css'; 
import 'chart.js/auto';  // Import the 'auto' module from 'chart.js'


const PieChartComponent = (data) => {
  

  
    const categories = Object?.keys(data?.data);
    const amounts = Object?.values(data?.data);
  
    const pieData = {
      labels: categories,
      datasets: [
        {
          data: amounts,
          backgroundColor: ["#cc7116", // Orange
          
          "#8A2BE2", // Purple
          '#FF6384', '#36A2EB', '#FFCE56',
          "#719c30","#FFA500", // Orange
          
          "#8A2BE2", // Purple
          "#f7c202", // Yellow
          "#5731b0", // Violet
          "#e8468f"],
          hoverBackgroundColor: ["#cc7116", // Orange
          
          "#8A2BE2", // Purple
          '#FF6384', '#36A2EB', '#FFCE56',
          "#719c30","#FFA500", // Orange
          
          "#8A2BE2", // Purple
          "#f7c202", // Yellow
          "#5731b0", // Violet
          "#e8468f"],
          borderWidth: 0,
        }
      ],
      
    };

    const options = {
      plugins: {
        legend: {
          display: false, // Disable the default legend
        },
      },
    };

    if(data?.length < 1)
      return (
    <div>
      Add more Categories to see the espenses in pie chart
    </div>
    )   
    else return (
      

      
    
      <div className="chart-container">
      
      
        <div className="chart">
        <Pie data={pieData}  options={options}/>
        </div>
        <div className="custom-legend">
          {pieData.labels.map((label, index) => (
            <div key={index} className="legend-item">
              <span
                className="legend-color"
                style={{ backgroundColor: pieData.datasets[0].backgroundColor[index] }}
              ></span>
              <span className="legend-label">{label}</span>
            </div>
          ))}
        </div>
      
    </div>
    );
  };
  
  export default PieChartComponent;