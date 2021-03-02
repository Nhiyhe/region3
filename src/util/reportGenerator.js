import jsPDF from "jspdf";
import "jspdf-autotable";
import { CSVLink, CSVDownload } from "react-csv";

const generatePDF = (columns, data, reportTitle, footer, stat) => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape
  
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
  
    doc.setFontSize(15);
  
    const title = reportTitle;
    // const headers = [["ZONE", "PROVINCE"]];
    const headers = [columns.map(c => (c.key !== 'action' ? c.title : null))];
  
    // const data = pzadata.map(elt=> [elt.provinceName, elt.zoneName, elt.countryName, `€${elt.remExpected?.toFixed(2)}`, `€${elt.remReceived?.toFixed(2)}`,`€${elt.province?.toFixed(2)}`, `€${elt.zone?.toFixed(2)}`, `€${elt.area?.toFixed(2)}`]);
    let content = {
      startY: 50,
      head: headers,
      body: data,
      foot:  stat ? [footer.map(c => (c))] : [footer.map(c => (c ? `€${c.toFixed(2)}` : c))]
    };
  
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf")
}

const generateExcel = (title, headers, data) =>{
    return <CSVLink filename="" s title={title} headers={headers} data={data}></CSVLink>
}

export {generatePDF, generateExcel}