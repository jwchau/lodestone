import React, {useState, useEffect} from 'react'
import Axios from 'axios'

// d3 components
import BarChart from './bar_chart'
import DataQueries from './data_queries'

// contexts
export const DataContext = React.createContext() 

function Data() {
  const [data, setData] = useState([])

  useEffect(() => {
    Axios.get('/api/data/rater_data')
      .then(res => {
        setData(res.data)
      })
  }, [])


  // DISPLAY TABLE OF RAW DATA
  // function columnNames() {
  //   return (
  //     <tr>
  //       <th>Date</th>
  //       <th>Rater ID</th>
  //       <th>Task ID</th>
  //       <th>Correct Answers 3</th>
  //       <th>Correct Answers 5</th>
  //       <th>Rater Answers 3</th>
  //       <th>Rater Answers 5</th>
  //       <th>Match on 3</th>
  //       <th>Match on 5</th>
  //     </tr>
  //   )
  // }

  // function rowsOfData(data) {
  //   return data.map(d =>
  //       <tr key={d._id}>
  //         <td>{d.date.slice(0, 10)}</td>
  //         <td>{d.raterId}</td>
  //         <td>{d.taskId}</td>
  //         <td>{d.correctAnswers3}</td>
  //         <td>{d.correctAnswers5}</td>
  //         <td>{d.raterAnswers3}</td>
  //         <td>{d.raterAnswers5}</td>
  //         <td>{`${d.threeMatch}`}</td>
  //         <td>{`${d.fiveMatch}`}</td>
  //       </tr>
  //     )
  // }

  return (
    <div className='data-container'>
      <h1>I am Big Data</h1>

      <DataContext.Provider value={data}>
        <BarChart/>
        <DataQueries/>
      </DataContext.Provider>

      {/* <table className='data-table'>
        raw data in the form of a table
        <tbody>
          {columnNames()}
          {rowsOfData(data)}
        </tbody>
      </table> */}
    </div>
  )
}

/* 
Step 6 (optional):
  SELECT * FROM raterdatas 
  WHERE cast (datediff (day, 0, date) as datetime) = '2005-10-06'
*/

export default Data