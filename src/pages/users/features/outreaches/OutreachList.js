import { Space, Table, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import requestAxios from '../../../../util/requestAxios';
import { useAlert } from 'react-alert';
import moment from 'moment';
import {dateFormatList} from '../../../../helpers/dateHelper';
import R3Card from '../../../../components/Card';
import { Link, useHistory } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import DataTable from 'react-data-table-component';


const OutreachList = () => {
    const [outreaches, setOutreaches] = useState([]);
    const alert = useAlert();
    const { confirm } = Modal;
    const history = useHistory();


    useEffect(() => {
        const source = axios.CancelToken.source();

        const getOutreaches = async () => {
            try{
                const {data} = await requestAxios.get(`/outreaches`, {cancelToken:source.token});
                setOutreaches(data.body);

            }catch(err){
                if(err.response && err.response.data){
                    alert.error(err.response.data.message);
                  }else{
                  alert.error("An unexpected error occured.");
                  }
            }
        }

        getOutreaches();

        return (() =>{
            source.cancel();
        })
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
            await requestAxios.delete(`/outreaches/${outreach.id}`);
            window.location = `/parish/outreaches/lists`;           
          },
          onCancel() {
          },
        });
      }

    // const columns = [
    //     {
    //       title: 'Date',
    //       dataIndex: 'date',
    //       key: 'date',
    //       render: date => (
    //         <>{moment(date).format(dateFormatList[0])}</>
    //       )
    //     },
    //     {
    //         title: 'Church Dedication',
    //         dataIndex: 'churchDedication',
    //         key: 'churchDedication'
    //       },
    //       {
    //         title: 'New Parish',
    //         dataIndex: 'newParish',
    //         key: 'newParish'
    //       },
    //       {
    //         title: 'New Nation',
    //         dataIndex: 'newNation',
    //         key: 'newNation'
    //       },
    //       {
    //         title: 'Actions',
    //         key: 'action',
    //         render: (text, record) => (
    //           <Space size="middle">
    //             <Link className="btn btn-info" to={`${record.id}/edit`}>Edit</Link>
    //             <button className="btn btn-danger" onClick={() => showDeleteConfirm(record)}>Delete</button>
    //           </Space>
    //         ),
    //       },
    // ]

    const columns = [
      {
        name: 'Date',
        selector: 'date',
        sortable: true,
        cell: row => `${moment(row.date).format(dateFormatList[0])}`,
      },
      {
        name:'New Parish',
        selector:'newParish'
      },
      {
        name:'New Nation',
        selector:'newNation'
      },
      {
        name:'Church Dedication',
        selector:'churchDedication'
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

    if(!outreaches.length) return <h1>No Data Yet..</h1>

    return(
        <div>
                <R3Card>
                    {/* <Table rowKey={record => record.id}  dataSource={outreaches} columns={columns} /> */}
                    <DataTable title="Outreaches" columns={columns} data={outreaches} pagination />
                </R3Card>
        </div>
    )
}

export default OutreachList;