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
import DataTable from 'react-data-table-component';
import { AuthContext } from '../../../../context/AuthContext';

const WelfareList  = () => {

    const [welfares, setWelfares] = useState([]);
    const alert = useAlert();
    const history = useHistory();
    const { confirm } = Modal;
    const {userInfo} = useContext(AuthContext);

    useEffect(() => {
        const source = axios.CancelToken.source();

        const getWelfares = async () => {
            try{
                const {data} = await requestAxios.get(`/parishes/${userInfo.id}/welfares`, {cancelToken:source.token});
                // const {data} = await requestAxios.get(`/welfares`, {cancelToken:source.token});
                setWelfares(data.body);

            }catch(err){
                if(err.response && err.response.data){
                    alert.error(err.response.data.message);
                  }else{
                  alert.error("An unexpected error occured.");
                  }
            }
        }

        getWelfares();

        return (() =>{
            source.cancel();
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
            await requestAxios.delete(`/welfares/${welfare.id}`);
            history.push(`/parish/welfares/list`); 
          },
          onCancel() {
          },
        });
      }

 
    const columns = [
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'key',
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
            <Link className="btn btn-info" to={`${record.id}/edit`}>Edit</Link>
            <button className="btn btn-danger" onClick={() => showDeleteConfirm(record)}>Delete</button>
          </Space>
        ),
      }
    ]

    if(!welfares.length) return <h1>No Data Yet..</h1>
    return(
        <div>
            <R3Card>
                <Table title= {() => <h2>Welfares</h2>} columns={columns} dataSource={welfares} />
            </R3Card>
        </div>
    )
}

export default WelfareList;