import React, {useState, useEffect, useContext} from 'react';
import Card from '../../../../components/Card';
import requestAxios from '../../../../util/requestAxios';
import './MonetaryList.css';
import { AuthContext } from '../../../../context/AuthContext';
import { Space, Modal, Tag, Table} from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { dateFormatList } from '../../../../helpers/dateHelper';
import { ExclamationCircleOutlined } from '@ant-design/icons';


const MonetaryList = () => {
    const [parishMonetaryRecords, setParishMonetaryRecords] = useState([]);
    const {userInfo} = useContext(AuthContext);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(3);
    const { confirm } = Modal;
    const [pagination, setPagination] = useState({page:1, limit:10})


    useEffect(() => {
      const source = axios.CancelToken.source();
        const getParishMonetaryRecords  = async() => {          
            try{
                const {data} = await requestAxios.get(`/parishes/${userInfo.id}/monetaryrecords?page=${pagination.page}&limit=${pagination.limit}`,{cancelToken:source.token});
                setParishMonetaryRecords(data.body);
            }catch(err){
            }
        }

        getParishMonetaryRecords();

        return(()=>{
          source.cancel();
        })
    }, [userInfo.id, page, limit])

   

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

  
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      fixed: true,
      width: 140,
      render: date => (
      <>{moment(date).format(dateFormatList[0])}</>
        )
    },
    {
      title:'Tithe',
      dataIndex:'tithe',
      key:'tithe',
      width: 140,
      render: t => (
        <>€{t.toFixed(2)}</>
      )
    },
    {
      title:'Offering',
      dataIndex:'offering',
      key:'offering',
      width: 140,
      render: offering => (
        <> €{offering.toFixed(2)}</>
      )
    },
    {
      title:'Expected Amount',
      dataIndex:'expectedRemittance',
      key:'expectedRemittance',
      width:140,
      render: expec => (
        <>€{expec.toFixed(2)}</>
      )
    },
    {
      title:'Opening Balance',
      dataIndex:'openingBalance',
      key:'openingBalance',
      width:140,
      render: openingBal => (
        <>€{openingBal.toFixed(2)}</>
      )
    },
    {
      title:'Actions',
      render: row => (
        <Space size="middle">
               <Link className="btn btn-outline-success" to={`${row.id}/detail`}>DETAILS</Link>
              {!row.paymentMade && <Link className="btn btn-info" to={`${row.id}/edit`}>MAKE A PAYMENT</Link>}
              {row.paymentMade && <Tag color="success">TRANSACTION COMPLETED</Tag>}
       </Space>
      )
    }
  ]

 if(!parishMonetaryRecords.length) return <h1>No Data Yet..</h1>

    return (
       <section className="MonetaryList">
           <div>
               <Card>               
                   <Table 
                   rowKey={record => record.id}
                   columns={columns} 
                   dataSource={parishMonetaryRecords}
                   pagination={{pageSize:10, total:parishMonetaryRecords.length}} 
                   summary={ pagedData => {
                    let totalTithe = 0;
                    let totalOffering = 0;
                    let totalexpectedRemittance = 0;
                    let totalOpeningBalance = 0;
                    pagedData.forEach(({tithe, offering, expectedRemittance,openingBalance}) => {
                          totalTithe+= tithe;
                          totalOffering+= offering;
                          totalexpectedRemittance+= expectedRemittance;
                          totalOpeningBalance+= openingBalance;
                    });

                    return (
                      <>
                        <Table.Summary.Row>
                        <Table.Summary.Cell><b>TOTAL</b></Table.Summary.Cell>
                        <Table.Summary.Cell><b>€{totalTithe.toFixed(2)}</b></Table.Summary.Cell>
                        <Table.Summary.Cell><b>€{totalOffering.toFixed(2)}</b></Table.Summary.Cell>
                        <Table.Summary.Cell><b>€{totalexpectedRemittance.toFixed(2)}</b></Table.Summary.Cell>
                        <Table.Summary.Cell><b>€{totalOpeningBalance.toFixed(2)}</b></Table.Summary.Cell>
                        </Table.Summary.Row>
                      </>
                    )
                    
                   }}
                   />
               </Card>
           </div>
       </section>
    )
}

export default MonetaryList;