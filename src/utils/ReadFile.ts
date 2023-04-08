import * as XLSX from 'xlsx'
export const readExcelFile = async (file: any) => {
  const readFilePromise: Promise<string[]> = new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsBinaryString(file)
    reader.onload = (evt: any) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result
      const wb = XLSX.read(bstr, { type: 'binary' })
      /* Get first worksheet */
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws)
      /* Update state */
      let responseData = data.split('\n')
      if (responseData[responseData.length - 1] === '') responseData = responseData.slice(0, 1)
      resolve(responseData)
    }

    reader.onerror = (error) => {
      reject(error)
    }
  })
  readFilePromise.then((responseData) => {
    return responseData
  })
  return readFilePromise
}

export const readTextFile = async (file: any) => {
  const readFilePromise: Promise<string> = new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = (evt: any) => {
      const text = evt.target.result
      resolve(text)
    }

    reader.onerror = (error) => {
      reject(error)
    }
  })
  readFilePromise.then((responseData) => {
    return responseData
  })
  return readFilePromise
}

