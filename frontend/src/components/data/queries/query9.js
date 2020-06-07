import React, {useEffect} from 'react'
import Chart from 'chart.js'

function Query9({props}) {

  useEffect(() => {
    if (props.length > 0) {
      fillChart(...constructData(props))
    }
  }, [props.length, props])

  return (
    <div id='query-9'>
      <p>What is the overall agreement rate considering that the raters have to be in agreement with both the engineer's 3-label answer and the engineer's 5-label answer.</p>
      <canvas id="myChart9" width="1000" height="700"></canvas>
    </div>
  )
}

function constructData(props) {
  const raters = {}
  for (let i = 0; i < props.length; i++) {
    const row = props[i];
    if (raters[row.raterId] === undefined) raters[row.raterId] = [0, 0]
    raters[row.raterId][0]++
    if (row.threeMatch && row.fiveMatch) raters[row.raterId][1]++
  }
  
  const sortedKeys = Object.keys(raters).sort((a, b) => {
    return ((raters[b][1] / raters[b][0]) - (raters[a][1] / raters[a][0]))
  })

  const labelsData = []
  for (let i = 0; i < sortedKeys.length; ++i) {
    const key = sortedKeys[i]
    labelsData.push(raters[key][1] / raters[key][0])
  }

  return [Object.keys(raters), labelsData]  
}

function fillChart(labels, labelsData) {
  const ctx = document.getElementById('myChart9').getContext('2d')
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
          label: 'Combined 3-5 Label Agreement Rate',
          data: labelsData,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
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

  if (myChart !== null) console.log('Query9 Chart Loaded')
}

export default Query9