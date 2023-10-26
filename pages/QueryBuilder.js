import React from 'react';
import { getAllDataFromHeader } from './api/dataTranformers';

import SingleQuery from './Query';

import styles from '../styles/Query.module.css';


export default function QueryBuilder(props) {

  return <>
    <div>
      <ul>
        {
          props.p_query.map((query, index) => {
            return
            <div key={index} className={styles.query_builder_preview}>
              <SingleQuery
                p_query={props.p_headerMappings[query]}
                p_headerIndex={props.p_headerIndex}
                p_currentFile={props.p_currentFile}
              />
            </div>
          })
        }
      </ul>
    </div>
  </>
}