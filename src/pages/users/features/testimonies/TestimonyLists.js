import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import R3Card from '../../../../components/Card';
import requestAxios from '../../../../util/requestAxios';
import axios from 'axios';
import { Space, Table, Modal } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Loading from '../../../../components/Loading';
import moment from 'moment';
import {dateFormatList} from '../../../../helpers/dateHelper';
import DataTable from 'react-data-table-component';


const TestimonyLists = () => {
    const [testimonies, setTestimonies] = useState([]);
    const alert= useAlert();
    const { confirm } = Modal;
    const history = useHistory();

    useEffect(() => {
        const source = axios.CancelToken.source();

        const getTestimonies = async () => {
            try{
                const {data} = await requestAxios.get(`/testimonies`, {cancelToken:source.token});
                setTestimonies(data.body);

            }catch(err){
                if(err.response && err.response.data){
                    alert.error(err.response.data.message);
                  }else{
                  alert.error("An unexpected error occured.");
                  }
            }
        }

        getTestimonies();

        return (() =>{
            source.cancel();
        })
    },[]);


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
            history.push(`/parish/testimonies/list`);           
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

   
    const columns = [
      {
        name: 'Date',
        selector: 'createdAt',
        sortable: true,
        maxWidth: '120px',
        format: row => `${moment(row.createdAt).format(dateFormatList[0])}`,
      },
      {
        name: 'Title',
        selector: 'title',
        maxWidth: '300px',
        format: row => `${row.title.toUpperCase()}`,

      },
      {
        name: 'Testifier',
        selector: 'testifier',
        sortable:true,
      },
      {
        name: 'Testimony',
        selector: 'body',
        maxWidth: '400px',
        format: row => `${row.body.slice(0, 90)}...`,
      },
      {
        name:'Actions',
        cell: row => (
          <Space size="middle">
            <Link className="btn btn-success" to={`${row.id}/detail`}>Read</Link>
            <Link className="btn btn-info" to={`${row.id}/edit`}>Edit</Link>
            <button className="btn btn-danger" onClick={() => showDeleteConfirm(row)}>Delete</button>
          </Space>
        ),
      }
    ]

    if(!testimonies.length) return <h1>No Data Yet..</h1>

    return(
      <div>
            <R3Card>                
                <DataTable title="Testimonies" columns={columns} data={testimonies}/>
            </R3Card>
      </div>
    )
}

export default TestimonyLists;