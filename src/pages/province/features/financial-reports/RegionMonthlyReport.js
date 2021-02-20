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
import './RegionMonthlyReport.css';

const  RegionMonthlyReport = () => {

    const [provinces, setProvinces] = useState([]);
    const [regionData, setRegionData] = useState([]);
    const alert = useAlert();
    const {userInfo, isAdmin} = useContext(AuthContext);

          
  const columns = [
    {
      title: 'Parish Name',
      dataIndex: '_id',
      fixed: true,
      width: 160,
    },
   
    {
      title: 'Country',
      dataIndex: 'countryName',
      fixed: true,
      width: 140,
    },
    {
      title:'Tithe',
      dataIndex:'tithe',
      key:'tithe',
      width: 140,
      render: t => (
        <>€{t?.toFixed(2)}</>
      )
    },
    {
      title:'Offering',
      dataIndex:'offering',
      key:'offering',
      width: 140,
      render: offering => (
        <> €{offering?.toFixed(2)}</>
      )
    },
    {
      title:'Totals',
      dataIndex:'totalRemOfferingAndTithe',
      key:'totalRemOfferingAndTithe',
      width:140,
      render: province => (
        <>€{province?.toFixed(2)}</>
      )
    },
    {
      title:'25% of Tithe',
      dataIndex:'regionTithe25',
      key:'regionTithe25',
      width:140,
      render: regionTithe => (
        <>€{regionTithe?.toFixed(2)}</>
      )
    },
    {
      title:'10% of Offerings',
      dataIndex:'regionOffering10',
      key:'regionOffering10',
      width:140,
      render: regionOffering => (
        <>€{regionOffering?.toFixed(2)}</>
      )
    },
    {
        title:'Total',
        dataIndex:'regionTotalOfferingAndTithe',
        key:'regionTotalOfferingAndTithe',
        width:140,
        render: regionTotalOfferingAndTithe => (
          <>€{regionTotalOfferingAndTithe?.toFixed(2)}</>
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

    if(!provinces.length) return <Loading />
    
    return(
       <Formik
       initialValues={{province:'', startDate: new Date().toISOString(),endDate: new Date().toISOString() }}
       onSubmit = { async (values) => {
        try{
          const {data} = await requestAxios.get(`/monetaries/monthly/report/by/provinces?startDate=${values.startDate}&endDate=${values.endDate}&provinceName=${values.province}`);
          setRegionData(data.body);
          }catch(err){
            console.error(err);
          }
       }}
       >
           {() => (
                <div className="RegionMonthlyReport">
                <h1 className="RegionMonthlyReport-heading">Region Monthly Report</h1>
                  <R3Card>
                    <Form>
                    <div className="form-row">
                        <div className="form-group col-4">
                         <label className="form-label">Select Province</label>

                          <Field as="select" name="province" className="form-control form-control-lg">
                              <option value="">Select all</option>
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
                    {regionData.length ? <div className="RegionMonthlyReport-table"><R3Card>  <Table  rowKey={record => record._id} title= {() => <h2>Country Performance Report</h2>} 
                    columns={columns} 
                    dataSource={regionData}
                    pagination = {false}
                    summary={ pagedData => {
                      let totalTithe = 0;
                      let totalOffering = 0;
                      let grandTotalRemOfferingAndTithe = 0;
                      let totalRegionTithe25 = 0;
                      let totalRegionOffering10 = 0;
                      let totalRegionTotalOfferingAndTithe = 0;
                      pagedData.forEach(({tithe, offering, totalRemOfferingAndTithe, regionTithe25, regionOffering10, regionTotalOfferingAndTithe}) => {
                            totalTithe+= tithe;
                            totalOffering+= offering;
                            grandTotalRemOfferingAndTithe+= totalRemOfferingAndTithe;
                            totalRegionTithe25+= regionTithe25;
                            totalRegionOffering10 +=regionOffering10;
                            totalRegionTotalOfferingAndTithe += regionTotalOfferingAndTithe;
                           
                      });
  
                      return (
                        <>
                          <Table.Summary.Row>
                          <Table.Summary.Cell></Table.Summary.Cell>
                          <Table.Summary.Cell><b>TOTAL</b></Table.Summary.Cell>
                          <Table.Summary.Cell><b>€{totalTithe?.toFixed(2)}</b></Table.Summary.Cell>
                          <Table.Summary.Cell><b>€{totalOffering?.toFixed(2)}</b></Table.Summary.Cell>
                          <Table.Summary.Cell><b>€{grandTotalRemOfferingAndTithe?.toFixed(2)}</b></Table.Summary.Cell>
                          <Table.Summary.Cell><b>€{totalRegionTithe25?.toFixed(2)}</b></Table.Summary.Cell>
                          <Table.Summary.Cell><b>€{totalRegionOffering10?.toFixed(2)}</b></Table.Summary.Cell>
                          <Table.Summary.Cell><b>€{totalRegionTotalOfferingAndTithe?.toFixed(2)}</b></Table.Summary.Cell>
                          </Table.Summary.Row>
                        </>
                      )
                      
                     }}
                     /> 
                     </R3Card></div> : <h3>No Data Found.</h3>}
                  
                </div>
           )}
       </Formik>
    )
}

export default RegionMonthlyReport