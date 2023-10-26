import { revalidatePath } from 'next/cache.js';
import { db } from './db.js'
// 2d array of excel data is what were handling

function stripEmptyHeaders(headerObj) {
  let returnOb = {};
  for (const [key, value] of Object.entries(headerObj)) {
    if (key) {
      returnOb[key] = value;
    }
  }
  return returnOb;
}

function invertObject(obj) {
  let returnOb = {};
  for (const [key, value] of Object.entries(obj)) {
    returnOb[value] = key;
  }
  return returnOb;
}

export function assignNumericIDToHeaderRow(headerRowIndex, array, stripEmpty = true, invert = false) {
  let headerRow = array[headerRowIndex];
  let returnOb = {};
  if (headerRow === undefined) {
    return returnOb;
  }
  headerRow.forEach(
    (header, index) => {
      returnOb[header] = index;
    }
  );

  if (stripEmpty) {
    returnOb = stripEmptyHeaders(returnOb);
  }

  if (invert) {
    returnOb = invertObject(returnOb);
  }

  return returnOb;

}


export function getAllDataFromHeader(headerRow, headerIndex, a_2array, removeDuplicates = true) {
  //how to query a_2array[all][headerIndex]
  if (a_2array === undefined) {
    return [];
  }

  let returnArray = [];
  a_2array = a_2array.slice(headerRow + 1, a_2array.length);
  a_2array.forEach((row, index) => {
    const neededValue = row[headerIndex];
    returnArray.push(neededValue);
  });

  if (removeDuplicates) {
    returnArray = [...new Set(returnArray)];
  }

  return returnArray;
}