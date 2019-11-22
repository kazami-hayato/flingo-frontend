import XLSX from 'xlsx'

export function json_from_sheet(file) {
  const data = file
  this.loading = true
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => {
      const data = e.target.result
      const workbook = XLSX.read(data, { type: 'array' })
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]
      const header = this.getHeaderRow(worksheet)
      const results = XLSX.utils.sheet_to_json(worksheet)
      this.generateData({ header, results })
      this.loading = false
      resolve()
    }
    reader.readAsArrayBuffer(rawFile)
  })
  console.log(data)
  // const workbook = XLSX.read(data, { type: 'array' })
  // const firstSheetName = workbook.SheetNames[0]
  // const worksheet = workbook.Sheets[firstSheetName]
  // const header = this.getHeaderRow(worksheet)
  // const results = XLSX.utils.sheet_to_json(worksheet)
  // console.log(results)
  // this.generateData({ header, results })
}

