import { Space, Table, Modal } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import requestAxios from '../../../../util/requestAxios';
import { useAlert } from 'react-alert';
import moment from 'moment';
import {dateFormatList} from '../../../../helpers/dateHelper';
import R3Card from '../../../../components/Card';
import { Link } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { AuthContext } from '../../../../context/AuthContext';
import Loading from '../../../../components/Loading';


const OutreachList = () => {
    const [outreaches, setOutreaches] = useState([]);
    const {userInfo} = useContext(AuthContext);
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({page:1, pageSize:10});
    const alert = useAlert();
    const { confirm } = Modal;

    const getOutreaches = async page => {
      try{
        const {data} = await requestAxios.get(`/parishes/${userInfo.id}/outreaches?page=${page}&limit=${pagination.pageSize}`);
          setOutreaches(data.body);
          setTotal(data.total);

      }catch(err){
          if(err.response && err.response.data){
              alert.error(err.response.data.message);
            }else{
            alert.error("An unexpected error occured.");
            }
      }
  }


    useEffect(() => {
        getOutreaches(1);
    }, []);

    function showDeleteConfirm(outreach) {
        confirm({
          title: `Are you sure, you want to delete ${outreach.name || "this record"}?`,
          icon: <ExclamationCircleOutlined />,
          content: 'This operation is not reversible.',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          async onOk() {
            await requestAxios.delete(`/outreaches/${outreach._id}`);
            window.location = `/parish/outreaches/lists`;           
          },
          onCancel() {
          },
        });
      }

      const handlePageChange = page => {
        getOutreaches(page);
      };

    const columns = [
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
          render: date => (
            <>{moment(date).format(dateFormatList[0])}</>
          )
        },
        {
            title: 'Church Dedication',
            dataIndex: 'churchDedication',
            key: 'churchDedication'
          },
          {
            title: 'New Parish',
            dataIndex: 'newParish',
            key: 'newParish'
          },
          {
            title: 'New Nation',
            dataIndex: 'newNation',
            key: 'newNation'
          },
          {
            title: 'Actions',
            key: 'action',
            render: (text, record) => (
              <Space size="middle">
                <Link className="btn btn-info" to={`${record._id}/edit`}>Edit</Link>
                <button className="btn btn-danger" onClick={() => showDeleteConfirm(record)}>Delete</button>
              </Space>
            ),
          },
    ]

    if(!outreaches.length) return <Loading />

    return(
        <div>
                <R3Card>
                    <Table rowKey={record => record._id}  dataSource={outreaches} columns={columns} pagination={{total, onChange:handlePageChange, ...pagination}} />
                </R3Card>
        </div>
    )
}

export default OutreachList;