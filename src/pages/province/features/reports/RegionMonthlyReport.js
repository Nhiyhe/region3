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
      console.log(regionData);      

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
                <>
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
                    // summary={ pagedData => {
                    //   let totalRemExpected = 0;
                    //   let totalReceived = 0;
                    //   let totalProvince = 0;
                    //   let totalZone = 0;
                    //   let totalArea = 0;
                    //   pagedData.forEach(({remExpected, remReceived, province, zone, area}) => {
                    //         totalRemExpected+= remExpected;
                    //         totalReceived+= remReceived;
                    //         totalProvince+= province;
                    //         totalZone+= zone;
                    //         totalArea+= area;
                           
                    //   });
  
                    //   return (
                    //     <>
                    //       <Table.Summary.Row>
                    //       <Table.Summary.Cell></Table.Summary.Cell>
                    //       <Table.Summary.Cell></Table.Summary.Cell>
                    //       <Table.Summary.Cell><b>TOTAL</b></Table.Summary.Cell>
                    //       <Table.Summary.Cell><b>€{totalRemExpected?.toFixed(2)}</b></Table.Summary.Cell>
                    //       <Table.Summary.Cell><b>€{totalReceived?.toFixed(2)}</b></Table.Summary.Cell>
                    //       <Table.Summary.Cell><b>€{totalProvince?.toFixed(2)}</b></Table.Summary.Cell>
                    //       <Table.Summary.Cell><b>€{totalZone?.toFixed(2)}</b></Table.Summary.Cell>
                    //       <Table.Summary.Cell><b>€{totalArea?.toFixed(2)}</b></Table.Summary.Cell>
                    //       </Table.Summary.Row>
                    //     </>
                    //   )
                      
                    //  }}
                     /> 
                     </R3Card></div> : <h3>No Data Found.</h3>}
                  
                </>
           )}
       </Formik>
    )
}

export default RegionMonthlyReport