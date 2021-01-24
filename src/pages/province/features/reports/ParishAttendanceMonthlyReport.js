import { Formik, Field, Form } from 'formik';
import React, { useContext, useState, useEffect } from 'react';
import {Table} from 'antd';
import {AuthContext} from '../../../../context/AuthContext';
import axios from 'axios';
import requestAxios from '../../../../util/requestAxios';
import R3Card from '../../../../components/Card';
import { useAlert } from 'react-alert';
import moment from 'moment';
import { dateFormatList } from '../../../../helpers/dateHelper';
import { DatePicker } from "formik-antd";
import Loading from '../../../../components/Loading';

const ParishAttendanceMonthlyReport = () => {
    const alert = useAlert();
    const {userInfo, isAdmin} = useContext(AuthContext);
    const [provinces, setProvinces] = useState([]);
    const [zones, setZones] = useState([]);
    const [countries, setCountries] = useState([]);
    const [parishes, setParishes] = useState([]);
    const [attendanceStat, setAttendanceStat] = useState([]);
    const [parish, setParish] = useState([]);
    const [provinceId, setProvinceId] = useState("5fc5d6236c07300004aea00c");
    const [parishId, setParishId] = useState("5fc5d6236c07300004aea00c");
    const [zoneId, setZoneId] = useState("5fc5d6236c07300004aea00c");
    const [countryId, setCountryId] = useState("5fc5d6236c07300004aea00c");
    const [disableZoneDropdownList, setDisableZoneDropdownList] = useState(true);
    const [disableCountryDropdownList, setDisableCountryDropdownList] = useState(true);
    const [pagination, setPagination] = useState({page:1, limit:10})

    
    
    useEffect(() => {
        const source = axios.CancelToken.source();
        const getProvinces = async () => {
          try{
            const { data } = await requestAxios.get("/provinces",{cancelToken:source.token});
            setProvinces(data.body);
          }catch(err){
            if(err.response && err.response.data){
              alert.error(err.response.data.message);
            }else{
            alert.error("An unexpected error occured.");
            }
          }
        };
          getProvinces();
  
          return (() => {
            source.cancel();
          })
     
      }, [])
  

    useEffect(() => {

        const source = axios.CancelToken.source();
        const getZonesByProvinceId = async () => {
          try{
            const { data } = await requestAxios.get(`/provinces/${provinceId}/zones`, {cancelToken:source.token});
            setZones(data.body);
          }
          catch(err){
            if(err.response && err.response.data){
              alert.error(err.response.data.message);
            }else{
            alert.error("An unexpected error occured.");
            }
        };
      }
        getZonesByProvinceId();
  
        return (() => {
          source.cancel();
        })
        
      },[provinceId])
  
      useEffect(() => {
        const source = axios.CancelToken.source();
  
        const getCountriesByZoneId = async (zoneId) => {
          try{
            const {data} = await requestAxios.get(`zones/${zoneId}/countries`, {cancelToken:source.token});
            setCountries(data.body);
          }catch(err){
            if(err.response && err.response.data){
              alert.error(err.response.data.message);
            }else{
            alert.error("An unexpected error occured.");
            }
          }
        }
        getCountriesByZoneId(zoneId);
  
        return (() => {
          source.cancel();
        })
      },[zoneId])

        
      useEffect(() => {
        const source = axios.CancelToken.source();
  
        const getParishesByCountryId = async () => {
          try{
            const {data} = await requestAxios.get(`countries/${countryId}/parishes`, {cancelToken:source.token});
            setParishes(data.body);
          }catch(err){
            if(err.response && err.response.data){
              alert.error(err.response.data.message);
            }else{
            alert.error("An unexpected error occured.");
            }
          }
        }
        getParishesByCountryId();
  
        return (() => {
          source.cancel();
        })
      },[countryId])


         
      useEffect(() => {
        const source = axios.CancelToken.source();
  
        const getParishById = async () => {
          try{
            const {data} = await requestAxios.get(`parishes/${parishId}`, {cancelToken:source.token});
            setParish(data.body);
          }catch(err){
            if(err.response && err.response.data){
              alert.error(err.response.data.message);
            }else{
            alert.error("An unexpected error occured.");
            }
          }
        }
        getParishById();
  
        return (() => {
          source.cancel();
        })
      },[parishId])

        
       
  const columns = [
    {
      title: 'Total Men',
      dataIndex: 'totalMen',
      fixed: true,
      width: 140,
    },
    {
      title:'Total Women',
      dataIndex:'totalWomen',
      key:'totalWomen',
      width: 140,
    },
    {
        title:'Total Children',
        dataIndex:'totalChildren',
        key:'totalChildren',
        width: 140,
      },
      {
        title:'Total New Comer',
        dataIndex:'totalNewComer',
        key:'totalNewComer',
        width: 140,
      },
      {
        title:'Total Attendance',
        dataIndex:'totalAttendance',
        key:'totalAttendance',
        width: 140,
      },
      {
        title:'Average Attendance',
        dataIndex:'averageAttendance',
        key:'averageAttendance',
        width: 140,
        render: avgAtt => (
            <>{Math.round(avgAtt)}</>
        )
      },  
  ]
  
  if(!provinces.length) return <Loading />

   return(
       <Formik
       initialValues={{startDate: new Date().toISOString(),endDate: new Date().toISOString()}}
       onSubmit={ async (values) => {
         try{
           const {data} = await requestAxios.get(`/attendances/${parishId}/monthly-stats?startDate=${values.startDate}&endDate=${values.endDate}`);
           setAttendanceStat(data.body);
       }catch(err){
       }
       }}
       
       >
           {() => (
               <>
                <div className="col-6 offset-3">
                <R3Card>                
                   <Form>
                  <div className="container">
                        <div className="">
                        <div className="form-group">
                            <label className="form-label" htmlFor="province">Province</label>
                            <Field as="select" name="province" className="form-control form-control-lg" id="province" onChange={(e) => {
                              if(e.target.value)
                                setProvinceId(e.target.value);
                                // getProvincePastor(e.target.value);
                                setZones([]);
                                setDisableZoneDropdownList(false);
                                setCountries([]);
                                setDisableCountryDropdownList(true);
                            }}>
                              <option value="">Select Province</option>
                              {isAdmin() && provinces.map((province) => {
                              return <option key={province.id} value={province.id}>{province.name}</option>;
                              })}
                              { !isAdmin() && provinces.filter((prov => prov.pastor.id === userInfo.id)).map((province) => {
                              return <option key={province.id} value={province.id}>{province.name}</option>;
                              })}
                            </Field>
                        </div>
        
                        <div className="form-group">
                          <label>Zone</label>
                          <Field as="select" name="zone" className="form-control form-control-lg" onChange={(e) => {
                            if (e.target.value)
                              setZoneId(e.target.value);
                              setDisableCountryDropdownList(false);
                          }} disabled={disableZoneDropdownList}>
                            <option value="">Select Zone</option>
                            {zones.map((zone) => {
                                return <option key={zone.id} value={zone.id}>{zone.name}</option>
                            })}
                          </Field>
                        </div>
        
                      <div className="form-group">
                        <label>Country</label>
                        <Field as="select" name="country" className="form-control form-control-lg" onChange={(e) => {
                            if(e.target.value){
                                setCountryId(e.target.value);
                            }
                        }} disabled = {disableCountryDropdownList}>
                          <option value="">Select Country</option>
                          {countries.map((country) => {
                              return <option key={country.id} value={country.id}>{country.countryName}</option>
                          })}
                        </Field>
                      </div> 

                      <div className="form-group mb-5">
                        <label>Parish</label>
                        <Field as="select" name="parishes" className="form-control form-control-lg" onChange={(e) => {
                            if(e.target.value){
                                setParishId(e.target.value);
                            }
                        }} disabled = {disableCountryDropdownList}>
                          <option value="">Select Parish</option>
                          {parishes.map((parish) => {
                              return <option key={parish.id} value={parish.id}>{parish.name}</option>
                          })}
                        </Field>
                      </div>

                       <div className="form-row">
                          
                          <div className="form-group col-6">
                              <label className="form-label">Start Date</label>
                              <DatePicker name="startDate" placeholder="Start Date" className="form-control form-control-lg" format={dateFormatList[0]} />
                          </div>
                          <div className="form-group col-6">
                              <label className="form-label">End Date</label>
                              <DatePicker name="endDate" placeholder="End Date" className="form-control form-control-lg" format={dateFormatList[0]} />
                          </div>
                      </div> 
                        <input type="submit" value="Search" className="btn btn-primary btn-block btn-lg mt-5" />
                    </div>
                  </div>
                  </Form>
                </R3Card>
              </div>
               
               { attendanceStat.length ?  <Table rowKey ={record => record.totalMen} columns={columns} dataSource={attendanceStat} pagination={false}/> : null}
               </>
           )}
       </Formik>
   )
}

export default ParishAttendanceMonthlyReport;