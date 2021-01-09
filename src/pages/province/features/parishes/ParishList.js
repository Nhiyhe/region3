import React, { useEffect, useState, useContext } from 'react';
import requestAxios from '../../../../util/requestAxios';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Table, Modal, Space } from 'antd';
import {Link} from 'react-router-dom';

import axios from 'axios';
import Loading from '../../../../components/Loading';
import {AuthContext} from '../../../../context/AuthContext';
import { useAlert } from 'react-alert';

const ParishList = () => {
  const alert = useAlert();
    const { confirm } = Modal;
    const {userInfo,isAdmin} = useContext(AuthContext);
    
    const [parishes, setParishes] = useState([]);

    useEffect(() => {
        const source = axios.CancelToken.source();

        const getAllParishes = async () => {
            try{
                const {data} = await requestAxios.get(`/parishes`,{cancelToken:source.token});
                const allParishes = data.body;
                if(isAdmin()){
                   setParishes(allParishes);
                }else{
                  const parishesByProvinceId = allParishes.filter(parish => parish.provincePastor === userInfo.id)
                   setParishes(parishesByProvinceId);
                }
                
            }catch(err){
              if(err.response && err.response.data){
                alert.error(err.response.data.message);
              }else{
              alert.error("An unexpected error occured.");
              }
            }
        }
        getAllParishes();
        return (() =>{
            source.cancel();
        })
        
    }, []);

    
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
          key: 'parishPastor',
          render: pastor =>(
            <>{pastor?.firstName} {pastor?.lastName}</>
          )
        },
        {
          title: 'Province Pastor',
          dataIndex: 'provincePastor',
          key: 'provincePastor',
          render: pastor =>(
            <>{pastor?.firstName} {pastor?.lastName}</>
          )
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


    if(!parishes.length) return <Loading />

    return(
        <div>
            <h2>Parishes</h2>
            <Table rowKey={record => record.id} columns={columns} dataSource={parishes} />
        </div>
    )
}

export default ParishList;