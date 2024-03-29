import React, { useEffect, useState, useContext } from 'react';
import requestAxios from '../../../../util/requestAxios';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Table, Modal, Space } from 'antd';
import {Link} from 'react-router-dom';
import { Field, Form, Formik} from "formik";
import axios from 'axios';
import Loading from '../../../../components/Loading';
import {AuthContext} from '../../../../context/AuthContext';
import { useAlert } from 'react-alert';
import './ParishList.css';
import R3Card from '../../../../components/Card';

const ParishList = () => {
    const defaultId = "5fc5d6236c07300004aea00c";
    const alert = useAlert();
    const { confirm } = Modal;
    const {userInfo,isAdmin} = useContext(AuthContext);
    const [provinces, setProvinces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [zones, setZones] = useState([]);
    const [countries, setCountries] = useState([]);
    const [parishes, setParishes] = useState([]);
    const [provinceId, setProvinceId] = useState("5fc5d6236c07300004aea00c");
    const [zoneId, setZoneId] = useState("5fc5d6236c07300004aea00c");
    const [countryId, setCountryId] = useState("5fc5d6236c07300004aea00c");
    const [disableZoneDropdownList, setDisableZoneDropdownList] = useState(true);
    const [disableCountryDropdownList, setDisableCountryDropdownList] = useState(true);
    const [showAllParishes, setShowAllParishes] = useState(false);
    const [getAllParishesByProvinceId, setGetAllParishesByProvinceId] = useState(false);
    const [getAllParishesByZoneId, setGetAllParishesByZoneId] = useState(false);
    const [pagination, setPagination] = useState({page:1, pageSize:10});
    const [total, setTotal] = useState(0);

    const requestToken = axios.CancelToken.source();

    const getAllParishes = async (page) => {
      try{
          const {data} = await requestAxios.get(`/parishes?province=${provinceId}&zone=${zoneId}&country=${countryId}&page=${page}&limit=${pagination.pageSize}`,{cancelToken:requestToken.token});
          const allParishes = data.body;
          if(isAdmin()){
             setParishes(allParishes);
             setTotal(data.total);
             setIsLoading(false);
          }else{
            const parishesByProvinceId = allParishes.filter(parish => parish.provincePastor === userInfo.id)
             setParishes(parishesByProvinceId);
             setTotal(data.total);
             setIsLoading(false);
          }
          
      }catch(err){
        
            if(axios.isCancel(err)){
              return;
            }else{
              console.error("There was a problem");
            }

      }
  }

    useEffect(() => {
      const source = axios.CancelToken.source();
      const getProvinces = async () => {
        try{
          const { data } = await requestAxios.get("/provinces",{cancelToken:source.token});
          setProvinces(data.body);
          setIsLoading(false);
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
   
    }, [])

    useEffect(() => {
       
        getAllParishes(1);
        return (() =>{
            requestToken.cancel();
        })
        
    }, [showAllParishes]);

    
    useEffect(() => {
      const source = axios.CancelToken.source();
      const getZonesByProvinceId = async () => {
        try{
          const { data } = await requestAxios.get(`/provinces/${provinceId}/zones`, {cancelToken:source.token});
          setZones(data.body);
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

    const getParishesByProvinceId = async () => {
      try{
        const { data } = await requestAxios.get(`/provinces/${provinceId}/parishes`, {cancelToken:source.token});
        setParishes(data.body);
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
      getParishesByProvinceId();

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
          setIsLoading(false);
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

    const handlePageChange = page => {
      getAllParishes(page);
    };

    function showDeleteConfirm(parish) {
        confirm({
          title: `Are you sure, you want to delete ${parish.name}?`,
          icon: <ExclamationCircleOutlined />,
          content: 'This operation is not reversible.',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          async onOk() {
            await requestAxios.delete(`/parishes/${parish.id}`);
            window.location ='/parishes/lists';            
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

    const columns = [
        {
          title:'Province',
          dataIndex:'province',
          key:'province'
        },
        {
          title:'Zone',
          dataIndex:'zone',
          key:'zone'
        },
        {
          title:'Country',
          dataIndex:'country',
          key:'country'
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: p => (
            <>{p.toUpperCase()}</>
          )
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Parish Pastor',
          dataIndex: 'parishPastor',
          key: 'parishPastor'
        },
        {
          title: 'Province Pastor',
          dataIndex: 'provincePastor',
          key: 'provincePastor'
        },
        {
            title: 'Actions',
            key: 'action',
            render: (text, record) => (
              <Space size="middle">
                <Link className="btn btn-info" to={`${record.id}/edit`}>Edit</Link>
                <button className="btn btn-danger" onClick={() => showDeleteConfirm(record)}>Delete</button>
              </Space>
            ),
          },
      ];

    if(!provinces.length) return <Loading />
console.log(parishes);
    return(
      <>
          <div className="col-6 offset-3">
              <R3Card>
                  <Formik>
                    {() => (
                      <Form>
                      <div className="form-group">
                      <label className="form-label" htmlFor="province">Province</label>
                      <Field as="select" name="province" className="form-control form-control-lg" id="province" onChange={(e) => {
                        const value = e.target.value;
                        if(value && value === 'all'){
                          setProvinceId(defaultId);
                          setZoneId(defaultId);
                          setCountryId(defaultId);
                          setDisableZoneDropdownList(true);
                          setDisableCountryDropdownList(true);
                          setIsLoading(true);
                          setShowAllParishes(!showAllParishes);
                          
                        }else if(value){
                          setZoneId(defaultId);
                          setCountryId(defaultId);
                          setIsLoading(true);
                          setProvinceId(value);
                          setShowAllParishes(!showAllParishes);
                          // getProvincePastor(e.target.value);
                          setZones([]);
                          setDisableZoneDropdownList(false);
                          setCountries([]);
                          setDisableCountryDropdownList(true);
                        }else{
                          return;
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
                        setZoneId(defaultId);
                        setCountryId(defaultId);
                        setIsLoading(true);
                        setShowAllParishes(!showAllParishes);
                        setDisableCountryDropdownList(true);
                      }else if(value){
                        setCountryId(defaultId);
                        setIsLoading(true);
                        setZoneId(value);
                        setShowAllParishes(!showAllParishes);
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
  
                <div className="form-group mb-5">
                  <label>Country</label>
                  <Field as="select" name="country" className="form-control form-control-lg" onChange={ e => {
                    const value = e.target.value;
                    if(value && value === 'all'){
                      setCountryId(defaultId);
                      setIsLoading(true);
                      setShowAllParishes(!showAllParishes);

                    }else if(value){
                      setIsLoading(true);
                      setCountryId(value);
                      setShowAllParishes(!showAllParishes);
                    }else{
                      return;
                    }
                  }} disabled = {disableCountryDropdownList}>
                    <option value="">Select Country</option>
                    <option value="all">Show All Countries</option>
                    {countries.map((country) => {
                        return <option key={country.id} value={country.id}>{country.countryName}</option>
                    })}
                  </Field>
                </div> 
                </Form>
                    )}
                  </Formik>
              </R3Card>
          </div>


           <div className="ParishList">
            <h2 className="ParishList-heading">Parishes</h2>
            <Table rowKey={record => record.id} 
            loading={isLoading} 
            columns={columns} 
            dataSource={parishes.map(p => ({id:p._id || p.id, name:p.name, email:p.email, parishPastor:`${p?.parishPastor?.firstName} ${p?.parishPastor?.lastName}`, provincePastor:`${p?.provincePastor?.firstName} ${p?.provincePastor?.lastName}`, province:p.country?.zone?.province?.name, zone:p.country?.zone?.name, country:p.country?.countryName}))}
            pagination={{total, onChange:handlePageChange, ...pagination}}
            />
        </div>
      </>
    )
}

export default ParishList;