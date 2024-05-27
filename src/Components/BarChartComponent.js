import React from 'react';
import { Bar } from 'react-chartjs-2';
import "../ExpenseSlider.css"

import 'chart.js/auto';  // Import the 'auto' module from 'chart.js'


const BarChartComponent = (data) => {
  let sortedArray = Object?.entries(data?.data).sort((a, b) => b[1] - a[1]);

// Convert the sorted array back into an object
let sortedObj = Object?.fromEntries(sortedArray);
console.log(sortedObj);
  
  
 
    const categories = Object?.keys(sortedObj);
    const amounts = Object?.values(sortedObj);
  
    const barData = {
      labels: categories?.slice(0,3),
      datasets: [
        {
          label: 'Amount',
          data: amounts?.slice(0,3),
          backgroundColor: [ '#36A2EB'],
          borderColor: ['black'],
          borderWidth: 1,
          barThickness:20 
        }
      ]
    };
    if(data.length < 1)
      return (
    <div>
      Add more Categories to see the espenses in pie chart
    </div>
    )   
    else return (
      <div className="bar-chart-container">
            <h1>Top Expenses</h1>
            <div className="bar-chart-canvas">
                <Bar data={barData} options={{
                    indexAxis: 'y', // Display bars horizontally
                    plugins: {
                        legend: {
                            display: false, // Hide legend
                            labels: {
                              boxWidth: 1 // Set the width of legend items
                            }
                        }
                    },
                    scales: {
                      x: {
                        grid: {
                          display: false // Hide x-axis grid lines
                        }
                      },
                      y: {
                        grid: {
                          display: false // Hide y-axis grid lines
                        }
                      }
                    }
                }} />
            </div>
        </div>
    );
  };
  
  export default BarChartComponent;