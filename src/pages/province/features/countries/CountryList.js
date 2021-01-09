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

const CountryList = () => {
    const [countries, setCountries] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [zones, setZones] = useState([]);
    const {isAdmin, userInfo} = useContext(AuthContext);

    const [provinceId, setProvinceId] = useState("5fc5d6236c07300004aea00c");
    const [zoneId, setZoneId] = useState("5fc5d6236c07300004aea00c");
    const { confirm } = Modal;
    const alert = useAlert();
    const history = useHistory();

    useEffect(() => {
      const source = axios.CancelToken.source();
      const getProvinces = async () => {
        try{
          const { data } = await requestAxios.get("/provinces",{cancelToken:source.token});
          setProvinces(data.body);
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
        }catch(err){
          console.error(err.message)
        }
      };
      getZonesByProvinceId(provinceId);

      return (() => {
        source.cancel();
      })
    },[provinceId]);


    useEffect( ()=> {
        const source = axios.CancelToken.source();

        const getCountries = async() => {
            try{
                const {data} = await requestAxios.get(`/zones/${zoneId}/countries`, {cancelToken:source.token});
                 setCountries(data.body);
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
        title: 'Zone',
        dataIndex: 'zone',
        key: 'zone',
        render: c => (
          <>
            {c.name}
          </>
      )
      },
        {
          title: 'Country Name',
          dataIndex: 'countryName',
          key: 'countryName',
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
                      if(e.target.value)
                        setProvinceId(e.target.value);
                        setZones([]);
                        // setDisableZoneDropdownList(false);
                        // setCountries([]);
                        // setDisableCountryDropdownList(true);
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
                      // setDisableCountryDropdownList(false);
                      //disableZoneDropdownList
                  }} disabled={false}>
                    <option value="">Select Zone</option>
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

      <hr/>

        {countries && <Table rowKey={record => record.id} dataSource={countries} columns={columns} />}
     </>
    )
}


export default CountryList;