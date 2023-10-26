import { useEffect, useState } from "react"
import React from 'react'
import { getAllDataFromHeader } from "./api/dataTranformers"

import styles from '../styles/Query.module.css';

export default function SingleQuery(props) {

  // const query = props.p_query
  // const queryValue = props.p_queryValue

  const [optionsValues, setOptionsValues] = useState([])
  const headerRow = props.p_headerIndex;
  const headerMappings = props.p_headerMappings;
  const currentFile = props.p_currentFile;

  useEffect(() => {
    setOptionsValues(handleSetOptionsValues())
  }, [])


  const handleSetOptionsValues = () => {
    return getAllDataFromHeader(headerRow, headerMappings[query], currentFile).map((value, index) => {
      return <option key={index} value={index}>{value}</option>
    })
  }

  return (
    <>
      <div>
        <h3
          className={styles.query_title_tag}
        >{query}</h3>
        <select>
          {optionsValues}
        </select>
      </div>
    </>

  )
}