import Router from 'next/router';
import React, { createElement } from 'react';
import { useFileStorage } from './api/stores.js';
import { clearCachesByServerAction } from './api/dataTranformers.js';


import styles from '../styles/ExcelFileLoader.module.css';

const ExcelJS = require('exceljs');

function Loader() {

    const [requiredMessage, setRequiredMessage] = React.useState('');
    const [isfileDataSet, setIsFileData] = React.useState(false);
    const [headerRowIndex, setHeaderRowIndex] = React.useState(11);


    const handleDropArea = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const files = e.dataTransfer.files;

        if (files.length > 0) {
            const file = files[0];
            const reader = new FileReader();

            reader.onload = () => {
                const myData = reader.result;
                const workbook = new ExcelJS.Workbook();

                workbook.xlsx.load(myData).then(wb => {
                    const ws = wb.worksheets[0];
                    const data = [];
                    ws.eachRow((row, rowNumber) => {
                        const rowData = [];
                        row.eachCell((cell, colNumber) => {
                            rowData.push(cell.value);
                        });
                        data.push(rowData);
                    });
                    useFileStorage.setState({ fileData: data });
                    setIsFileData(true);
                    console.log(data);
                });

            };

            reader.readAsArrayBuffer(file);

        }
        else {
            alert('No files found');
        }

    }

    const goToNextPage = () => {

        Router.push({
            pathname: '/App',
        })
    }

    const renderDropArea = () => {
        return (
            <div className={styles.drop_area} onDrop={handleDropArea} onDragOver={(e) => e.preventDefault()}>
                <div className={styles.drop_area_text} >Drop The File Here...</div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            {isfileDataSet ? <p>File Accepted</p> : renderDropArea()}
            <div className={styles.header_row}>
                <p>Header Row</p>
                <input type="number" min="1" value={11} onChange={(e) => setHeaderRowIndex(e.target.value)} />
                <p>{requiredMessage}</p>
            </div>
            <div className={styles.button_container}>
                <button className={styles.button} onClick={goToNextPage}>Next</button>
            </div>
        </div>
    )

}

export default Loader
