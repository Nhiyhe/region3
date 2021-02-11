import React, { useContext, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import R3Card from '../../../../components/Card';
import requestAxios from '../../../../util/requestAxios';
import { Space, Table, Modal } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import {dateFormatList} from '../../../../helpers/dateHelper';
import { AuthContext } from '../../../../context/AuthContext';
import Loading from '../../../../components/Loading';


const TestimonyLists = () => {
    const {userInfo} = useContext(AuthContext);
    const [testimonies, setTestimonies] = useState([]);
    const [pagination, setPagination] = useState({page:1, pageSize:10});
    const [total, setTotal] = useState(0);

    const alert= useAlert();
    const { confirm } = Modal;
    const history = useHistory();


    const getTestimonies = async page => {
      try{
          const {data} = await requestAxios.get(`/parishes/${userInfo.id}/testimonies?page=${page}&limit=${pagination.pageSize}`);
          setTestimonies(data.body);
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
        getTestimonies(1);       
    },[]);

       
  const handlePageChange = page => {
    getTestimonies(page);
  };


    function showDeleteConfirm(testimony) {
        confirm({
          title: `Are you sure, you want to delete ${testimony.name}?`,
          icon: <ExclamationCircleOutlined />,
          content: 'This operation is not reversible.',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          async onOk() {
            await requestAxios.delete(`/testimonies/${testimony.id}`);
            history.goBack();        
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

   
    const columns = [
      {
        title: 'Date',
        dataIndex: 'createdAt',
        key:'createdAt',
        render: date => `${moment(date).format(dateFormatList[0])}`,
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key:'title',
        // maxWidth: '300px',
        format: title => `${title.toUpperCase()}`,

      },
      {
        title: 'Testifier',
        dataIndex:'testifier',
        key: 'testifier',
      },
      {
        title: 'Testimony',
        dataIndex: 'body',
        key:'body',
        render: body => `${body.slice(0, 60)}...`,
      },
      {
        title:'Actions',
        render: (text, record) => (
          <Space size="middle">
            <Link className="btn btn-success" to={`${record._id}/detail`}>Read</Link>
            <Link className="btn btn-info" to={`${record._id}/edit`}>Edit</Link>
            <button className="btn btn-danger" onClick={() => showDeleteConfirm(record)}>Delete</button>
          </Space>
        ),
      }
    ]

    if(!testimonies.length) return <Loading />

    return(
      <div>
            <R3Card>                
                <Table rowKey={record => record._id} title={() => <h2>Testimonies</h2>} columns={columns} dataSource={testimonies} pagination={{total, onChange:handlePageChange, ...pagination}} />
            </R3Card>
      </div>
    )
}

export default TestimonyLists;