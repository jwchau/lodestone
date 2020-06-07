import React, {useEffect} from 'react'
import Chart from 'chart.js'

function Query3({props}) {

  useEffect(() => {
    if (props.length > 0) {
      fillChart(...constructData(props))
    }
  }, [props.length, props])

  return (
    <div id='query-3'>
      <p>Identify raters that have the highest agreement rates with the engineer.</p>
      <canvas id="myChart3" width="1000" height="700"></canvas>
    </div>
  )
}

function constructData(props) {
  const raters = {}
  for (let i = 0; i < props.length; i++) {
    const row = props[i];
    // [total, threematch, fivematch]
    if (raters[row.raterId] === undefined) raters[row.raterId] = [0, 0, 0]
    raters[row.raterId][0]++
    if (row.threeMatch) raters[row.raterId][1]++
    if (row.fiveMatch) raters[row.raterId][2]++
  }

  //raters {A: [4, 2, 2], B: [5, 4, 1]}
  
  const sortedKeys = Object.keys(raters).sort((a, b) => {
    return (
      ((raters[b][1] + raters[b][2]) / (raters[b][0] * 2)) - 
      ((raters[a][1] + raters[a][2]) / (raters[a][0] * 2))
    )
  })


  const threeMatchData = []
  const fiveMatchData = []
  for (let i = 0; i < sortedKeys.length; i++) {
    const key = sortedKeys[i];
    threeMatchData.push(raters[key][1] / raters[key][0])
    fiveMatchData.push(raters[key][2] / raters[key][0])
  }

  return [sortedKeys, threeMatchData, fiveMatchData]
}

function fillChart(labels, threeMatchData, fiveMatchData) {
  const ctx = document.getElementById('myChart3').getContext('2d')
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
          label: 'ThreeMatch Rater Agreement Rate',
          data: threeMatchData,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'FiveMatch Rater Agreement Rate',
          data: fiveMatchData,
          backgroundColor: 'rgba(99, 128, 255, 0.2)',
          borderColor: 'rgba(99, 125, 255, 1)',
          borderWidth: 1
        }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            suggestedMin: 0,
            callback: function(value, index, values) {
              return (value * 100) + '%'
            }
          }
        }]
      }
    }
  });

  if (myChart !== null) console.log('Query3 Chart Loaded')
}

export default Query3
