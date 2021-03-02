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
import {Link, useHistory} from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';
import './WelfareReport.css';
import { generatePDF } from '../../../../util/reportGenerator';

const WelfareReport = () => {
    const defaultId = "5fc5d6236c07300004aea00c";
    const alert = useAlert();
    const history = useHistory();
    const {userInfo, isAdmin} = useContext(AuthContext);
    const [provinces, setProvinces] = useState([]);
    const [zones, setZones] = useState([]);
    const [countries, setCountries] = useState([]);
    const [parishes, setParishes] = useState([]);
    const [welfares, setWelfares] = useState([]);
    const [parish, setParish] = useState([]);
    const [provinceId, setProvinceId] = useState("5fc5d6236c07300004aea00c");
    const [parishId, setParishId] = useState("5fc5d6236c07300004aea00c");
    const [zoneId, setZoneId] = useState("5fc5d6236c07300004aea00c");
    const [countryId, setCountryId] = useState("5fc5d6236c07300004aea00c");
    const [disableZoneDropdownList, setDisableZoneDropdownList] = useState(true);
    const [disableCountryDropdownList, setDisableCountryDropdownList] = useState(true);
    const [disableParishDropdownList, setDisableParishDropdownList] = useState(true);
    const [isLoading, setIsLoading] =useState(true);
    const [pagination, setPagination] = useState({page:1, pageSize:5});
    const [startDate, setStartDate] = useState(new Date().toISOString());
    const [endDate, setEndDate] = useState(new Date().toISOString());
    const [dateChange, setDateChange] = useState(false);
    const [getAllWelfares, setGetAllWelfares] = useState(false);
    const [total, setTotal] = useState(0);
    const { confirm } = Modal;


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
     
      }, []);

      const getWelfares = async (page) => {
        try{
          const { data } = await requestAxios.get(`/welfares?province=${provinceId}&zone=${zoneId}&country=${countryId}&parish=${parishId}&page=${page}&limit=${pagination.pageSize}&startDate=${startDate}&endDate=${endDate}`);
          setWelfares(data.body);
          setTotal(data.total);
          setIsLoading(false);
        }catch(err){
          if(err.response && err.response.data){
            alert.error(err.response.data.message);
          }else{
          alert.error("An unexpected error occured.");
          }
        }
      };

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
        getWelfares(1);
    },[getAllWelfares])

    useEffect(()=> {
        getWelfares(1)
    },[provinceId]);

    useEffect(()=> {
      getWelfares(1)
  },[dateChange]);

    useEffect(()=> {
      getWelfares(1)
  },[zoneId]);

    useEffect(()=> {
      getWelfares(1)
  },[countryId]);

  useEffect(()=> {
    getWelfares(1)
  },[parishId]);
  
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

            
      function showDeleteConfirm(welfare) {
        confirm({
          title: `Are you sure, you want to delete?`,
          icon: <ExclamationCircleOutlined />,
          content: 'This operation is not reversible.',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          async onOk() {
            const {data} = await requestAxios.delete(`/welfares/${welfare.id}`);
            window.location = `/non-financial/reports/welfare`;  
            alert.success(data.message);
          },
          onCancel() {
          },
        });
      }


      const columns = [
        {
          title: 'Parish',
          dataIndex: 'parishName',
          key:'parishName'                  
        },
        {
          title: 'Pastor',
          dataIndex: 'pastorName',
          key:'pastorName'                  
        },
        {
          title: 'Date',
          dataIndex: 'createdAt',
          key:'createdAt',          
          render: date => (
              <>{moment(date).format(dateFormatList[0])}</>
          )
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key:'subject'                  
          },
          {
            title: 'Message',
            dataIndex: 'message',
            key:'message',
            render : msg => (
              <p>{msg.slice(0,60)}...</p>
            )
          },
          {
            title: 'Actions',
            key: 'action',
            render: (text, record) => (
              <Space size="middle">
                <Link className="btn btn-info" to={`${record._id}/read`}>Read</Link>
                <button className="btn btn-danger" onClick={() => showDeleteConfirm(record)}>Delete</button>
                { !record.read && <Tag color="magenta">UNREAD MESSAGE</Tag>}
              </Space>
            ),
          },
      ]

      if(!provinces.length) return <Loading />
    return (
        <Formik
        initialValues={{startDate: new Date().toISOString(),endDate: new Date().toISOString()}}
        onSubmit={ async (values) => {
          try{
            const {data} = await requestAxios.get(`/parishes/${parishId}/welfares`);
            setWelfares(data.body);
        }catch(err){
        }
        }}
        
        >
            {() => (
                <div className="WelfareReport">
                  <h1 className="WelfareReport-heading">Welfare Report by Parish</h1>

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
                                  setProvinceId(defaultId);
                                  setZoneId(defaultId);
                                  setCountryId(defaultId);
                                  setParishId(defaultId);
                                  setIsLoading(true);
                                  setGetAllWelfares(!getAllWelfares);
                                  setDisableZoneDropdownList(true);
                                  setDisableCountryDropdownList(true);
                                  setDisableParishDropdownList(true);
                               }else if(value){
                                 setZoneId(defaultId);
                                 setCountryId(defaultId);
                                 setParishId(defaultId);
                                 setIsLoading(true);
                                 setProvinceId(value);
                                 setZones([]);
                                 setDisableZoneDropdownList(false);
                                 setCountries([]);
                                 setDisableCountryDropdownList(true);
                               }else{
                                 return
                               }
                             }}>
                               <option value="">Select Province</option>
                               {isAdmin() && <option value="all">Select All Provinces</option>}
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
                                setZoneId(defaultId);
                                setCountryId(defaultId);
                                setParishId(defaultId);
                                setIsLoading(true);
                                setGetAllWelfares(!getAllWelfares);
                                setDisableCountryDropdownList(true);
                                setDisableParishDropdownList(true);
                             }else if(value){
                               setCountryId(defaultId);
                               setParishId(defaultId);
                               setIsLoading(true);
                               setZoneId(value);
                               setDisableCountryDropdownList(false);
                             }else{
                               return;
                             }
                           }} disabled={disableZoneDropdownList}>
                             <option value="">Select Zone</option>
                             <option value="all">Select All Zones</option>
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
                               setGetAllWelfares(!getAllWelfares);
                             }                             
                             else if(value){
                               setParishId(defaultId);
                               setIsLoading(true)
                              setCountryId(value);
                              setDisableParishDropdownList(false);
                             }else{
                               return;
                             }
                         }} disabled = {disableCountryDropdownList}>
                           <option value="">Select Country</option>
                           <option value="all">Select All Countries</option>
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
                               setParishId(defaultId);
                               setIsLoading(true);
                               setGetAllWelfares(!getAllWelfares);
                             }else if(value){
                              setParishId(value);
                             }else{
                               return;
                             }
                         }} disabled = {disableParishDropdownList}>
                           <option value="">Select Parish</option>
                           <option value="all">Select All Parishes</option>
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
                   </div>
                   </Form>
                 </R3Card>
               </div>
                
                {<Table title={() => <h2>Welfare Check Messages</h2>} 
                loading={isLoading} 
                rowKey ={record => record._id}
                 columns={columns}
                  dataSource={welfares}
                  summary = {pagedData => {

                    const footerData = [];                                      
                    const reportData = pagedData.map(elt=> [elt.parishName, elt.pastorName, `${moment(elt.createdAt).format(dateFormatList[0])}`, elt.subject, elt.message]);
                     return(
                       <>
                        <Table.Summary.Row>
                          <Table.Summary.Cell><button className="btn btn-secondary" onClick={() => generatePDF(columns, reportData, "Welfare Check Report",footerData, true)}>EXPORT</button></Table.Summary.Cell>
                        </Table.Summary.Row>
                       </>
                     )
                   }}
                  />}
                </div>
            )}
        </Formik>
    )
}

export default WelfareReport;