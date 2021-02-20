import React,{useState, useContext, useEffect} from 'react';
import R3Card from '../../../../components/Card';
import { AuthContext } from '../../../../context/AuthContext';
import requestAxios from '../../../../util/requestAxios';
import axios from 'axios';
import {Field, Form} from 'formik-antd';
import { Formik } from 'formik';
import { Table, Space, Modal } from 'antd';
import {Link} from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Loading from '../../../../components/Loading';
import {useAlert} from 'react-alert';
import './ZoneList.css';


const ZoneList  = () => {
  const {userInfo, isAdmin} = useContext(AuthContext);
  const [provinces, setProvinces] = useState([]);
  const [zones, setZones] = useState([]);
  const [isLoading, setIsLoading]= useState(true);
  const [provinceId, setProvinceId] = useState('5fc38e7d4dc52100044c578e');
  const [getAllZones, setGetAllZones] = useState(false);
  const [getAllZonesOnInitialLoad, setGetAllZonesOnInitialLoad] = useState(false);
  const alert = useAlert();

  const { confirm } = Modal;

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getProvinces = async () => {
      try{
        const { data } = await requestAxios.get('/provinces',{cancelToken:source.token});
        setProvinces(data.body);
        setIsLoading(false);
      }catch(err){
        console.error(err.message)
      }
    };
    getProvinces();

    return (() => {
      source.cancel()
    })
  }, []);

  function showDeleteConfirm(zone) {
    confirm({
      title: `Are you sure, you want to delete ${zone.name}?`,
      icon: <ExclamationCircleOutlined />,
      content: 'This operation is not reversible.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        try{
          const {data} = await requestAxios.delete(`/zones/${zone.id}`);
          alert.success(data.message);
          window.location ='/zones/lists';
        } catch(err)
        {
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

  useEffect(() => {
    const source = axios.CancelToken.source();
   const getZonesByProvinceId = async() => {
    try{
        const {data} = await requestAxios.get(`/provinces/${provinceId}/zones`,{cancelToken:source.token});
        setZones(data.body);
        setIsLoading(false);                                                               

    }catch(err){
        console.error(err);
    }    
   }

   getZonesByProvinceId();

   return (() => {
    source.cancel()
  })
  },[provinceId]);

  useEffect(() => {
    const source = axios.CancelToken.source();
   const getAllZones = async() => {
    try{
        const {data} = await requestAxios.get(`/zones`,{cancelToken:source.token});
        setZones(data.body);
        setIsLoading(false);                                                                

    }catch(err){
        console.error(err);
    }    
   }

   getAllZones();

   return (() => {
    source.cancel()
  })
  },[ getAllZones ]);

  const columns = [
    {
      title: 'Province',
      dataIndex: 'province',
      key: 'province'
    },
    {
      title: 'Zone',
      dataIndex: 'zone',
      key: 'zone',
    },
    {
      title: 'Location',
      dataIndex: 'locationAddress',
      key: 'locationAddress',
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

  if(!provinces.length) return <Loading />;

    return(
        <div>
            <div className="col-6 offset-3">
            <R3Card>
              <Formik
              initialValues={{}}
              >
                  {() => (
                      <Form>
                      <div className="form-group">
                          <label className="form-label">Provinces</label>
                          <Field as="select" name="province" className="form-control form-control-lg" onChange={(e)=>{
                              const value = e.target.value;
                                if(value && value === 'all'){
                                  setGetAllZones(!getAllZones);  
                                  setIsLoading(true);                                                                
                              }else if(value){
                                setProvinceId(value);
                                setIsLoading(true); 
                              }
                              else{
                                  setZones([]);
                                  setIsLoading(true);                                                              

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
                  </Form>
                  )}
              </Formik>
            </R3Card>
            </div>
            <R3Card>
                <Table title={() => <h1 className="ZoneList-heading">Zones</h1>} loading={isLoading} rowKey={data => data._id} columns={columns} dataSource={zones.map(z => ({id:z.id || z._id, province:z.province?.name, zone:z.name, locationAddress:z.locationAddress})) } pagination={false} />
            </R3Card>
        </div>
    )
}

export default ZoneList;