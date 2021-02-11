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
import Loading from '../../../../components/Loading';


const MonetaryList = () => {
    const [parishMonetaryRecords, setParishMonetaryRecords] = useState([]);
    const [total, setTotal] = useState(0);
    const {userInfo} = useContext(AuthContext);
    const { confirm } = Modal;
    const [pagination, setPagination] = useState({page:1, pageSize:10});


    const getParishMonetaryRecords  = async (page) => {          
      try{
          const {data} = await requestAxios.get(`/parishes/${userInfo.id}/monetaryrecords?page=${page}&limit=${pagination.pageSize}`);
          setParishMonetaryRecords(data.body);
          setTotal(data.total);
      }catch(err){
      }
  }

    useEffect(() => {
      const source = axios.CancelToken.source();
      
      getParishMonetaryRecords(1);

        return(()=>{
          source.cancel();
        })
    }, [userInfo.id])

    const handlePageChange = page => {
      console.log(page);
      getParishMonetaryRecords(page);
    };

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
      render: (text, record) => (
        <Space size="middle">
               <Link className="btn btn-outline-success" to={`${record._id}/detail`}>DETAILS</Link>
              {!record.paymentMade && <Link className="btn btn-info" to={`${record._id}/edit`}>MAKE A PAYMENT</Link>}
              {record.paymentMade && <Tag color="success">TRANSACTION COMPLETED</Tag>}
       </Space>
      )
    }
  ]

 if(!parishMonetaryRecords.length) return <Loading />

 
    return (
       <section className="MonetaryList">
           <div>
               <Card>               
                   <Table 
                   rowKey={record => record._id}
                   columns={columns} 
                   dataSource={parishMonetaryRecords}
                   pagination={{total, onChange:handlePageChange, ...pagination}} 
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