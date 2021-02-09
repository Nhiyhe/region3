import React,{useState, useEffect, useContext} from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import requestAxios from '../../../../util/requestAxios';
import axios from 'axios';
import { Space, Modal, Table} from 'antd';
import { Link } from 'react-router-dom';
import R3Card from '../../../../components/Card';
import moment from 'moment';
import {dateFormatList} from '../../../../helpers/dateHelper';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './AttendanceList.css';

const AttendanceList = () => {
    const [attendances, setAttendances] = useState([]);
    const [total, setTotal] = useState(0);
    const {userInfo} = useContext(AuthContext);
    const [pagination, setPagination] = useState({page:1, pageSize:5})
    const {confirm} = Modal;

    const getParishAttendances  = async page => {
      try{
          const {data} = await requestAxios.get(`/parishes/${userInfo.id}/attendances?page=${page}&limit=${pagination.pageSize}`);
          setAttendances(data.body);
          setTotal(data.total);
      }catch(err){
          console.error(err.message);
      }
  }
    
    useEffect(() => {
        const source = axios.CancelToken.source();
       
        getParishAttendances(1);

        return(()=>{
            source.cancel();
        })

    },[])

    
  const handlePageChange = page => {
    console.log("PAGE NUMBER",page);
    getParishAttendances(page);
  };

    function showDeleteConfirm(attendance) {
      confirm({
        title: `Are you sure, you want to delete ${attendance.name || "this record"}?`,
        icon: <ExclamationCircleOutlined />,
        content: 'This operation is not reversible.',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        async onOk() {
          await requestAxios.delete(`/attendances/${attendance.id}`);
          window.location = `/parish/attendances/lists`;           
        },
        onCancel() {
        },
      });
    }
  
   const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key:'date',
      render: date => (
        <>{moment(date).format(dateFormatList[0])}</>
      )
    },
    {
      title:'Children',
      dataIndex:'youths',
      key:'youths'
    },
    {
    title: 'Men',
    dataIndex: 'men',
    key:'men'
  },
  {
    title: 'Women',
    dataIndex: 'women',
    key:'women'
  }, 
  {
    title: 'Marriages',
    dataIndex: 'marriages',
    key:'marriages'
  },
  {
    title: 'New Comers',
    dataIndex: 'newComers',
    key:'newComers'
  },
  {
    title: 'Souls Saved',
    dataIndex: 'soulsSaved',
    key:'soulsSaved'
  },
  {
    title: 'Souls Baptised',
    dataIndex: 'soulsBaptised',
    key:'soulsBaptised'
  },
  {
    title: 'New Workers',
    dataIndex: 'newWorkers',
    key:'newWorkers'
  },
  {
    title: 'New Births',
    dataIndex: 'birth',
    key:'birth'
  },
  {
    title: 'Deaths',
    dataIndex: 'deaths',
    key:'deaths'
  },
  {
    title:'Actions',
    render: row => (
      <Space size="middle">
             <Link className="btn btn-info" to={`${row.id}/edit`}>Edit</Link>
             <button className="btn btn-danger" onClick={() => showDeleteConfirm(row)}>Delete</button>
     </Space>
    )
  } 
]
console.log(attendances);
if(!attendances.length) return <h1>No Data Yet..</h1>
console.log(attendances.length, total);
 const data = attendances.map(att => {
   return {
    id:att.id, 
    men:att.men, 
    women:att.women, 
    marriages:att.marriages, 
    newComers:att.newComers, 
    soulsSaved:att.soulsSaved, 
    soulsBaptised:att.soulsBaptised, 
    newWorkers:att.newWorkers,
    deaths:att.deaths,
    birth:att.birth,
    youths:att.children 
  }
 })
    return (
        <section>            
            <div>
                <R3Card>
                  <Table rowKey={record => record._id} title={() => <h2 className="AttendanceList-title">Attendance Lists</h2>}  columns={columns} dataSource={data} pagination={{total, onChange:handlePageChange, ...pagination}} />
                </R3Card>
            </div>
        </section>
       
    )
}

export default AttendanceList;