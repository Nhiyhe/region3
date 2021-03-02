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
import { DatePicker } from "formik-antd";
import Loading from '../../../../components/Loading';
import {Link, useHistory} from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './OutreachReport.css';
import { generatePDF } from '../../../../util/reportGenerator';

const OutreachReport = () => {
    const defaultId = "5fc5d6236c07300004aea00c";
    const alert = useAlert();
    const history = useHistory();
    const {userInfo, isAdmin} = useContext(AuthContext);
    const [provinces, setProvinces] = useState([]);
    const [zones, setZones] = useState([]);
    const [countries, setCountries] = useState([]);
    const [parishes, setParishes] = useState([]);
    const [outreaches, setOutreaches] = useState([]);
    const [parish, setParish] = useState([]);
    const [provinceId, setProvinceId] = useState(defaultId);
    const [parishId, setParishId] = useState(defaultId);
    const [zoneId, setZoneId] = useState(defaultId);
    const [countryId, setCountryId] = useState(defaultId);
    const [disableZoneDropdownList, setDisableZoneDropdownList] = useState(true);
    const [disableCountryDropdownList, setDisableCountryDropdownList] = useState(true);
    const [disableParishDropdownList, setDisableParishDropdownList] = useState(true);
    const [getAllOutreaches, setGetAllOutreaches] = useState(false);
    const [getAllParishOutreaches, setGetAllParishOutreaches] = useState(false);
    const [isLoading, setIsLoading] =useState(true);
    const [pagination, setPagination] = useState({page:1, pageSize:5});
    const [startDate, setStartDate] = useState(new Date().toISOString());
    const [endDate, setEndDate] = useState(new Date().toISOString());
    const [dateChange, setDateChange] = useState(false);
    const [total, setTotal] = useState(0);
    const { confirm } = Modal;

    const requestToken = axios.CancelToken.source();

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

      const getOutreaches = async (page) => {
        try{
          const { data } = await requestAxios.get(`/outreaches?province=${provinceId}&zone=${zoneId}&country=${countryId}&parish=${parishId}&page=${page}&limit=${pagination.pageSize}&startDate=${startDate}&endDate=${endDate}`,{cancelToken:requestToken.token});
          setOutreaches(data.body);
          setTotal(data.total);
          setIsLoading(false);
        }catch(err){
          if(axios.isCancel(err)){
            return;
          }else{
            console.error("There was a problem");
          }
        }
      };

      useEffect(() => {
          getOutreaches(1);
  
          return (() => {
            requestToken.cancel();
          })
     
      }, [getAllOutreaches]);


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

        const getOutreachesByProvinceId = async () => {
          try{
            const { data } = await requestAxios.get(`/provinces/${provinceId}/outreaches`, {cancelToken:source.token});
            setOutreaches(data.body);
          }
          catch(err){
            if(axios.isCancel(err)){
              return;
            }else{
              console.error("There was a problem");
            }
        };
      }

      getOutreachesByProvinceId();
  
        return (() => {
          source.cancel();
        })
        
      },[provinceId])

    useEffect(() => {
        getOutreaches(1)

        return (() => {
          requestToken.cancel();
        })
    }, [provinceId]);

      
    useEffect(() => {

    getOutreaches(1);

    return (() => {
      requestToken.cancel();
    })
      
    },[zoneId])

 
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

        const getOutreachesByZoneId = async (zoneId) => {
          try{
            const {data} = await requestAxios.get(`zones/${zoneId}/outreaches`, {cancelToken:source.token});
            setOutreaches(data.body);
            setIsLoading(false);
          }catch(err){
            if(err.response && err.response.data){
              alert.error(err.response.data.message);
            }else{
            alert.error("An unexpected error occured.");
            }
          }
        }

        getOutreachesByZoneId(zoneId);
  
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
      getOutreaches(1);

      return (() => {
        requestToken.cancel();
      })

    },[dateChange])

      useEffect(() => {
            
        getOutreaches(1);
  
         return (() => {
          requestToken.cancel();
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
      },[parishId])

               
      useEffect(() => {
    
      getOutreaches(1);
  
        return (() => {
          requestToken.cancel();
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
        // {
        //   title:'Province',
        //   dataIndex:'province',
        //   key:'province'
        // },
          {
              title:'Date',
              dataIndex:'createdAt',
              key:'createdAt',
              render : date => (
                  <>{moment(date).format(dateFormatList[0])}</>
              )
          },
          {
            title:'Parish',
            dataIndex:'parish',
            key:'parish'
          },
          {
            title:'New Nation',
            dataIndex:'newNation',
            key:'newNation'
        },
          {
            title:'New Parish',
            dataIndex:'newParish',
            key:'newParish'
        },
        {
            title:'Church Dedication',
            dataIndex:'churchDedication',
            key:'churchDedication'
        },
        {
            title:'Notes',
            dataIndex:'notes',
            key:'notes',
            render: note => (
                <>{note.length > 40 ? `${note.slice(0,41)}...` : note}</>
            )
        },
         {
            title: '',
            key: 'action',
            render: (text, record) => (
              <Space size="middle">
                <Link className="btn btn-info" to={`${record.id}/outreach/detail`}>Detail</Link>
                <button className="btn btn-danger" onClick={() => showDeleteConfirm(record)}>Delete</button>
              </Space>
            ),
          },
      ];

      const handlePageChange = page => {
        getOutreaches(page);
      };


    if(!provinces.length) return <Loading />

    return(
           <Formik
              initialValues={{startDate: new Date().toISOString(),endDate: new Date().toISOString()}}
              // onSubmit={ async (values) => {
              //   try{
              //     const {data} = await requestAxios.get(`/parishes/${parishId}/outreaches`);
              //     setOutreaches(data.body);
              // }catch(err){
              // }
              // }}
              
              >
            {() => (
                <div className="OutreachReport">
                  <h1 className="OutreachReport-heading">Outreach Report by Parish</h1>

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
                                 setGetAllOutreaches(!getAllOutreaches);
                                 setDisableZoneDropdownList(true);
                                 setDisableCountryDropdownList(true);
                                 setDisableParishDropdownList(true);
                                 setIsLoading(true);
                               }else if (value){
                                setZoneId(defaultId);
                                setCountryId(defaultId);
                                setParishId(defaultId);
                                setProvinceId(value);
                                 
                                 setZones([]);
                                 setDisableZoneDropdownList(false);
                                 setCountries([]);
                                 setDisableCountryDropdownList(true);
                                 setDisableParishDropdownList(true);
                                 setIsLoading(true);
                               }else{
                                 return;
                               }
                             }}>
                               <option value="">Select Province</option>
                               {isAdmin() && <option value="all">Show all Provinces</option>}
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
                             let value = e.target.value;
                             if (value && value ==='all'){
                                setZoneId(defaultId);
                                setCountryId(defaultId);
                                setParishId(defaultId);
                                setGetAllOutreaches(!getAllOutreaches);
                                setDisableCountryDropdownList(true);
                                setIsLoading(true);
                             }else if(value){
                               setCountryId(defaultId);
                               setParishId(defaultId);
                               setZoneId(value);
                               setDisableCountryDropdownList(false);
                               setIsLoading(true);
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
                               setCountryId(defaultId);
                               setParishId(defaultId);
                               setGetAllOutreaches(!getAllOutreaches);                                
                                setDisableParishDropdownList(true);
                                setIsLoading(true);
                             }else if (value){
                               setParishId(defaultId);
                              setCountryId(value);
                              setDisableParishDropdownList(false);
                              setIsLoading(true);
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
                              setIsLoading(true);
                              setParishId(defaultId);
                              setGetAllOutreaches(!getAllOutreaches);
                             }else if (value){
                              setParishId(value);
                              setIsLoading(true);
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
                
                {outreaches && <Table 
                title={() => <h2>Outreaches</h2>} 
                loading={isLoading} 
                rowKey ={record => record.id} 
                columns={columns} 
                dataSource={outreaches.map(o => ({parish:o.parish?.name, province:o.province?.name, zone:o.zone?.name, country:o.country?.countryName, createdAt:o.createdAt, newNation:o.newNation, newParish:o.newParish, churchDedication: o.churchDedication, notes: o.notes, id: o.id || o._id}))}
                pagination={{total, onChange:handlePageChange, ...pagination}}
                summary = {pagedData => {
                  let totalNewNation =0;
                  let totalNewParish = 0;
                  let totalChurchDedication = 0;

                  pagedData.forEach(({newNation, newParish, churchDedication}) => {

                    totalNewNation+=newNation;
                    totalNewParish+=newParish;
                    totalChurchDedication+=churchDedication;

                  })

                  const footerData = ["","", totalNewNation, totalNewParish, totalChurchDedication];                                      
                  const reportData = pagedData.map(elt=> [`${moment(elt.createdAt).format(dateFormatList[0])}`, elt.parish, elt.newNation, elt.newParish, elt.churchDedication, elt.notes]);
                   return(
                     <>
                      <Table.Summary.Row>
                        <Table.Summary.Cell><button className="btn btn-secondary" onClick={() => generatePDF(columns, reportData, "Outreach Report by Parish",footerData, true)}>EXPORT</button></Table.Summary.Cell>
                        <Table.Summary.Cell>TOTAL</Table.Summary.Cell>
                        <Table.Summary.Cell>{totalNewNation}</Table.Summary.Cell>
                        <Table.Summary.Cell>{totalNewParish}</Table.Summary.Cell>
                        <Table.Summary.Cell>{totalChurchDedication}</Table.Summary.Cell>
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

export default OutreachReport;