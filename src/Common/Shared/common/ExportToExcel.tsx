import React from 'react'
const FileSaver =require( "file-saver");
import * as XLSX from "xlsx";
interface Props{
  apiData:any, fileName:any
  
}



export const ExportToExcel:React.FC<Props> = ({ apiData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.;charset=UTF-8";
    const contents='center'
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData:any, fileName:any) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button className='btn btn-success' onClick={(e) => exportToCSV(apiData, fileName)}>دریافت فایل اکسل</button>
  );
};