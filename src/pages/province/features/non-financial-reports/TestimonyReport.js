import { Formik, Field, Form } from 'formik';
import React, { useContext, useState, useEffect } from 'react';
import {Table, Space, Modal, Tag} from 'antd';
import {AuthContext} from '../../../../context/AuthContext';
import axios from 'axios';
import requestAxios from '../../../../util/requestAxios';
import R3Card from '../../../../components/Card';
import { useAlert } from 'react-alert';
import moment from 'moment';
import { dateFormatList } from '../../../../helpers/dateHelper';
import Loading from '../../../../components/Loading';
import {Link} from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './TestimonyReport.css';
import { DatePicker } from "formik-antd";
import { generatePDF } from '../../../../util/reportGenerator';


const TestimonyReport = () => {
    const defaultId = '5fc5d6236c07300004aea00c';
    const alert = useAlert();
    const {userInfo, isAdmin} = useContext(AuthContext);
    const [provinces, setProvinces] = useState([]);
    const [zones, setZones] = useState([]);
    const [countries, setCountries] = useState([]);
    const [parishes, setParishes] = useState([]);
    const [testimonies, setTestimonies] = useState([]);
    const [parish, setParish] = useState([]);
    const [getAllProvincesTestimonies, setGetAllProvincesTestimonies] = useState(false);

    const [provinceId, setProvinceId] = useState("5fc5d6236c07300004aea00c");
    const [parishId, setParishId] = useState("5fc5d6236c07300004aea00c");
    const [zoneId, setZoneId] = useState("5fc5d6236c07300004aea00c");
    const [countryId, setCountryId] = useState("5fc5d6236c07300004aea00c");
    const [disableZoneDropdownList, setDisableZoneDropdownList] = useState(true);
    const [disableCountryDropdownList, setDisableCountryDropdownList] = useState(true);
    const [disableParishDropdownList, setDisableParishDropdownList] = useState(true);
    const [pagination, setPagination] = useState({page:1, pageSize:2});
    const [startDate, setStartDate] = useState(new Date().toISOString());
    const [endDate, setEndDate] = useState(new Date().toISOString());
    const [dateChange, setDateChange] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const { confirm } = Modal;


    const requestToken = axios.CancelToken.source();

    const getTestimonies = async (page) => {
      try{

          const { data } = await requestAxios.get(`/testimonies?parish=${parishId}&country=${countryId}&zone=${zoneId}&province=${provinceId}&page=${page}&limit=${pagination.pageSize}&startDate=${startDate}&endDate=${endDate}`,{cancelToken:requestToken.token});
          setTestimonies(data.body);
          setTotal(data.total);
          setIsLoading(false);
        }
        catch(err){
          if(axios.isCancel(err)){
            return;
          }else{
            console.error("There was a problem");
          }
      };
    }

    
    useEffect(() => {
        const source = axios.CancelToken.source();
        const getProvinces = async () => {
          try{
            const { data } = await requestAxios.get("/provinces",{cancelToken:source.token});
            setProvinces(data.body);
          }catch(err){
            if(axios.isCancel(err)){
              return;
            }else{
              console.error("There was a problem");
            }
          }
        };
          getProvinces();
  
          return (() => {
            source.cancel();
          })
     
      }, []);

    useEffect(() => {
      getTestimonies(1);

      return (() => {
        requestToken.cancel();
      })

    },[getAllProvincesTestimonies])

    useEffect(() => {
      getTestimonies(1);

      return (() => {
        requestToken.cancel();
      })

    }, [provinceId]);

    useEffect(() => {
      getTestimonies(1);

      return (() => {
        requestToken.cancel();
      })


    }, [zoneId]);

    useEffect(() => {
      getTestimonies(1);
    }, [countryId]);

    useEffect(() => {

      getTestimonies(1);

      return (() => {
        requestToken.cancel();
      })

    }, [parishId]);

    
    useEffect(() => {

      getTestimonies(1);

       return (() => {
          requestToken.cancel();
        })
      
    },[dateChange])


    useEffect(() => {

        const source = axios.CancelToken.source();
        const getZonesByProvinceId = async () => {
          try{
            const { data } = await requestAxios.get(`/provinces/${provinceId}/zones`, {cancelToken:source.token});
            setZones(data.body);
          }
          catch(err){
            if(axios.isCancel(err)){
            return;
          }else{
            console.error("There was a problem");
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
            if(axios.isCancel(err)){
              return;
            }else{
              console.error("There was a problem");
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
            if(axios.isCancel(err)){
              return;
            }else{
              console.error("There was a problem");
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
            if(axios.isCancel(err)){
              return;
            }else{
              console.error("There was a problem");
            }
          }
        }
        getParishById();
  
        return (() => {
          source.cancel();
        })
      },[parishId]);

      
  const handlePageChange = page => {
    getTestimonies(page);
  };


         
                 
      function showDeleteConfirm(testimony) {
        confirm({
          title: `Are you sure, you want to delete?`,
          icon: <ExclamationCircleOutlined />,
          content: 'This operation is not reversible.',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          async onOk() {
            const {data} = await requestAxios.delete(`/testimonies/${testimony.id}`);
            alert.success(data.message);
            window.location = `/non-financial/reports/testimony`;  
                    
          },
          onCancel() {
          },
        });
      }

    const columns = [
      {
        title:'Parish',
        dataIndex:'parishName',
        key:'parishName',
      },
      {
        title:'Date',
        dataIndex:'createdAt',
        key:'createdAt',
        render: date => (
          <>{moment(date).format(dateFormatList[0])}</>
        )
      },
      {
        title:'Title',
        dataIndex:'title',
        key:'title',
        
      },
      {
        title:'Testifier',
        dataIndex:'testifier',
        key:'testifier'
      },
      {
        title:'Testimony',
        dataIndex:'body',
        key:'body',
        render: txt => (
          <>{txt.slice(0,50)}...</>
        )
      },
      {
        title: 'Actions',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <Link className="btn btn-info" to={`${record._id}/testimony/read`}>Read</Link>
            <button className="btn btn-danger" onClick={() => showDeleteConfirm(record)}>Delete</button>
            { !record.read && <Tag color="magenta">UNREAD TESTIMONY</Tag>}
          </Space>
        ),
      },
    ];


    if(!provinces.length) return <Loading />

    return (
        <Formik
            initialValues={{startDate: new Date().toISOString(),endDate: new Date().toISOString()}}
            // onSubmit={ async (values) => {
            //   try{
            //     const {data} = await requestAxios.get(`/parishes/${parishId}/testimonies`);
            //     setTestimonies(data.body);
            // }catch(err){
            // }
            // }}        
            >
            {() => (
                <div className="TestimonyReport">
                  <h1 className="TestimonyReport-heading">Testimony Report by Parish</h1>
                 <div className="col-6 offset-3">
                 <R3Card>                
                    <Form>
                   <div className="container">
                            <div className="form-group">
                                <label className="form-label" htmlFor="province">Province</label>
                                <Field as="select" name="province" className="form-control form-control-lg" id="province" onChange={(e) => {
                                  const value = e.target.value;
                                  if(value && value === 'all'){
                                    setProvinceId(defaultId);
                                    setCountryId(defaultId);
                                    setZoneId(defaultId);
                                    setParishId(defaultId);
                                    setIsLoading(true);
                                    setGetAllProvincesTestimonies(!getAllProvincesTestimonies);
                                    setDisableZoneDropdownList(true);
                                    setDisableParishDropdownList(true);
                                    setDisableCountryDropdownList(true);
                                  }else if(value){
                                    setCountryId(defaultId);
                                    setZoneId(defaultId);
                                    setParishId(defaultId);
                                    setIsLoading(true);
                                    setProvinceId(value);
                                    setZones([]);
                                    setDisableZoneDropdownList(false);
                                    setCountries([]);
                                    setDisableCountryDropdownList(true);
                                    setDisableParishDropdownList(true);

                                  }else{
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
                                if (value && value === "all"){
                                    setCountryId(defaultId);
                                    setZoneId(defaultId);
                                    setParishId(defaultId);
                                    setDisableCountryDropdownList(true);
                                    setDisableParishDropdownList(true)
                                    setIsLoading(true);
                                    setGetAllProvincesTestimonies(!getAllProvincesTestimonies);

                                }else if(value){
                                  setCountryId(defaultId);
                                  setParishId(defaultId);
                                  setIsLoading(true);
                                  setZoneId(value);
                                  setDisableCountryDropdownList(false);
                                  setDisableParishDropdownList(true);
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
                                if(value && value === "all"){
                                  setCountryId(defaultId);
                                  setParishId(defaultId);
                                  setIsLoading(true);
                                  setGetAllProvincesTestimonies(!getAllProvincesTestimonies);
                                  setDisableParishDropdownList(true)
                                }else if(value){
                                  setParishId(defaultId);
                                  setIsLoading(true);
                                  setCountryId(value);
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
                                  setParishId(defaultId); 
                                  setIsLoading(true);
                                  setGetAllProvincesTestimonies(!getAllProvincesTestimonies);
                                }else if(value){
                                  setIsLoading(true);
                                    setParishId(value);
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
                          <div className="form-row">
                          
                          <div className="form-group col-6">
                              <label className="form-label">Start Date</label>
                              <DatePicker name="startDate" placeholder="Start Date" className="form-control form-control-lg" format={dateFormatList[0]} onChange={(date,dateString) => {
                                const dateResult = dateString.split('/').reverse().join('-');
                                setStartDate(new Date(dateResult).toISOString());
                                setIsLoading(true);
                                setDateChange(!dateChange);
                              }} />
                          </div>

                          <div className="form-group col-6">
                              <label className="form-label">End Date</label>
                              <DatePicker name="endDate" placeholder="End Date" className="form-control form-control-lg" format={dateFormatList[0]} onChange={(date,dateString) => {
                                const dateResult = dateString.split('/').reverse().join('-');
                                setEndDate(new Date(dateResult).toISOString());
                                setIsLoading(true);
                                setDateChange(!dateChange);
                              }} />
                          </div>
                      </div> 
    
                            {/* <input type="submit" value="Search" className="btn btn-primary btn-block btn-lg mt-5" /> */}
                   </div>
                   </Form>
                 </R3Card>
               </div>
                
                                       
                { <Table title={() => <h2>Testimonies</h2>} 
                rowKey ={record => record._id} 
                columns={columns} 
                dataSource={testimonies}
                loading={isLoading}
                pagination={{total, onChange:handlePageChange, ...pagination}}
                summary = {() => {

                  const footerData = [];                                      
                  const reportData = testimonies.map(elt=> [elt.parishName, `${moment(elt.createdAt).format(dateFormatList[0])}`,elt.title, elt.testifier, elt.body]);
                   return(
                     <>
                      <Table.Summary.Row>
                        <Table.Summary.Cell><button className="btn btn-secondary" onClick={() => generatePDF(columns, reportData, "Testimonies Report",footerData, true)}>EXPORT</button></Table.Summary.Cell>
                      </Table.Summary.Row>
                     </>
                   )
                 }}
                /> }
                </div>
            )}
        </Formik>
    )
}

export default TestimonyReport;