import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAlert } from 'react-alert';
import R3Card from '../../../../components/Card';
import { Space, Table, Modal } from 'antd';
import moment from 'moment';
import {dateFormatList} from '../../../../helpers/dateHelper';
import requestAxios from '../../../../util/requestAxios';
import { Link, useHistory } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Loading from '../../../../components/Loading';
import { AuthContext } from '../../../../context/AuthContext';

const WelfareList  = () => {

    const [welfares, setWelfares] = useState([]);
    const alert = useAlert();
    const history = useHistory();
    const { confirm } = Modal;
    const {userInfo} = useContext(AuthContext);
    const [pagination, setPagination] = useState({page:1, pageSize:10});
    const [total, setTotal] = useState(0);

    const requestToken = axios.CancelToken.source();

    const getWelfares = async (page) => {
      try{
          const {data} = await requestAxios.get(`/parishes/${userInfo.id}/welfares?page=${page}&limit=${pagination.pageSize}`,{cancelToken:requestToken.token});
          setWelfares(data.body);
          setTotal(data.total);

      }catch(err){
          if(err.response && err.response.data){
              alert.error(err.response.data.message);
            }else{
              if(axios.isCancel(err)){
                return;
              }else{
                console.error("There was a problem");
              }
            }
      }
  }

    useEffect(() => {
        getWelfares(1);
        return (() =>{
            requestToken.cancel();
        })
    }, []);

    function showDeleteConfirm(welfare) {
        confirm({
          title: `Are you sure, you want to delete this record?`,
          icon: <ExclamationCircleOutlined />,
          content: 'This operation is not reversible.',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          async onOk() {
            await requestAxios.delete(`/welfares/${welfare._id}`);
            history.push(`/parish/welfares/list`); 
          },
          onCancel() {
          },
        });
      }

      const handlePageChange = page => {
        getWelfares(page);
      };
 
    const columns = [
      {
        title: 'Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: date => `${moment(date).format(dateFormatList[0])}`,
      },
      {
        title: 'Subject',
        dataIndex: 'subject',
        key:'subject',
        render: sub => (
          <> {sub.slice(0,25).toUpperCase()} ... </>
        )
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key:'status',
      },
      {
        title: 'Message',
        dataIndex: 'message',
        key:'message',
        render: msg => (
          <> {msg.slice(0,60)}.. </>
        )
      },
      {
        title:'Actions',
        render: (text, record) => (
          <Space size="middle">
            <Link className="btn btn-info" to={`${record._id}/edit`}>Edit</Link>
            <button className="btn btn-danger" onClick={() => showDeleteConfirm(record)}>Delete</button>
          </Space>
        ),
      }
    ]

    if(!welfares.length) return <Loading />

    return(
        <div>
            <R3Card>
                <Table rowKey={record => record._id} title= {() => <h2>Welfares</h2>} columns={columns} dataSource={welfares} pagination={{total, onChange:handlePageChange, ...pagination}} />
            </R3Card>
        </div>
    )
}

export default WelfareList;