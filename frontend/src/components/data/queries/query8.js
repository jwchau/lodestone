import React, {useEffect} from 'react'
import Chart from 'chart.js'

function Query8({props}) {

  useEffect(() => {
    if (props.length > 0) {
      fillChart(...constructData(props))
    }
  }, [props.length, props])

  return (
    <div id='query-8'>
      <p>5 Label Precision/Recall Rates.</p>
      <canvas id="myChart8" width="1000" height="700"></canvas>
    </div>
  )
}

function constructData(props) {
  const correctCounts = {Bad: 0, Okay: 0, Intermediate: 0, Great: 0, Exceptional: 0}
  const totalCounts = {Bad: 0, Okay: 0, Intermediate: 0, Great: 0, Exceptional: 0}
  for (let i = 0; i < props.length; i++) {
    const row = props[i]
    if (row.raterAnswers5 === row.correctAnswers5) {
      correctCounts[row.raterAnswers5]++
    }
    totalCounts[row.raterAnswers5]++
    totalCounts[row.correctAnswer5]++
  }

  const labelsData = []
  for (let i in correctCounts) {
    labelsData.push(correctCounts[i] / totalCounts[i])
  }

  return [Object.keys(correctCounts), labelsData]
}

function fillChart(labels, labelsData) {
  const ctx = document.getElementById('myChart8').getContext('2d')
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
          label: 'Precision Rate For Each 5-Label',
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

  if (myChart !== null) console.log('Query8 Chart Loaded')
}

export default Query8