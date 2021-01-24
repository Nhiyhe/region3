import React, { useEffect, useState } from 'react';
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

const WelfareList  = () => {

    const [welfares, setWelfares] = useState([]);
    const alert = useAlert();
    const history = useHistory();
    const { confirm } = Modal;


    useEffect(() => {
        const source = axios.CancelToken.source();

        const getWelfares = async () => {
            try{
                const {data} = await requestAxios.get(`/welfares`, {cancelToken:source.token});
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
        name: 'Date',
        selector: 'date',
        sortable: true,
        format: row => `${moment(row.date).format(dateFormatList[0])}`,
      },
      {
        name: 'Subject',
        selector: 'subject',
      },
      {
        name: 'Status',
        selector: 'status',
        sortable:true,
      },
      {
        name: 'Message',
        selector: 'message',
      },
      {
        name:'Actions',
        cell: row => (
          <Space size="middle">
            <Link className="btn btn-info" to={`${row.id}/edit`}>Edit</Link>
            <button className="btn btn-danger" onClick={() => showDeleteConfirm(row)}>Delete</button>
          </Space>
        ),
      }
    ]

    if(!welfares.length) return <h1>No Data Yet..</h1>
    return(
        <div>
            <R3Card>
                <DataTable title="Welfares" columns={columns} data={welfares} />
            </R3Card>
        </div>
    )
}

export default WelfareList;