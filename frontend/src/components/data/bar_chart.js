import React, {useState, useContext, useEffect} from 'react'
import {
  select, max, scaleLinear,
  scaleBand, axisLeft,
  axisBottom, selectAll,
  format,
} from 'd3'

// contexts
import {DataContext} from './data'

//css
import './barchart.css'

function BarChart() {
  const data = useContext(DataContext)
  const [counts, setCounts] = useState({})
  const [type, setType] = useState('threeMatch')

  useEffect(() => {
    setCounts(aggregateData(data))
  }, [data])

  useEffect(() => {
    createBarChart(Object.values(counts), type)
  }, [counts, type])
  
  return (
    <div className='data-barchart'>
      <h1>Bar Chart of Raw Data</h1>
      {buttonTypes(setType)}
      <svg width={1000} height={700}></svg>
    </div>
  )
}


function buttonTypes(setType) {
  const types = [
    'threeMatch', 'fiveMatch',
    'Low', 'Average', 'High',
    'Bad', 'Okay', 'Intermediate', 'Great', 'Exceptional',
    'total',
  ]
  
  return types.map(t => 
    <button key={t} onClick={(e) => handleClick(e, setType)}>
      {t}
    </button>
  )
}

function handleClick(e, setType) {
  setType(e.target.innerText)
}


const aggregateData = arr => {
  const hash = {}
  for (let i = 0; i < arr.length; i++) {
    const model = arr[i];
    if (hash[model.raterId] === undefined) {
      hash[model.raterId] = createPojo(model)
    } else updatePojo(hash, model)
  }
  return hash
}

function updatePojo(hash, model) {
  const curr = hash[model.raterId]
  updateAttr(curr, model.fiveMatch, 'fiveMatch')
  updateAttr(curr, model.threeMatch, 'threeMatch')
  updateAttr(curr, model.raterAnswers3)
  updateAttr(curr, model.raterAnswers5)
  curr['total']++
}

function createPojo(model) {
  const pojo = {name: model.raterId, total: 1}
  pojo.fiveMatch = 0
  pojo.threeMatch = 0
  updateAttr(pojo, model.raterAnswers3)
  updateAttr(pojo, model.raterAnswers5)
  return pojo
}

function updateAttr(obj, val, col = null) {
  if (col !== null && val === true) obj[col]++
  else if (obj[val] === undefined) obj[val] = 1
  else obj[val]++
}

const createBarChart = (countsData, type) => {
  if (countsData.length < 1) return
  selectAll("svg > *").remove()

  // alphabetical sort
  if (type === 'threeMatch' || type === 'fiveMatch') {
    countsData.sort((a, b) => {
      const aPercent = (a[type] / a['total'])
      const bPercent = (b[type] / b['total'])
      return bPercent - aPercent
    })
  } else {
    countsData.sort((a, b) => {
      const bCount = b[type] || 0
      const aCount = a[type] || 0
      return bCount - aCount
    })
  }

  const svg = select('svg')
  const width = +svg.attr('width')
  const height = +svg.attr('height')
  // const numTicks = 5

  let xValue = d => d[type] || 0
  if (type === 'threeMatch' || type === 'fiveMatch') {
    xValue = d => {
      return (d[type] / d['total']) * 100
    }
  }
  const yValue = d => d.name
  const margin = {top: 50, right: 50, bot: 50, left: 50}

  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bot

  const xScale = scaleLinear()
    .domain([0, max(countsData, xValue)])
    .range([0, innerWidth])

  const yScale = scaleBand()
    .domain(countsData.map(yValue))
    .range([0, innerHeight])
    .padding(0.1)

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  g.append('g')
    .call(axisLeft(yScale))
    .selectAll('.domain, .tick line').remove()

  const xAxis = axisBottom(xScale)
    .tickFormat(format(',d'))
    .tickSize(-innerHeight)
    // .ticks(numTicks)


  const xAxisG = g.append('g')
    .call(xAxis)
    .attr('transform', `translate(0, ${innerHeight})`)

  xAxisG.append('text')
    .attr('y', 40)
    .attr('x', innerWidth / 2)
    .attr('fill', 'black')
    .text(`Count of ${type}`)

  g.selectAll('rect').data(countsData)
    .enter().append('rect')
    .attr('y', d => yScale(yValue(d)))
    .attr('width', d => xScale(xValue(d)))
    .attr('height', yScale.bandwidth())

}

export default BarChart