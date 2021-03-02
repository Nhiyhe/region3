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
    const [pagination, setPagination] = useState({page:1, pageSize:10});
    const [total, setTotal] = useState(0);


    const source = axios.CancelToken.source();

    const getPastors = async (page) => {
      try{
          const {data} = await requestAxios.get(`/pastors?page=${page}&limit=${pagination.pageSize}`,{cancelToken:source.token});
          setPastors(data.body);
          setTotal(data.total);
      }catch(err){         
            if(axios.isCancel(err)){
              return;
            }else{
              console.error("There was a problem");
            }

      }
    }

    useEffect(() => {
        
        getPastors(1)
       
        return (() =>{
            source.cancel();
        })
        
    }, []);

    const handlePageChange = page => {
      getPastors(page);
    };
  

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
            <Table 
            rowKey={record => record._id} 
            columns={columns} 
            dataSource={pastors}
            pagination={{total, onChange:handlePageChange, ...pagination}} />            
        </div>
    )
}

export default PastorList;