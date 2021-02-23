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
import './ParishAttendanceMonthlyReport.css';

const ParishAttendanceMonthlyReport = () => {
    const alert = useAlert();
    const {userInfo, isAdmin} = useContext(AuthContext);
    const [provinces, setProvinces] = useState([]);
    const [zones, setZones] = useState([]);
    const [countries, setCountries] = useState([]);
    const [parishes, setParishes] = useState([]);
    const [attendances, setAttendances] = useState([]);
    const [attendanceStat, setAttendanceStat] = useState([]);
    const [parish, setParish] = useState([]);
    const [provinceId, setProvinceId] = useState("5fc5d6236c07300004aea00c");
    const [parishId, setParishId] = useState("5fc5d6236c07300004aea00c");
    const [zoneId, setZoneId] = useState("5fc5d6236c07300004aea00c");
    const [countryId, setCountryId] = useState("5fc5d6236c07300004aea00c");
    const [showSearchByDate, setShowSearchByDate] = useState(false);
    const [disableZoneDropdownList, setDisableZoneDropdownList] = useState(true);
    const [getAllAttendances, setGetAllAttendances] = useState(true);
    const [getAllAttendancesByProvinceId, setGetAllAttendancesByProvinceId] = useState(false);
    const [getAllAttendancesByZoneId, setGetAllAttendancesByZoneId] = useState(false);
    const [getAllAttendancesByCountryId, setGetAllAttendancesByCountryId] = useState(false);
    const [disableCountryDropdownList, setDisableCountryDropdownList] = useState(true);
    const [disableParishDropdownList, setDisableParishDropdownList] = useState(true);
    const [pagination, setPagination] = useState({page:1, limit:10});
    const [isLoading, setIsLoading] = useState(true);

    
    
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
        const getAllAttendances = async () => {
          try{
            const { data } = await requestAxios.get("/attendances",{cancelToken:source.token});
            setAttendances(data.body);
            setIsLoading(false);
          }catch(err){
            if(err.response && err.response.data){
              alert.error(err.response.data.message);
            }else{
            alert.error("An unexpected error occured.");
            }
          }
        };
          getAllAttendances();
  
          return (() => {
            source.cancel();
          })
     
      }, [getAllAttendances])
  

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
      const getAttendancesByProvinceId = async () => {
        try{
          const { data } = await requestAxios.get(`/provinces/${provinceId}/attendances`, {cancelToken:source.token});
          setAttendances(data.body);
          setIsLoading(false);
        }
        catch(err){
          if(err.response && err.response.data){
            alert.error(err.response.data.message);
          }else{
          alert.error("An unexpected error occured.");
          }
      };
    }
      getAttendancesByProvinceId();

      return (() => {
        source.cancel();
      })
      
    },[provinceId])

    useEffect(() => {
      const source = axios.CancelToken.source();
      const getAttendancesByProvinceId = async () => {
        try{
          const { data } = await requestAxios.get(`/provinces/${provinceId}/attendances`, {cancelToken:source.token});
          setAttendances(data.body);
          setIsLoading(false);
        }
        catch(err){
          if(err.response && err.response.data){
            alert.error(err.response.data.message);
          }else{
          alert.error("An unexpected error occured.");
          }
      };
    }
      getAttendancesByProvinceId();

      return (() => {
        source.cancel();
      })
      
    },[getAllAttendancesByProvinceId])
  
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
  
        const getAttendancesByZoneId = async (zoneId) => {
          try{
            const {data} = await requestAxios.get(`zones/${zoneId}/attendances`, {cancelToken:source.token});
            setAttendances(data.body);
            setIsLoading(false);
          }catch(err){
            if(err.response && err.response.data){
              alert.error(err.response.data.message);
            }else{
            alert.error("An unexpected error occured.");
            }
          }
        }
        getAttendancesByZoneId(zoneId);
  
        return (() => {
          source.cancel();
        })
      },[zoneId])

              
      useEffect(() => {
        const source = axios.CancelToken.source();
  
        const getAttendancesByZoneId = async (zoneId) => {
          try{
            const {data} = await requestAxios.get(`zones/${zoneId}/attendances`, {cancelToken:source.token});
            setAttendances(data.body);
            setIsLoading(false);
          }catch(err){
            if(err.response && err.response.data){
              alert.error(err.response.data.message);
            }else{
            alert.error("An unexpected error occured.");
            }
          }
        }
        getAttendancesByZoneId(zoneId);
  
        return (() => {
          source.cancel();
        })
      },[getAllAttendancesByZoneId])


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
  
        const getAttendancesByCountryId = async () => {
          try{
            const {data} = await requestAxios.get(`countries/${countryId}/attendances`, {cancelToken:source.token});
            setAttendances(data.body);
            setIsLoading(false);
          }catch(err){
            if(err.response && err.response.data){
              alert.error(err.response.data.message);
            }else{
            alert.error("An unexpected error occured.");
            }
          }
        }
        getAttendancesByCountryId();
  
        return (() => {
          source.cancel();
        })
      },[countryId])

      useEffect(() => {
        const source = axios.CancelToken.source();
  
        const getAttendancesByCountryId = async () => {
          try{
            const {data} = await requestAxios.get(`countries/${countryId}/attendances`, {cancelToken:source.token});
            setAttendances(data.body);
            setIsLoading(false);
          }catch(err){
            if(err.response && err.response.data){
              alert.error(err.response.data.message);
            }else{
            alert.error("An unexpected error occured.");
            }
          }
        }
        getAttendancesByCountryId();
  
        return (() => {
          source.cancel();
        })
      },[getAllAttendancesByCountryId])


      useEffect(() => {
        const source = axios.CancelToken.source();
  
        const getAttendancesByParishId = async () => {
          try{
            const {data} = await requestAxios.get(`parishes/${parishId}/attendances`, {cancelToken:source.token});
            setAttendances(data.body);
            setIsLoading(false);
          }catch(err){
            if(err.response && err.response.data){
              alert.error(err.response.data.message);
            }else{
            alert.error("An unexpected error occured.");
            }
          }
        }
        getAttendancesByParishId();
  
        return (() => {
          source.cancel();
        })
      },[parishId])

         
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
    // {
    //   title:'Province',
    //   dataIndex:'province',
    //   key:'province'
    // },
    // {
    //   title:'Zone',
    //   dataIndex:'zone',
    //   key:'zone'
    // },
    // {
    //   title:'Country',
    //   dataIndex:'country',
    //   key:'country'
    // },
    {
      title:'Parish',
      dataIndex:'parish',
      key:'parish'
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key:'createdAt',
      render: date => (
        <>{moment(date).format(dateFormatList[0])}</>
      ),
      // fixed: true,
      // width: 140,
    },
    {
      title: 'Men',
      dataIndex: 'men',
     
    },
    {
      title:'Women',
      dataIndex:'women',
      key:'women',
    },
    {
        title:'Children',
        dataIndex:'youths',
        key:'youths',
      },
      {
        title:'New Comer',
        dataIndex:'newComers',
        key:'newComers',
      },
      {
        title:'Birth',
        dataIndex:'births',
        key:'births',
      },
      {
        title:'Deaths',
        dataIndex:'deaths',
        key:'deaths',
      },
      {
        title:'Marriages',
        dataIndex:'marriages',
        key:'marriages',
      },
      {
        title:'New Workers',
        dataIndex:'newWorkers',
        key:'newWorkers',
      },
      {
        title:'Souls Baptised',
        dataIndex:'soulsBaptised',
        key:'soulsBaptised',
      },
      {
        title:'Souls Saved',
        dataIndex:'soulsSaved',
        key:'soulsSaved',
      },
     
  ]
  
  if(!provinces.length) return <Loading />

   return(
       <Formik
          initialValues={{startDate: new Date().toISOString(),endDate: new Date().toISOString()}}
          onSubmit={ async (values) => {
            try{
              const {data} = await requestAxios.get(`/attendances?parish=${parishId}&province=${provinceId}&zone=${zoneId}&country=${countryId}&startDate=${values.startDate}&endDate=${values.endDate}`);
              setAttendances(data.body);
              console.log(data);
              }
          catch(err){
            }
          }}
          >
           {() => (
               <div className="ParishAttendanceMonthlyReport">
                  <h1 className="ParishAttendanceMonthlyReport-heading">Attendance by Parish</h1>
                <div className="col-6 offset-3">
                <R3Card>                
                   <Form>
                  <div className="container">
                        <div className="">
                        <div className="form-group">
                            <label className="form-label" htmlFor="province">Province</label>
                            <Field as="select" name="province" className="form-control form-control-lg" id="province" onChange={(e) => {
                              const value = e.target.value;
                              if(value && value === 'all'){
                                setIsLoading(true);
                                setGetAllAttendances(!getAllAttendances);
                                setDisableZoneDropdownList(true);
                                setDisableParishDropdownList(true);
                                setShowSearchByDate(false);

                              }else if (value){
                                setProvinceId(value);
                                // getProvincePastor(e.target.value);
                                setIsLoading(true);
                                setZones([]);
                                setDisableZoneDropdownList(false);
                                setCountries([]);
                                setDisableCountryDropdownList(true);
                                setDisableParishDropdownList(true);
                                setShowSearchByDate(false);
                              }else{
                                return
                              }
                            }}>
                              <option value="">Select Province</option>
                              <option value="all">Show All Provinces</option>
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
                            const value = e.target.value;
                            if (value && value === 'all'){
                              setGetAllAttendancesByProvinceId(!getAllAttendancesByProvinceId);
                              setIsLoading(true);
                              setDisableCountryDropdownList(true);
                            }else if(value){
                              setZoneId(value);
                              setDisableCountryDropdownList(false);
                              setIsLoading(true);
                            }else{
                              return
                            }
                              
                          }} disabled={disableZoneDropdownList}>
                            <option value="">Select Zone</option>
                            <option value="all">Show All Zones</option>
                            {zones.map((zone) => {
                                return <option key={zone.id} value={zone.id}>{zone.name}</option>
                            })}
                          </Field>
                        </div>
        
                      <div className="form-group">
                        <label>Country</label>
                        <Field as="select" name="country" className="form-control form-control-lg" onChange={(e) => {
                            const value = e.target.value;
                            if(value && value === 'all'){
                              setGetAllAttendancesByZoneId(!getAllAttendancesByZoneId);
                                setIsLoading(true);
                            }else if(value){
                              setCountryId(value);
                              setIsLoading(true);
                              setDisableParishDropdownList(false);
                            }else{
                              return;
                            }
                        }} disabled = {disableCountryDropdownList}>
                          <option value="">Select Country</option>
                          <option value="all">Show All Countries</option>
                          {countries.map((country) => {
                              return <option key={country._id} value={country._id}>{country.countryName}</option>
                          })}
                        </Field>
                      </div> 

                      <div className="form-group mb-5">
                        <label>Parish</label>
                        <Field as="select" name="parishes" className="form-control form-control-lg" onChange={(e) => {
                            const value = e.target.value;
                            if(value && value === "all"){
                              setGetAllAttendancesByCountryId(!getAllAttendancesByCountryId);
                                setIsLoading(true);
                            }else if (value){
                              setParishId(value);
                              setIsLoading(true);
                              setShowSearchByDate(true);
                            }else{
                              return
                            }
                        }} disabled = {disableParishDropdownList}>
                          <option value="">Select Parish</option>
                          <option value="all">Show All Parishes</option>
                          {parishes.map((parish) => {
                              return <option key={parish._id} value={parish._id}>{parish.name}</option>
                          })}
                        </Field>
                      </div>
                        { showSearchByDate &&
                        <>
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
                        </>
                        }
                    </div>
                  </div>
                  </Form>
                </R3Card>
              </div>
               { !!attendances.length &&
                 <Table 
                 rowKey={record => record.id} 
                 loading={isLoading}  
                 columns={columns} 
                 dataSource={attendances.map(att => ({id: att._id, createdAt:att.createdAt, men:att.men, women:att.women, youths:att.children, births:att.birth, deaths:att.deaths, marriages:att.marriages, newComers:att.newComers, newWorkers:att.newWorkers, soulsSaved:att.soulsSaved, soulsBaptised:att.soulsBaptised, province:att.province?.name, zone:att.zone?.name, country:att.country?.countryName, parish:att.parish?.name}))}
                 summary={ pagedData => {
                  let totalMen = 0;
                  let totalWomen = 0;
                  let totalYouths = 0;
                  let totalBirths = 0;
                  let totalDeaths = 0;
                  let totalMarriages = 0;
                  let totalNewComers = 0;
                  let totalNewWorkers = 0;
                  let totalSoulsSaved = 0;
                  let totalSoulsBaptised = 0;
                  pagedData.forEach(({men, youths, women, births, newComers,newWorkers,marriages, deaths, soulsBaptised, soulsSaved}) => {
                        totalMen+= men;
                        totalWomen+= women;
                        totalYouths+= youths;
                        totalBirths+= births;
                        totalNewWorkers+= newWorkers;
                        totalNewComers+=newComers;
                        totalMarriages+=marriages;
                        totalDeaths+=deaths;
                        totalSoulsSaved+=soulsSaved;
                        totalSoulsBaptised+=soulsBaptised;
                  });

                  return (
                    <>
                      <Table.Summary.Row>
                      <Table.Summary.Cell></Table.Summary.Cell>
                      <Table.Summary.Cell><b>TOTAL</b></Table.Summary.Cell>
                      <Table.Summary.Cell><b>{totalMen}</b></Table.Summary.Cell>
                      <Table.Summary.Cell><b>{totalWomen}</b></Table.Summary.Cell>
                      <Table.Summary.Cell><b>{totalYouths}</b></Table.Summary.Cell>
                      <Table.Summary.Cell><b>{totalNewComers}</b></Table.Summary.Cell>
                      <Table.Summary.Cell><b>{totalBirths}</b></Table.Summary.Cell>
                      <Table.Summary.Cell><b>{totalDeaths}</b></Table.Summary.Cell>
                      <Table.Summary.Cell><b>{totalMarriages}</b></Table.Summary.Cell>
                      <Table.Summary.Cell><b>{totalNewWorkers}</b></Table.Summary.Cell>
                      <Table.Summary.Cell><b>{totalSoulsBaptised}</b></Table.Summary.Cell>
                      <Table.Summary.Cell><b>{totalSoulsSaved}</b></Table.Summary.Cell>
                      </Table.Summary.Row>
                    </>
                  )
                  
                 }}
                  />
                }

               </div>
           )}
       </Formik>
   )
}

export default ParishAttendanceMonthlyReport;