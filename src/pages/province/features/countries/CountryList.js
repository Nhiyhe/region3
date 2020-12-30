import { Table, Modal, Space } from 'antd';
import React, {useEffect, useState} from 'react';
import requestAxios from '../../../../util/requestAxios';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Loading from '../../../../components/Loading';

const CountryList = () => {
    const [countries, setCountries] = useState([]);
    const { confirm } = Modal;

    useEffect( ()=> {
        const source = axios.CancelToken.source();

        const getCountries = async() => {
            try{
                const {data} = await requestAxios.get('/countries', {cancelToken:source.token});
                 setCountries(data.body);
            }catch(err){
                console.error(err);
            }
        }
        getCountries();

        return (() =>{
            source.cancel();
        })
    },[])

    function showDeleteConfirm(country) {
        confirm({
          title: `Are you sure, you want to delete ${country.name}?`,
          icon: <ExclamationCircleOutlined />,
          content: 'This operation is not reversible.',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          async onOk() {
            await requestAxios.delete(`/countries/${country.id}`);
            window.location ='/countries/lists';            
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

    const columns = [
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

    if(!countries.length) return <Loading />
    return (      
        <Table rowKey={record => record.id} dataSource={countries} columns={columns} />
    )
}


export default CountryList;