import React, {useEffect} from 'react'
import Chart from 'chart.js'

function Query5({props}) {

  useEffect(() => {
    if (props.length > 0) {
      fillChart(...constructData(props))
    }
  }, [props.length, props])

  return (
    <div id='query-5'>
      <p>Identify raters that have completed the most Task IDs.</p>
      <canvas id="myChart5" width="1000" height="700"></canvas>
    </div>
  )
}

function constructData(props) {
  const counts = {}
  for (let i = 0; i < props.length; i++) {
    const row = props[i];
    if (counts[row.raterId] === undefined) counts[row.raterId] = 1
    else counts[row.raterId]++
  }

  const sortedKeys = Object.keys(counts).sort((a, b) => {
    return counts[b] - counts[a]
  })

  const countData = []
  for (let i = 0; i < sortedKeys.length; i++) {
    const key = sortedKeys[i];
    countData.push(counts[key])
  }

  return [sortedKeys, countData]
}

function fillChart(labels, countData) {
  const ctx = document.getElementById('myChart5').getContext('2d')
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
          label: 'Count of Rater completed Task IDs',
          data: countData,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
    }
  });

  if (myChart !== null) console.log('Query5 Chart Loaded')
}

export default Query5