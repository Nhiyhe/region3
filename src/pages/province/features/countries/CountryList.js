import { Table, Modal, Space } from 'antd';
import React, {useEffect, useState, useContext} from 'react';
import requestAxios from '../../../../util/requestAxios';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import Loading from '../../../../components/Loading';
import {AuthContext} from '../../../../context/AuthContext';
import {Field, Form, Formik} from 'formik';
import R3Card from '../../../../components/Card';
import {useAlert} from 'react-alert';
import './CountryList.css';

const CountryList = () => {
    const [countries, setCountries] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [zones, setZones] = useState([]);
    const {isAdmin, userInfo} = useContext(AuthContext);

    const [provinceId, setProvinceId] = useState("5fc5d6236c07300004aea00c");
    const [zoneId, setZoneId] = useState("5ff06695ba40b74a90f32105");
    const [getAllCountries, setGetAllCountries] = useState(false);
    const [getAllCountriesByProvinceId, setGetAllCountriesByProvinceId] = useState(false);
    const [disableZoneDropdownList, setDisableZoneDropDownList] = useState(true);

    const { confirm } = Modal;
    const alert = useAlert();
    const history = useHistory();

    useEffect(() => {
      const source = axios.CancelToken.source();
      const getProvinces = async () => {
        try{
          const { data } = await requestAxios.get("/provinces",{cancelToken:source.token});
          setProvinces(data.body);
          setIsLoading(false);                                                               

        }catch(err){
          console.error(err.message)
        }
      };
        getProvinces();

        return (() => {
          source.cancel();
        })
   
    }, [])

    useEffect(() => {

      const source = axios.CancelToken.source();

      const getZonesByProvinceId= async (provinceId) => {
        try{
          const { data } = await requestAxios.get(`/provinces/${provinceId}/zones`, {cancelToken:source.token});
          setZones(data.body);
          setIsLoading(false);                                                                

        }catch(err){
          console.error(err.message)
        }
      };
      getZonesByProvinceId(provinceId);

      return (() => {
        source.cancel();
      })
    },[provinceId]);

    
    useEffect(() => {

      const source = axios.CancelToken.source();

      const getCountriesByProvinceId= async (provinceId) => {
        try{
          const { data } = await requestAxios.get(`/provinces/${provinceId}/countries`, {cancelToken:source.token});
          setCountries(data.body);
          setIsLoading(false);                                                                

        }catch(err){
          console.error(err.message)
        }
      };
      getCountriesByProvinceId(provinceId);

      return (() => {
        source.cancel();
      })
    },[provinceId]);


    useEffect(() => {

      const source = axios.CancelToken.source();

      const getCountriesByProvinceId= async (provinceId) => {
        try{
          const { data } = await requestAxios.get(`/provinces/${provinceId}/countries`, {cancelToken:source.token});
          setCountries(data.body);
          setIsLoading(false);                                                                

        }catch(err){
          console.error(err.message)
        }
      };
      getCountriesByProvinceId(provinceId);

      return (() => {
        source.cancel();
      })
    },[getAllCountriesByProvinceId ]);

    
    useEffect( ()=> {
      const source = axios.CancelToken.source();

      const getCountries = async() => {
          try{
              const {data} = await requestAxios.get(`/countries`, {cancelToken:source.token});
               setCountries(data.body);
               setIsLoading(false);                                                               

          }catch(err){
              console.error(err);
          }
      }
      getCountries();

      return (() =>{
          source.cancel();
      })
  },[getAllCountries])


    useEffect( ()=> {
        const source = axios.CancelToken.source();

        const getCountries = async() => {
            try{
                const {data} = await requestAxios.get(`/zones/${zoneId}/countries`, {cancelToken:source.token});
                 setCountries(data.body);
                 setIsLoading(false);                                                                

            }catch(err){
                console.error(err);
            }
        }
        getCountries();

        return (() =>{
            source.cancel();
        })
    },[zoneId])

    function showDeleteConfirm(country) {
        confirm({
          title: `Are you sure, you want to delete ${country.name}?`,
          icon: <ExclamationCircleOutlined />,
          content: 'This operation is not reversible.',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          async onOk() {
            try{
              const {data} = await requestAxios.delete(`/countries/${country.id}`);
              alert.success(data.message);
              window.location ='/countries/lists'; 
            } catch(err){
              if(err.response && err.response.data){
                alert.error(err.response.data.message);
              }else{
              alert.error("An unexpected error occured.");
              }
            }          
          },
          onCancel() {
          },
        });
      }

    const columns = [
      {
        title: 'Province',
        dataIndex: 'province',
        key: 'province'
      },
      {
        title: 'Zone',
        dataIndex: 'zone',
        key: 'zone'
      },
        {
          title: 'Country Name',
          dataIndex: 'country',
          key: 'country',
        },
        {
          title: 'Country Capital',
          dataIndex: 'countryCapital',
          key: 'countryCapital',
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

    return (      
     <>
         <div>
      <div className="col-6 offset-3">
      <R3Card>
        <Formik
        initialValues={{}}
        >
            {() => (
                <Form>
                     <div className="form-group">
                    <label htmlFor="province" className="form-label">Province</label>
                    <Field as="select" name="province" className="form-control form-control-lg" id="province" onChange={(e) => {
                      const value = e.target.value;
                      if(value && value == 'all'){
                        setGetAllCountries(!getAllCountries);
                        setDisableZoneDropDownList(true);
                        setIsLoading(true);                                                               

                      }else{
                        setDisableZoneDropDownList(false)
                        setProvinceId(value);
                        setZones([]);
                        setIsLoading(true);                                                                

                      }
                         // setDisableZoneDropdownList(false);
                        // setCountries([]);
                        // setDisableCountryDropdownList(true);
                        
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
                      setGetAllCountriesByProvinceId(!getAllCountriesByProvinceId);
                      setIsLoading(true); 
                    }
                    else{
                      setZoneId(value);
                      setIsLoading(true);
                    }
                      // setDisableCountryDropdownList(false);
                      //disableZoneDropdownList
                  }} disabled={disableZoneDropdownList}>
                    <option value="">Select Zone</option>
                    <option value="all">Show All Zones</option>
                    {zones.map((zone) => {
                        return <option key={zone.id} value={zone.id}>{zone.name}</option>
                    })}
                  </Field>
                </div>
               </Form>
            )}
        </Formik>
      </R3Card>
      </div>
      </div>

        {countries && <Table title={() => <h1 className="CountryList-heading">Countries</h1>} loading={isLoading} rowKey={record => record.id} dataSource={countries.map(c => ({id:c.id, province:c.province?.name, zone:c?.zone.name, country:c.countryName, countryCapital:c.countryCapital}))} columns={columns} pagination={false} />}
     </>
    )
}


export default CountryList;