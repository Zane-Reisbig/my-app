import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import styles from '../styles/App.module.css'

import QueryBuilder from './QueryBuilder.js';
import { assignNumericIDToHeaderRow } from './api/dataTranformers.js';
import { useFileStorage } from './api/stores.js';
import { db } from './api/db.js'

function App() {

  const [availibleQueries, setAvailibleQueries] = React.useState([""])
  const [selectValue, setSelectValue] = React.useState(-1)
  const [currentQueries, setQuery] = React.useState([]);

  let headerRow = 9
  // let myFile = useFileStorage((state) => state.fileData)
  let myFile = require('./data/processedExcelFile.json')
  let headerMapping = assignNumericIDToHeaderRow(headerRow, myFile, undefined, false)
  let decodedHeaders = Object.keys(headerMapping)

  useEffect(() => {
    console.log("currentQueries", currentQueries)
  }, [currentQueries])

  const handleQueryBuilder = () => {
    if (selectValue != -1) {
      handleRemoveQuery(selectValue)
      setQuery([...currentQueries, availibleQueries[selectValue]])
      setSelectValue(-1)
    }
  }

  const handleRemoveQuery = (index) => {
    console.log(index)

    let temp = [...availibleQueries]
    temp.splice(index, 1)
    setAvailibleQueries(temp)

    let temp2 = [...currentQueries]
    temp2.splice(index, 1)
    setQuery(temp2)

  }

  const removeFromQueryBuilderAddToAvailibleQueries = (index) => {
    let temp = [...currentQueries]
    temp.splice(index, 1)
    setQuery(temp)

    let temp2 = [...availibleQueries]
    temp2.push(currentQueries[index])
    setAvailibleQueries(temp2)
  }


  useEffect(() => {
    setAvailibleQueries(decodedHeaders)

  }, [])

  return <>
    <div>
      <h1>Excel Data</h1>
      <div id="main-content" className={styles.drop_down_anchor_div}>
        <select id="drop_down"
          onChange={(e) => setSelectValue(e.target.value)}
          value={selectValue}
          className={styles.drop_down}
        >
          <option value="-1">Select a column</option>
          {availibleQueries.map((key, index) => {
            return <option key={index} value={index}>{key}</option>
          })}

        </select>
        <button className={styles.save_query_button} onClick={handleQueryBuilder}>
          Save To Query Builder
        </button>


        <div className={styles.query_builder_preview}>
          <h2>Query Builder Preview</h2>
          <QueryBuilder
            p_query={currentQueries}
            p_handleRemoveQuery={removeFromQueryBuilderAddToAvailibleQueries}
            p_currentFile={myFile}
            p_headerIndex={headerRow}
            p_headerMappings={headerMapping}
            p_queryValue={selectValue}
          />
        </div>
      </div>
    </div>
  </>
}

export default App
