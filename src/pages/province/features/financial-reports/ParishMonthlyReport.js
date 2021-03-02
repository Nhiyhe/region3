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
import './ParishMonthlyReport.css';
import { generatePDF } from '../../../../util/reportGenerator';

const ParishMonthlyReport  = () => {
    const defaultId = '5fc5d6236c07300004aea00c';
    const alert = useAlert();
    const {userInfo, isAdmin} = useContext(AuthContext);
    const [provinces, setProvinces] = useState([]);
    const [zones, setZones] = useState([]);
    const [countries, setCountries] = useState([]);
    const [parishes, setParishes] = useState([]);
    const [monetaries, setMonetaries] = useState([]);
    const [parish, setParish] = useState([]);
    const [provinceId, setProvinceId] = useState("5fc5d6236c07300004aea00c");
    const [parishId, setParishId] = useState("5fc5d6236c07300004aea00c");
    const [zoneId, setZoneId] = useState("5fc5d6236c07300004aea00c");
    const [countryId, setCountryId] = useState("5fc5d6236c07300004aea00c");
    const [disableZoneDropdownList, setDisableZoneDropdownList] = useState(true);
    const [disableCountryDropdownList, setDisableCountryDropdownList] = useState(true);
    const [disableParishDropdownList, setDisableParishDropdownList] = useState(true);
    const [getAllProvincesMonetaries, setGetAllProvincesMonetaries] = useState(false);
    const [getAllZonesMonetaries, setGetAllZonesMonetaries] = useState(false);
    const [getAllCountriesMonetaries, setGetAllCountriesMonetaries] = useState(false);
    const [getAllParishesMonetaries, setGetAllParishesMonetaries] = useState(false);
    const [pagination, setPagination] = useState({page:1, pageSize:10});
    const [startDate, setStartDate] = useState(new Date().toISOString());
    const [endDate, setEndDate] = useState(new Date().toISOString());
    const [dateChange, setDateChange] = useState(false);
    const [total, setTotal] = useState(0);


    
    useEffect(() => {
        const source = axios.CancelToken.source();
        const getProvinces = async () => {
          try{
            const { data } = await requestAxios.get("/provinces",{cancelToken:source.token});
            setProvinces(data.body);
          }catch(err){
            // if(err.response && err.response.data){
            //   alert.error(err.response.data.message);
            // }else{
            // alert.error("An unexpected error occured.");
            // }
            console.error("There was a problem")
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
            // if(err.response && err.response.data){
            //   alert.error(err.response.data.message);
            // }else{
            // alert.error("An unexpected error occured.");
            // }
            console.error("There was a problem")
        };
      }
        getZonesByProvinceId();
  
        return (() => {
          source.cancel();
        })
        
      },[provinceId])

    const requestToken = axios.CancelToken.source();

      const getAllMonetaries = async (page) => {
        try{
        //  const { data } = await requestAxios.get(`/monetaries?province=${provinceId}&zone=${zoneId}&country=${countryId}&parish=${parishId}&startDate=${startDate}&endDate=${endDate}`, {cancelToken:source.token});

          const { data } = await requestAxios.get(`/monetaries?page=${page}&limit=${pagination.pageSize}&startDate=${startDate}&endDate=${endDate}`,{cancelToken:requestToken.token});
          setMonetaries(data.body);
          setTotal(data.total);
        }
        catch(err){
          if(axios.isCancel(err)){
            return;
          }else{
            console.error('There was a problem',err);
          }
      };
    }


      useEffect(() => {
       
        getAllMonetaries(1);
  
        return (() => {
          requestToken.cancel();
        })
        
      },[getAllProvincesMonetaries])

      const getAllMonetariesBySearch = async (page) => {
        try{
         const { data } = await requestAxios.get(`/monetaries?province=${provinceId}&zone=${zoneId}&country=${countryId}&parish=${parishId}&page=${page}&limit=${pagination.pageSize}&startDate=${startDate}&endDate=${endDate}`,{cancelToken:requestToken.token});
          setMonetaries(data.body);
          setTotal(data.total);
        }
        catch(err){ 
          if(axios.isCancel(err)){
            return;
          } else{
            console.error("There was a problem",)

          }   
      };
    }

      useEffect(() => {
        getAllMonetariesBySearch(1);
  
        return (() => {
          requestToken.cancel();
        })
        
      },[dateChange])


      useEffect(() => {
      //   const getMonetariesByProvinceId = async () => {
      //     try{
      //      const { data } = await requestAxios.get(`/monetaries?province=${provinceId}&zone=${zoneId}&country=${countryId}&parish=${parishId}&startDate=${startDate}&endDate=${endDate}`, {cancelToken:source.token});

      //       // const { data } = await requestAxios.get(`/monetaries?province=${provinceId}&startDate=${startDate}&endDate=${endDate}`, {cancelToken:source.token});
      //       setMonetaries(data.body);
      //     }
      //     catch(err){
      //       if(err.response && err.response.data){
      //         alert.error(err.response.data.message);
      //       }else{
      //       alert.error("An unexpected error occured.");
      //       }
      //   };
      // }
      //   getMonetariesByProvinceId();

      getAllMonetariesBySearch(1);
  
      return (() => {
        requestToken.cancel();
      })
        
      },[provinceId])

      useEffect(() => {
      //   const getMonetariesByProvinceId = async () => {
      //     try{
      //       const { data } = await requestAxios.get(`/monetaries?province=${provinceId}&startDate=${startDate}&endDate=${endDate}`, {cancelToken:source.token});
      //       setMonetaries(data.body);
      //     }
      //     catch(err){
      //       if(err.response && err.response.data){
      //         alert.error(err.response.data.message);
      //       }else{
      //       alert.error("An unexpected error occured.");
      //       }
      //   };
      // }
      //   getMonetariesByProvinceId();

      getAllMonetariesBySearch(1);
  
      return (() => {
        requestToken.cancel();
      })
        
      },[getAllZonesMonetaries])
  
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
  
        // const getMonetariesByZoneId = async (zoneId) => {
        //   try{
        //    const { data } = await requestAxios.get(`/monetaries?province=${provinceId}&zone=${zoneId}&startDate=${startDate}&endDate=${endDate}`, {cancelToken:source.token});
        //      setMonetaries(data.body);
        //   }catch(err){
        //     if(err.response && err.response.data){
        //       alert.error(err.response.data.message);
        //     }else{
        //     alert.error("An unexpected error occured.");
        //     }
        //   }
        // }
        // getMonetariesByZoneId(zoneId);

        getAllMonetariesBySearch(1);
  
        return (() => {
          requestToken.cancel();
        })
      },[zoneId])

      
      useEffect(() => {
  
        // const getMonetariesByZoneId = async (zoneId) => {
        //   try{
        //    const { data } = await requestAxios.get(`/monetaries?province=${provinceId}&zone=${zoneId}&startDate=${startDate}&endDate=${endDate}`, {cancelToken:source.token});
        //      setMonetaries(data.body);
        //   }catch(err){
        //     if(err.response && err.response.data){
        //       alert.error(err.response.data.message);
        //     }else{
        //     alert.error("An unexpected error occured.");
        //     }
        //   }
        // }
        // getMonetariesByZoneId(zoneId);

        getAllMonetariesBySearch(1);
  
        return (() => {
          requestToken.cancel();
        })
      },[getAllCountriesMonetaries])

        
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
  
        // const getMonetariesByCountryId = async () => {
        //   try{
        //    const { data } = await requestAxios.get(`/monetaries?province=${provinceId}&zone=${zoneId}&country=${countryId}&startDate=${startDate}&endDate=${endDate}`, {cancelToken:source.token});
        //      setMonetaries(data.body);
        //   }catch(err){
        //     if(err.response && err.response.data){
        //       alert.error(err.response.data.message);
        //     }else{
        //     alert.error("An unexpected error occured.");
        //     }
        //   }
        // }
        // getMonetariesByCountryId();

        getAllMonetariesBySearch(1);
  
        return (() => {
          requestToken.cancel();
        })
      },[countryId])

      useEffect(() => {

        // const getMonetariesByCountryId = async () => {
        //   try{
        //    const { data } = await requestAxios.get(`/monetaries?province=${provinceId}&zone=${zoneId}&country=${countryId}&startDate=${startDate}&endDate=${endDate}`, {cancelToken:source.token});
        //      setMonetaries(data.body);
        //   }catch(err){
        //     if(err.response && err.response.data){
        //       alert.error(err.response.data.message);
        //     }else{
        //     alert.error("An unexpected error occured.");
        //     }
        //   }
        // }
        // getMonetariesByCountryId();

        getAllMonetariesBySearch(1);
  
        return (() => {
          requestToken.cancel();
        })
      },[getAllParishesMonetaries])

      useEffect(() => {
        const source = axios.CancelToken.source();
  
        const getParishById = async () => {
          try{
            const {data} = await requestAxios.get(`parishes/${parishId}`, {cancelToken:source.token});
            setParish(data.body);
          }catch(err){
           console.log("There was a problem");
          }
        }
        getParishById();
  
        return (() => {
          source.cancel();
        })
      },[parishId])

      useEffect(() => {
  
        // const getMonetariesByCountryId = async () => {
        //   try{
        //    const { data } = await requestAxios.get(`/monetaries?province=${provinceId}&zone=${zoneId}&country=${countryId}&parish=${parishId}&startDate=${startDate}&endDate=${endDate}`, {cancelToken:source.token});
        //      setMonetaries(data.body);
        //   }catch(err){
        //     if(err.response && err.response.data){
        //       alert.error(err.response.data.message);
        //     }else{
        //     alert.error("An unexpected error occured.");
        //     }
        //   }
        // }
        // getMonetariesByCountryId();

        getAllMonetariesBySearch(1);
  
        return (() => {
          requestToken.cancel();
        })
      },[parishId])

  
       
  const columns = [
    {
      title: 'Parish',
      dataIndex: 'parish',
      fixed: true,
      width: 140,
      render: p => (
      <>{p ? p?.name : ''}</>
        )
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      fixed: true,
      width: 140,
      render: date => (
      <>{moment(date).format(dateFormatList[0])}</>
        )
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
      title:'Expected Amount',
      dataIndex:'expectedRemittance',
      key:'expectedRemittance',
      width:140,
      render: expec => (
        <>€{expec?.toFixed(2)}</>
      )
    },
    {
      title:'Opening Balance',
      dataIndex:'openingBalance',
      key:'openingBalance',
      width:140,
      render: openingBal => (
        <>€{openingBal?.toFixed(2)}</>
      )
    },
    {
      title:'Amount Remitted',
      dataIndex:'amountRemitted',
      key:'amountRemitted',
      width:140,
      render: paid => (
        <>€{paid ? paid?.toFixed(2) : paid.toFixed(2)}</>
      )
    },
    {
      title:'Closing Balance',
      dataIndex:'closingBalance',
      key:'closingBalance',
      width:140,
      render: closeBal => (
        <>€{ closeBal ? closeBal?.toFixed(2) : closeBal.toFixed(2)}</>
      )
    },
  ]
  
  // function convertArrayOfObjectsToCSV(array) {
  //   let result;
  
  //   const columnDelimiter = ',';
  //   const lineDelimiter = '\n';
  //   const keys = Object.keys(monetaries[0]);
  
  //   result = '';
  //   result += keys.join(columnDelimiter);
  //   result += lineDelimiter;
  
  //   array.forEach(item => {
  //     let ctr = 0;
  //     keys.forEach(key => {
  //       if (ctr > 0) result += columnDelimiter;
  
  //       result += item[key];
        
  //       ctr++;
  //     });
  //     result += lineDelimiter;
  //   });
  
  //   return result;
  // }
  
  
  const handlePageChange = page => {
    getAllMonetariesBySearch(page);
  };

  // const Export = ({ onExport }) => (
  //   <input type="button" value="Export" className="btn btn-info btn-lg mb-4" onClick={e => onExport(e.target.value)}  />
  // );

  if(!provinces.length) return <Loading />
    return (
        <Formik 
        initialValues={{startDate: new Date().toISOString(), endDate: new Date().toISOString()}}
       
         >
            {() => (
                <div className="ParishMonthlyReport">
                <h1 className="ParishMonthlyReport-heading">Parish Monthly Report</h1>

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
                                  setGetAllProvincesMonetaries(!getAllProvincesMonetaries);
                                  setProvinceId(defaultId);
                                  setDisableZoneDropdownList(true);
                              }else if (value){
                                setProvinceId(value);
                                setZones([]);
                                setDisableZoneDropdownList(false);
                                setCountries([]);
                                setDisableCountryDropdownList(true);
                              }
                              else{
                                return
                              }
                            }}>
                              <option value="">Select Province</option>
                              {isAdmin() && <option value="all">Show All Provinces</option>}
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
                            if (value && value ==='all'){
                              setGetAllZonesMonetaries(!getAllZonesMonetaries);
                              setDisableCountryDropdownList(true);
                              setZoneId(defaultId);
                            }else if(value){
                              setZoneId(e.target.value);
                              setDisableCountryDropdownList(false);
                            }else{
                              return;
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
                                setGetAllCountriesMonetaries(!getAllCountriesMonetaries);
                                setDisableParishDropdownList(true);
                            }else if(value){
                              setCountryId(e.target.value);
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
                            if(value && value === 'all'){
                                setGetAllParishesMonetaries(!getAllParishesMonetaries);
                            }else if(value){
                              setParishId(e.target.value);
                            }else{
                              return;
                            }
                        }} disabled = {disableParishDropdownList}>
                          <option value="">Select Parish</option>
                          <option value="all">Show All Parishes</option>
                          {parishes.map((parish) => {
                              return <option key={parish._id} value={parish._id}>{parish.name}</option>
                          })}
                        </Field>
                      </div>

                       <div className="form-row">
                          
                          <div className="form-group col-6">
                              <label className="form-label">Start Date</label>
                              <DatePicker name="startDate" placeholder="Start Date" className="form-control form-control-lg" format={dateFormatList[0]} onChange={(date,dateString) => {
                                const dateResult = dateString.split('/').reverse().join('-');
                                setStartDate(new Date(dateResult).toISOString());
                                setDateChange(!dateChange);
                              }} />
                          </div>

                          <div className="form-group col-6">
                              <label className="form-label">End Date</label>
                              <DatePicker name="endDate" placeholder="End Date" className="form-control form-control-lg" format={dateFormatList[0]} onChange={(date,dateString) => {
                                const dateResult = dateString.split('/').reverse().join('-');
                                setEndDate(new Date(dateResult).toISOString());
                                setDateChange(!dateChange);
                              }} />
                          </div>
                      </div> 
                    </div>
                  </div>
                  </Form>
                </R3Card>
              </div>
                { !!monetaries.length ? <R3Card>
                                        <div>
                                        </div>
                                      <Table 
                                      rowKey={record => record._id}
                                      columns={columns}                                       
                                      dataSource={monetaries}
                                      pagination={{total, onChange:handlePageChange, ...pagination}} 

                                      summary={ pagedData => {
                                       let totalTithe = 0;
                                       let totalOffering = 0;
                                       let totalexpectedRemittance = 0;
                                       let totalOpeningBalance = 0;
                                       let totalPaid = 0;
                                       let totalArrears = 0;
                                       pagedData.forEach(({tithe, offering, expectedRemittance,openingBalance,amountRemitted,closingBalance}) => {
                                             totalTithe+= tithe;
                                             totalOffering+= offering;
                                             totalexpectedRemittance+= expectedRemittance;
                                             totalOpeningBalance+= openingBalance;
                                             totalPaid+= amountRemitted;
                                             totalArrears+=closingBalance;
                                       });
                                       const footerData = ["", "", totalTithe, totalOffering, totalexpectedRemittance,totalOpeningBalance,totalPaid, totalArrears];                                      
                                       const reportData = pagedData.map(elt=> [elt.parish?.name, `${moment(elt.createdAt).format(dateFormatList[0])}`,`€${elt.tithe?.toFixed(2)}`, `€${elt.offering?.toFixed(2)}`,`€${elt.expectedRemittance?.toFixed(2)}`, `€${elt.openingBalance?.toFixed(2)}`, `€${elt.amountRemitted?.toFixed(2)}`, `€${elt.closingBalance?.toFixed(2)}`]);

                                       return (
                                         <>
                                           <Table.Summary.Row>
                                           <Table.Summary.Cell><button className="btn btn-secondary" onClick={() => generatePDF(columns, reportData, "Parish Monthly Report",footerData)}>EXPORT</button></Table.Summary.Cell>
                                           <Table.Summary.Cell><b>TOTAL</b></Table.Summary.Cell>
                                           <Table.Summary.Cell><b>€{totalTithe?.toFixed(2)}</b></Table.Summary.Cell>
                                           <Table.Summary.Cell><b>€{totalOffering?.toFixed(2)}</b></Table.Summary.Cell>
                                           <Table.Summary.Cell><b>€{totalexpectedRemittance?.toFixed(2)}</b></Table.Summary.Cell>
                                           <Table.Summary.Cell><b>€{totalOpeningBalance?.toFixed(2)}</b></Table.Summary.Cell>
                                           <Table.Summary.Cell><b>€{totalPaid?.toFixed(2)}</b></Table.Summary.Cell>
                                           <Table.Summary.Cell><b>€{totalArrears?.toFixed(2)}</b></Table.Summary.Cell>
                                           </Table.Summary.Row>
                                         </>
                                       )
                                       
                                      }}
                                      />
                                  </R3Card> : null}
            </div>
            )}
        </Formik>
    )
}

export default ParishMonthlyReport;