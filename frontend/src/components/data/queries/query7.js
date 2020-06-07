import React, {useEffect} from 'react'
import Chart from 'chart.js'

function Query7({props}) {

  useEffect(() => {
    if (props.length > 0) {
      fillChart(...constructData(props))
    }
  }, [props.length, props])

  return (
    <div id='query-7'>
      <p>3 Label Precision/Recall Rates.</p>
      <canvas id="myChart7" width="1000" height="700"></canvas>
    </div>
  )
}

function constructData(props) {
  const correctCounts = {Low: 0, Average: 0, High: 0}
  const totalCounts = {Low: 0, Average: 0, High: 0}
  for (let i = 0; i < props.length; i++) {
    const row = props[i]
    if (row.raterAnswers3 === row.correctAnswers3) {
      correctCounts[row.raterAnswers3]++
    }
    totalCounts[row.raterAnswers3]++
    totalCounts[row.correctAnswer3]++
  }

  const labelsData = []
  for (let i in correctCounts) {
    labelsData.push(correctCounts[i] / totalCounts[i])
  }

  return [Object.keys(correctCounts), labelsData]
}

function fillChart(labels, labelsData) {
  const ctx = document.getElementById('myChart7').getContext('2d')
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
          label: 'Precision Rate For Each 3-Label',
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

  if (myChart !== null) console.log('Query7 Chart Loaded')
}

export default Query7