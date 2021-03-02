import React,{useContext, useEffect, useState} from 'react';
import {Field, Form, Formik} from 'formik';
import { useAlert } from 'react-alert';
import requestAxios from '../../../../util/requestAxios';
import axios from 'axios';
import R3Card from '../../../../components/Card';
import Loading from '../../../../components/Loading';
import { DatePicker } from "formik-antd";
import { dateFormatList } from '../../../../helpers/dateHelper';
import { Table } from 'antd';
import {AuthContext} from '../../../../context/AuthContext';
import jsPDF from "jspdf";
import "jspdf-autotable";
import './PzaAllocation.css';
import { generatePDF } from '../../../../util/reportGenerator';
import { CSVLink } from "react-csv";


const  PzaAllocation = () => {

    const [provinces, setProvinces] = useState([]);
    const [pzadata, setPzadata] = useState([]);
    const alert = useAlert();
    const {userInfo, isAdmin} = useContext(AuthContext);
    let footer;

          
  const columns = [
    {
      title: 'Province',
      dataIndex: 'provinceName',
      fixed: true,
      width: 140,
    },
    {
      title: 'Zone',
      dataIndex: 'zoneName',
      fixed: true,
      width: 140,
    },
    {
      title: 'Country',
      dataIndex: 'countryName',
      fixed: true,
      width: 140,
    },
    {
      title:'Rem. Expected',
      dataIndex:'remExpected',
      key:'remExpected',
      width: 140,
      render: t => (
        <>€{t?.toFixed(2)}</>
      )
    },
    {
      title:'Rem. Receieved',
      dataIndex:'remReceived',
      key:'remReceived',
      width: 140,
      render: remReceived => (
        <> €{remReceived?.toFixed(2)}</>
      )
    },
    {
      title:'Province (5.0%)',
      dataIndex:'province',
      key:'province',
      width:140,
      render: province => (
        <>€{province?.toFixed(2)}</>
      )
    },
    {
      title:'Zone (2.0%)',
      dataIndex:'zone',
      key:'zone',
      width:140,
      render: zone => (
        <>€{zone?.toFixed(2)}</>
      )
    },
    {
      title:'Area (1.5%)',
      dataIndex:'area',
      key:'area',
      width:140,
      render: area => (
        <>€{area?.toFixed(2)}</>
      )
    },
  ]
  

    useEffect(() => {
        const source = axios.CancelToken.source();
          const getProvinces = async () => {
            try{
            const {data} = await requestAxios.get(`/provinces`,{cancelToken:source.token});
            setProvinces(data.body);
            }catch(err){
              if(err.response && err.response.data){
                alert.error(err.response.data.message);
              }else{
              alert.error("An unexpected error occured.");
              }
            }
        }

        getProvinces();
          
          return (() => {
            source.cancel();
          })
     
      }, [])

      // const exportPDF = () => {
      //   const unit = "pt";
      //   const size = "A4"; // Use A1, A2, A3 or A4
      //   const orientation = "landscape"; // portrait or landscape
      
      //   const marginLeft = 40;
      //   const doc = new jsPDF(orientation, unit, size);
      
      //   doc.setFontSize(15);
      
      //   const title = "My Awesome Report";
      //   // const headers = [["ZONE", "PROVINCE"]];
      //   const headers = [columns.map(c => (c.title))];
      
      //   const data = pzadata.map(elt=> [elt.province, elt.zone, elt.countryName, elt.remExpected, elt.remReceived,elt.province, elt.zone, elt.area]);
      
      //   let content = {
      //     startY: 50,
      //     head: headers,
      //     body: data,
      //     // foot:footer
      //   };
      
      //   doc.text(title, marginLeft, 40);
      //   doc.autoTable(content);
      //   doc.save("report.pdf")
      // }
      
     

    if(!provinces.length) return <Loading />
    
    
    return(
       <Formik
       initialValues={{province:'', startDate: new Date().toISOString(),endDate: new Date().toISOString() }}
       onSubmit = { async (values) => {
        try{
          const {data} = await requestAxios.get(`/monetaries/pza-allocation?startDate=${values.startDate}&endDate=${values.endDate}&provinceName=${values.province}`);
          setPzadata(data.body.map((data, index) => ({id:index, area:data.area, countryName:data.countryName, province:data.province, provinceName:data.provinceName, remExpected:data.remExpected, remReceived:data.remReceived, zone:data.zone, zoneName:data.zoneName})));
          }catch(err){
            console.error(err);
          }
       }}
       >
           {() => (
                <div className="PzaAllocation">
                <h1 className="PzaAllocation-heading">PZA Allocation</h1>
                {/* <button onClick= {() => exportPDF()}>Generate</button> */}
                  <R3Card>
                    <Form>
                    <div className="form-row">
                        <div className="form-group col-4">
                         <label className="form-label">Select Province</label>

                          <Field as="select" name="province" className="form-control form-control-lg">
                              {isAdmin() && <option value="">Select all</option>}
                              {isAdmin() && provinces.map((province) => {
                              return <option key={province.id} value={province.name}>{province.name}</option>;
                              })}
                              { !isAdmin() && provinces.filter((prov => prov.pastor.id === userInfo.id)).map((province) => {
                              return <option key={province.id} value={province.name}>{province.name}</option>;
                              })}
                          </Field>
                      </div>
                      <div className="form-group col-3">
                              <label className="form-label">Start Date</label>
                              <DatePicker name="startDate" placeholder="Start Date" className="form-control form-control-lg" format={dateFormatList[0]} />
                          </div>
                          <div className="form-group col-3">
                              <label className="form-label">End Date</label>
                              <DatePicker name="endDate" placeholder="End Date" className="form-control form-control-lg" format={dateFormatList[0]} />
                          </div>
                          <div className="form-group col-2">
                            <button type="submit" className="mt-5 btn btn-primary btn-lg btn-block">Search</button>
                          </div>
                 
                    </div>
                    </Form>
                  </R3Card>
                    {pzadata.length ? <R3Card>  <Table rowKey={record => record.id} title= {() => <h2>Pza Allocation</h2>} 
                    pagination={false}
                    columns={columns} 
                    dataSource={pzadata}
                    summary={ pagedData => {
                      let totalRemExpected = 0;
                      let totalReceived = 0;
                      let totalProvince = 0;
                      let totalZone = 0;
                      let totalArea = 0;
                      pagedData.forEach(({remExpected, remReceived, province, zone, area}) => {
                            totalRemExpected+= remExpected;
                            totalReceived+= remReceived;
                            totalProvince+= province;
                            totalZone+= zone;
                            totalArea+= area;
                           
                      });
                      const footerData = ["","","", totalRemExpected, totalReceived, totalProvince,totalZone, totalArea];
                      const reportData = pagedData.map(elt=> [elt.provinceName, elt.zoneName, elt.countryName, `€${elt.remExpected?.toFixed(2)}`, `€${elt.remReceived?.toFixed(2)}`,`€${elt.province?.toFixed(2)}`, `€${elt.zone?.toFixed(2)}`, `€${elt.area?.toFixed(2)}`]);
                      // const excelReportData = pagedData.map(elt => (elt.provinceName, elt.zoneName, elt.countryName, `€${elt.remExpected?.toFixed(2)}`, `€${elt.remReceived?.toFixed(2)}`,`€${elt.province?.toFixed(2)}`, `€${elt.zone?.toFixed(2)}`, `€${elt.area?.toFixed(2)}`));
                      
                      return (
                        <>
                          <Table.Summary.Row>
                          {/* <Table.Summary.Cell><CSVLink className="btn btn-info" data={pagedData} headers={columns.map(c => ({label:c.title, key:c.dataIndex}))}>Export to Excel</CSVLink></Table.Summary.Cell> */}
                          <Table.Summary.Cell><button className="btn btn-secondary" onClick={() => generatePDF(columns, reportData, "PZA Allocation",footerData)}>EXPORT</button></Table.Summary.Cell>
                          <Table.Summary.Cell><b>TOTAL</b></Table.Summary.Cell>
                          <Table.Summary.Cell><b>€{totalRemExpected?.toFixed(2)}</b></Table.Summary.Cell>
                          <Table.Summary.Cell><b>€{totalReceived?.toFixed(2)}</b></Table.Summary.Cell>
                          <Table.Summary.Cell><b>€{totalProvince?.toFixed(2)}</b></Table.Summary.Cell>
                          <Table.Summary.Cell><b>€{totalZone?.toFixed(2)}</b></Table.Summary.Cell>
                          <Table.Summary.Cell><b>€{totalArea?.toFixed(2)}</b></Table.Summary.Cell>
                          </Table.Summary.Row>
                        </>
                      )
                      
                     }}
                     /> 
                     </R3Card> : <h3>No Data Found.</h3>}
                  
                </div>
           )}
       </Formik>
    )

    
}

export default PzaAllocation;

