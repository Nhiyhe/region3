import React, { useContext, useEffect, useState } from 'react';
import requestAxios from '../../../../util/requestAxios';
import axios from 'axios';
import { AuthContext } from '../../../../context/AuthContext';
import { useAlert } from 'react-alert';
import Loading from '../../../../components/Loading';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Table, Modal, Space, Tag } from 'antd';
import {Link} from 'react-router-dom';
import './PastorList.css';

const PastorList = () => { 
    const { confirm } = Modal;

    const alert = useAlert();
    const {userInfo} = useContext(AuthContext);
    const [pastors, setPastors] = useState([]);

    useEffect(() => {
        const source = axios.CancelToken.source();

        const getAllParishes = async () => {
            try{
                const {data} = await requestAxios.get(`/pastors`,{cancelToken:source.token});
                setPastors(data.body);
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

    const columns = [
        {
          title: 'FirstName',
          dataIndex: 'firstName',
          key:'firstName',
         },
         {
            title: 'LastName',
            dataIndex: 'lastName',
            key:'lastName',
           },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
            render: p => (
                <> <Tag color={p === "Parish Pastor" ? "magenta" : "purple"}>{p.toUpperCase()}</Tag></>
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

      
      function showDeleteConfirm(pastor) {
        confirm({
          title: `Are you sure, you want to delete ${pastor.firstName} ${pastor.lastName}?`,
          icon: <ExclamationCircleOutlined />,
          content: 'This operation is not reversible.',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          async onOk() {
            await requestAxios.delete(`/pastor/${pastor.id}`);
            window.location ='/pastor/lists';            
          },
          onCancel() {
          },
        });
      }


    if(!pastors.length) return <Loading />
    return(
        <div className="PastorList">
            <h1 className="PastorList-heading">Pastors</h1>
            <Table rowKey={record => record.id} columns={columns} dataSource={pastors} />            
        </div>
    )
}

export default PastorList;