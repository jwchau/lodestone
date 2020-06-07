import React, {useEffect} from 'react'
import Chart from 'chart.js'

function Query2({props}) {

  useEffect(() => {
    if (props.length > 0) {
      fillChart(...constructData(props))
    }
  }, [props.length, props])

  return (
    <div id='query-2'>
      <p>What is the agreement rate between the engineer and all the raters for each week?</p>
      <canvas id="myChart2" width="1000" height="700"></canvas>
    </div>
  )
}

function constructData(props) {
  let threeMatchDates = {}
  let fiveMatchDates = {}
  let counts = {}

  for (let i = 0; i < props.length; ++i) {
    const curr = props[i]
    const date = curr.date.slice(0, 10)

    if (threeMatchDates[date] === undefined) {
      counts[date] = 0
      threeMatchDates[date] = 0
      fiveMatchDates[date] = 0
    }

    counts[date]++
    if (curr.threeMatch) threeMatchDates[date]++
    if (curr.fiveMatch) fiveMatchDates[date]++
  }

  const sortedDates = Object.keys(threeMatchDates)
    .sort((a, b) => new Date(a) - new Date(b))

  const sortedThreeMatchDates = []
  const sortedFiveMatchDates = []

  for (let i = 0; i < sortedDates.length; i++) {
    const key = sortedDates[i]
    sortedThreeMatchDates.push(threeMatchDates[key])
    sortedFiveMatchDates.push(fiveMatchDates[key])
  }

  const days = []
  threeMatchDates = []
  fiveMatchDates = []

  let totalDays = 0
  let agreeThree = 0
  let agreeFive = 0

  for (let i = 0; i < sortedDates.length; i++) {
    if (i % 8 === 7) {
      days.push(sortedDates[i])
      threeMatchDates.push(agreeThree / totalDays)
      fiveMatchDates.push(agreeFive / totalDays)

      totalDays = 0
      agreeThree = 0
      agreeFive = 0
    }

    totalDays += counts[sortedDates[i]]
    agreeThree += sortedThreeMatchDates[i]
    agreeFive += sortedFiveMatchDates[i]
  }

  return [days, threeMatchDates, fiveMatchDates]
}

function fillChart(dates, threePercentages, fivePercentages) {
  const ctx = document.getElementById('myChart2').getContext('2d')
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: dates,
        datasets: [{
          label: 'Three Answer %',
          data: threePercentages,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Five Answer %',
          data: fivePercentages,
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
  if (myChart !== null) console.log('Query2 Chart Loaded')
}

export default Query2
