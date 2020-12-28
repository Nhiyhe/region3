import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import requestAxios from '../../../../util/requestAxios';
import PageContent from '../../../../components/PageContent';
import { Table, Tag, Space, Modal} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './ProvinceList.css';
import Loading from '../../../../components/Loading';

const ProvinceList = () => {
   const history = useHistory();
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
        const getProvinces = async () => {
            try{
            const {data} = await requestAxios.get(`/provinces`);
            setProvinces(data.body);
            }catch(err){
                console.error(err.message);
            }
        }

        getProvinces();
    }, [])

  
    const columns = [
        {
          title: 'Province',
          dataIndex: 'name',
          key: 'name',
          render: text => <a>{text}</a>,
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
                <a>{p.pastorName}</a>
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

    if(!provinces || provinces.length < 0){
        return <Loading />
    }
    return (
        <PageContent>
            <Table title={() => <h2 className="ProvinceList-title">List of Provinces</h2>} dataSource={provinces}columns={columns} size="small" />
        </PageContent>
    )
}

export default ProvinceList;