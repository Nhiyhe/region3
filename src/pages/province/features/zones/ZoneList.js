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


const ZoneList  = () => {
const {userInfo, isAdmin} = useContext(AuthContext);
  const [provinces, setProvinces] = useState([]);
  const [zones, setZones] = useState([]);
  const [provinceId, setProvinceId] = useState('5fc38e7d4dc52100044c578e');

  const { confirm } = Modal;

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getProvinces = async () => {
      try{
        const { data } = await requestAxios.get('/provinces',{cancelToken:source.token});
        setProvinces(data.body);
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
        await requestAxios.delete(`/zones/${zone.id}`);
        window.location ='/zones/lists';            
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  useEffect(() => {
    const source = axios.CancelToken.source();
   const getZonesByProvinceId = async() => {
    try{
        const {data} = await requestAxios.get(`/provinces/${provinceId}/zones`,{cancelToken:source.token});
        setZones(data.body);
    }catch(err){
        console.error(err);
    }    
   }

   getZonesByProvinceId();

   return (() => {
    source.cancel()
  })
  },[provinceId]);

  const columns = [
    {
      title: 'Zone',
      dataIndex: 'name',
      key: 'name',
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
                              if(e.target.value){
                                  setProvinceId(e.target.value);
                              }else{
                                  setZones([]);
                              }
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
                  </Form>
                  )}
              </Formik>
            </R3Card>
            </div>

            <hr/>

            <R3Card>
                <Table rowKey={data =>data.id} columns={columns} dataSource={zones} />
            </R3Card>
        </div>
    )
}

export default ZoneList;