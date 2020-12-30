import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import requestAxios from '../../../../util/requestAxios';
import PageContent from '../../../../components/PageContent';
import { Table, Space, Modal} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './ProvinceList.css';
import Loading from '../../../../components/Loading';
import axios from 'axios';

const ProvinceList = () => {
    const [provinces, setProvinces] = useState([]);

    const { confirm } = Modal;

    function showDeleteConfirm(province) {
        confirm({
          title: `Are you sure, you want to delete ${province.name}?`,
          icon: <ExclamationCircleOutlined />,
          content: 'This operation is not reversible.',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          async onOk() {
            await requestAxios.delete(`/provinces/${province.id}`);
            window.location ='/provinces/lists';            
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

    useEffect(() => {
      const source = axios.CancelToken.source();
        const getProvinces = async () => {
            try{
            const {data} = await requestAxios.get(`/provinces`,{cancelToken:source.token});
            setProvinces(data.body);
            }catch(err){
                console.error(err.message);
            }
        }
        getProvinces();
        return (() => {
          source.cancel();
        })
   
    }, [])

  
    const columns = [
        {
          title: 'Province',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Location',
          dataIndex: 'locationAddress',
          key: 'locationAddress',
        },
        {
          title: 'Province Pastor',
          dataIndex: 'pastor',
          key: 'pastor',
          render: p => (
              <>
                {p.pastorName}
              </>
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

    if(!provinces.length > 0){
        return <Loading />
    }
    return (
        <PageContent>
            { <Table title={() => <h2 className="ProvinceList-title">List of Provinces</h2>} rowKey={data =>data.id}  dataSource={provinces} columns={columns} size="small" />}
        </PageContent>
    )
}

export default ProvinceList;