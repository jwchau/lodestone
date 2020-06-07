import React, {useState, useContext} from 'react'
import {DataContext} from './data'

// query components
import Query1 from './queries/query1'
import Query2 from './queries/query2'
import Query3 from './queries/query3'
import Query5 from './queries/query5'
import Query7 from './queries/query7'
import Query8 from './queries/query8'
import Query9 from './queries/query9'

function DataQueries() {
  const data = useContext(DataContext)
  const [activeQuery, setActiveQuery] = useState(0)
  

  function handleQuerySelector(e) {
    setActiveQuery(+e.target.value)
  }

  return (
    <div className='data-queries'>
      <select onChange={handleQuerySelector} name="query-number" id="query-selector">
        <option value="0" defaultValue>None</option>
        <option value="1">Daily Agreement Rates</option>
        <option value="2">Weekly Agreement Rates</option>
        <option value="3">Rater Agreement Rates</option>
        <option value="5">Rater Task Completion</option>
        <option value="7">3 Label Precision/Recall Rates</option>
        <option value="8">5 Label Precision/Recall Rates</option>
        <option value="9">Combined 3 and 5 label Agreement Rates</option>
      </select>
      {renderQuery(data, activeQuery)}
      
    </div>
  )
}

function renderQuery(data, activeQuery) {
  if (activeQuery === 1) return <Query1 props={data}/>
  else if (activeQuery === 2) return <Query2 props={data}/>
  else if (activeQuery === 3) return <Query3 props={data}/>
  else if (activeQuery === 5) return <Query5 props={data}/>
  else if (activeQuery === 7) return <Query7 props={data}/>
  else if (activeQuery === 8) return <Query8 props={data}/>
  else if (activeQuery === 9) return <Query9 props={data}/>
}

export default DataQueries
