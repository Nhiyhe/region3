import React,{useEffect, useState} from 'react';
import {Field, Form, Formik} from 'formik';
import { useAlert } from 'react-alert';
import requestAxios from '../../../../util/requestAxios';
import axios from 'axios';
import R3Card from '../../../../components/Card';
import Loading from '../../../../components/Loading';
import { DatePicker } from "formik-antd";
import { dateFormatList } from '../../../../helpers/dateHelper';
import { Table } from 'antd';


const  PzaAllocation = () => {

    const [provinces, setProvinces] = useState([]);
    const [pzadata, setPzadata] = useState([]);
    const alert = useAlert();

          
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
      title:'Province (3.5%)',
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
      if(!provinces.length) return <Loading />
    return(
       <Formik
       initialValues={{province:'', startDate: new Date().toISOString(),endDate: new Date().toISOString() }}
       onSubmit = { async (values) => {
        try{
          const {data} = await requestAxios.get(`/monetaries/pza-allocation?startDate=${values.startDate}&endDate=${values.endDate}&provinceName=${values.province}`);
          setPzadata(data.body);
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
                              {provinces.map(province => <option key={province.id} value={province.name}>{province.name}</option>) }
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
  
                      return (
                        <>
                          <Table.Summary.Row>
                          <Table.Summary.Cell></Table.Summary.Cell>
                          <Table.Summary.Cell></Table.Summary.Cell>
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
                  
                </>
           )}
       </Formik>
    )
}

export default PzaAllocation