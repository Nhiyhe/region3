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
import './NFPzaAllocation.css';
import { generatePDF } from '../../../../util/reportGenerator';

const  NFPzaAllocation = () => {

    const [provinces, setProvinces] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const alert = useAlert();
    const {userInfo, isAdmin} = useContext(AuthContext);

          
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
      title:'Men',
      dataIndex:'totalMen',
      key:'totalMen',
      width: 120
    },
    {
      title:'Women',
      dataIndex:'totalWomen',
      key:'totalWomen',
      width: 120
    },
    {
      title:'Children',
      dataIndex:'totalChildren',
      key:'totalChildren',
      width: 120
    },
    {
      title:'Marriages',
      dataIndex:'totalMarriages',
      key:'totalMarriages',
      width: 120
    },
    {
      title:'New Comer',
      dataIndex:'totalNewComers',
      key:'totalNewComer',
      width: 120
    },
    {
      title:'Workers',
      dataIndex:'totalNewWorkers',
      key:'totalNewWorkers',
      width: 120
    },
    {
      title:'Converts',
      dataIndex:'totalSoulsSaved',
      key:'totalSoulsSaved',
      width: 120
    },
    {
      title:'Baptism',
      dataIndex:'totalSoulsBaptised',
      key:'totalSoulsBaptised',
      width: 120
    },
    {
      title:'Deaths',
      dataIndex:'totalDeath',
      key:'totalDeath',
      width: 120
    },
  ]
  

    useEffect(() => {
        const source = axios.CancelToken.source();
          const getProvinces = async () => {
            try{
            const {data} = await requestAxios.get(`/provinces`,{cancelToken:source.token});
            setProvinces(data.body);
            }catch(err){
              if(axios.isCancel(err)){
                return;
              }else{
                console.error("There was a problem")
              }
            }
        }

        getProvinces();
          
          return (() => {
            source.cancel();
          })
     
      }, [])

    if(!provinces.length) return <Loading />
    
    return(
       <Formik
       initialValues={{province:'', startDate: new Date().toISOString(),endDate: new Date().toISOString() }}
       onSubmit = { async (values) => {
        try{
          const {data} = await requestAxios.get(`/attendances/report/by/country?startDate=${values.startDate}&endDate=${values.endDate}&provinceName=${values.province}`);
          setAttendance(data.body);
          }catch(err){
            console.error(err);
          }
       }}
       >
           {() => (
                <div className="NFPzaAllocation">
                  <h1 className="NFPzaAllocation-heading">Data Records by Country</h1>
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
                    {attendance.length ? <R3Card>  <Table rowKey={record => record.provinceName} title= {() => <h2>Data Records by Country</h2>} 
                    pagination={false}
                    columns={columns} 
                    dataSource={attendance}
                    summary={ pagedData => {
                      let grandTotalMen = 0;
                      let grandTotalWomen = 0;
                      let grandTotalChildren = 0;
                      let grandTotalMarriage = 0;
                      let grandTotalNewComer = 0;
                      let grandTotalWorkers = 0;
                      let grandTotalSoulsSaved = 0;
                      let grandTotalSoulsBaptised = 0;
                      let grandTotalDeath = 0;
                      pagedData.forEach(({totalMen, totalWomen, totalChildren, totalMarriages,totalNewComers,totalNewWorkers, totalSoulsSaved, totalSoulsBaptised, totalDeath }) => {
                            grandTotalMen+= totalMen;
                            grandTotalWomen+=totalWomen;
                            grandTotalChildren+=totalChildren;
                            grandTotalMarriage+=totalMarriages;
                            grandTotalNewComer+=totalNewComers;
                            grandTotalWorkers+=totalNewWorkers;
                            grandTotalSoulsSaved+=totalSoulsSaved;
                            grandTotalSoulsBaptised+=totalSoulsBaptised;
                            grandTotalDeath+=totalDeath;
                           
                      });

                      const footerData = ["", "", "", grandTotalMen, grandTotalWomen, grandTotalChildren,grandTotalMarriage,grandTotalNewComer, grandTotalWorkers,grandTotalSoulsSaved,grandTotalSoulsBaptised, grandTotalDeath];                                      
                      const reportData = pagedData.map(elt=> [elt.provinceName, elt.zoneName, elt.countryName, elt.totalMen, elt.totalWomen, elt.totalChildren, elt.totalMarriages, elt.totalNewComers, elt.totalNewWorkers, elt.totalSoulsSaved, elt.totalSoulsBaptised, elt.totalDeath]);
  
                      return (
                        <>
                          <Table.Summary.Row>
                          <Table.Summary.Cell></Table.Summary.Cell>
                          <Table.Summary.Cell><button className="btn btn-secondary" onClick={() => generatePDF(columns, reportData, "Data Records by Country",footerData, true)}>EXPORT</button></Table.Summary.Cell>
                          <Table.Summary.Cell><b>TOTAL</b></Table.Summary.Cell>
                          <Table.Summary.Cell><b>{grandTotalMen}</b></Table.Summary.Cell>
                          <Table.Summary.Cell><b>{grandTotalWomen}</b></Table.Summary.Cell>
                          <Table.Summary.Cell><b>{grandTotalChildren}</b></Table.Summary.Cell>
                          <Table.Summary.Cell><b>{grandTotalMarriage}</b></Table.Summary.Cell>
                          <Table.Summary.Cell><b>{grandTotalNewComer}</b></Table.Summary.Cell>
                          <Table.Summary.Cell><b>{grandTotalWorkers}</b></Table.Summary.Cell>
                          <Table.Summary.Cell><b>{grandTotalSoulsSaved}</b></Table.Summary.Cell>
                          <Table.Summary.Cell><b>{grandTotalSoulsBaptised}</b></Table.Summary.Cell>
                          <Table.Summary.Cell><b>{grandTotalDeath}</b></Table.Summary.Cell>
                     
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

export default NFPzaAllocation