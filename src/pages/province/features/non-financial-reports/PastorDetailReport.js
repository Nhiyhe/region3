import { Formik,Form } from 'formik';
import React, {useState, useEffect } from 'react';
import {Table, Modal,} from 'antd';
import axios from 'axios';
import requestAxios from '../../../../util/requestAxios';
import R3Card from '../../../../components/Card';
import { useAlert } from 'react-alert';
import moment from 'moment';
import { dateFormatList } from '../../../../helpers/dateHelper';
import Loading from '../../../../components/Loading';
import './PastorDetailReport';
import { DatePicker } from "formik-antd";
import { generatePDF } from '../../../../util/reportGenerator';
const {MonthPicker} = DatePicker;


const PastorDetailReport = () => {

    const alert = useAlert();
    const [parishes, setParishes] = useState([]);
    const { confirm } = Modal;
    const [filteredParishes, setFilteredParishes] = useState(parishes);
    const [pagination, setPagination] = useState({page:1, pageSize:10});


    useEffect(() => {
      const source = axios.CancelToken.source();
      const getParishes = async () => {
        try{
          const { data } = await requestAxios.get(`/parishes?page=${pagination.page}&limit=${pagination.pageSize}`,{cancelToken:source.token});
          setParishes(data.body.map(p => ({id: p._id, parish:p.name, pastorsName: `${p.parishPastor?.firstName} ${p.parishPastor?.middleName ? p.parishPastor?.middleName : ''} ${p.parishPastor?.lastName}`, email:p.parishPastor?.email, pastorDOB:p.parishPastor?.dateOfBirth, spouseName:`${p.parishPastor?.spouseFirstName} ${p.parishPastor?.spouseLastName}`, spouseDOB:p.parishPastor?.spouseDateOfBirth, memorableOccassion:p?.parishPastor?.memorableOccassion, dateOfMemorableOccassion:p.parishPastor?.dateOfMemorableOccassion})));
          setFilteredParishes(data.body.map(p => ({id: p._id, parish:p.name, pastorsName: `${p.parishPastor?.firstName} ${p.parishPastor?.middleName ? p.parishPastor?.middleName : ''} ${p.parishPastor?.lastName}`, email:p.parishPastor?.email, pastorDOB:p.parishPastor?.dateOfBirth, spouseName:`${p.parishPastor?.spouseFirstName} ${p.parishPastor?.spouseLastName}`, spouseDOB:p.parishPastor?.spouseDateOfBirth, memorableOccassion:p.parishPastor.memorableOccassion, dateOfMemorableOccassion:p?.parishPastor?.dateOfMemorableOccassion})));
        }catch(err){
          if(err.response && err.response.data){
            alert.error(err.response.data.message);
          }else{
          console.error(err);
          }
        }
      };
        getParishes();

        return (() => {
          source.cancel();
        })
   
    }, []);
    

    const columns =[
        {
            'title':'Parish Name',
            'dataIndex':'parish',
            'key':'parish',
            // ...getColumnSearchProps('parish')
        },
        {
            'title':'Pastors Name',
            'dataIndex':'pastorsName',
            'key':'pastorsName'
        },
        {
            'title':'Email',
            'dataIndex':'email',
            'key':'email'
        },
        {
          'title':'Pastors DOB',
          'dataIndex':'pastorDOB',
          'key':'pastorDOB',
          render: date => (
            <> {moment(date).format(dateFormatList[0])}</>
          )
      },
        {
          'title':'Spouse Name',
          'dataIndex':'spouseName',
          'key':'spouseName'
      },
      {
        'title':'Spouse DOB',
        'dataIndex':'spouseDOB',
        'key':'spouseDOB',
        render: date => (
          <> {moment(date).format(dateFormatList[0])}</>
        )
        
    },
    {
      'title':'Memorable Occassion',
      'dataIndex':'memorableOccassion',
      'key':'memorableOccassion'
  },
  {
    'title':'Date of MO',
    'dataIndex':'dateOfMemorableOccassion',
    'key':'dateOfMemorableOccassion',
    render: date => (
      <> {moment(date).format(dateFormatList[0])}</>
    )
},
       
    ];

    if(!parishes.length) return <Loading />

    function formatDate(value){
      return value.split('T')[0].split('-').reverse()[1];
    }

    return (
      <Formik
      
       initialValues={{searchTerm: ""}}
       onSubmit = {value => {
         const inputDate = formatDate(value.searchTerm);
         const filteredResults =  parishes.filter(p => {
           return p.dateOfMemorableOccassion?.split('T')[0].split('-').reverse()[1].includes(inputDate) ||
            p.pastorDOB?.split('T')[0].split('-').reverse()[1].includes(inputDate) ||
             p.spouseDOB?.split('T')[0].split('-').reverse()[1].includes(inputDate)  ;
         });
         setFilteredParishes(filteredResults)
       }}
      >
        {() => (
          
                <>
                  <div className="ParishReport">
                      <h1 className="ParishReport-heading">Pastor's Detail Report</h1>
                      <R3Card>
                        <Form>
                          <div className="form-row">
                              <div className="form-group col-3">
                                  <MonthPicker name="searchTerm" className="form-control form-control-lg" placeholder="Select Month" format="MMMM" />
                              </div>
                              <div className="form-group col-5">
                              </div>
                              <div className="form-group col-2">
                                  <input type="button" value="Reset" className="btn btn-info btn-lg btn-block" onClick={() => window.location.reload()} />
                              </div>
                              <div className="form-group col-2">
                                  <input type="submit" value="Search" className="btn btn-primary btn-lg btn-block" />
                              </div>
                          </div>
                        </Form>
                      </R3Card>
                  </div>
                  {parishes && <Table 
                  rowKey ={record => record.id} 
                  columns={columns}
                   dataSource={filteredParishes} 
                   summary = {() => {

                    const footerData = [];                                      
                    const reportData = filteredParishes.map(elt=> [elt.parish, elt.pastorsName, elt.email, `${moment(elt.pastorDOB).format(dateFormatList[0])}`, elt.spouseName, `${moment(elt.spouseDOB).format(dateFormatList[0])}`, elt.memorableOccassion, `${moment(elt.dateOfMemorableOccassion).format(dateFormatList[0])}`]);
                     return(
                       <>
                        <Table.Summary.Row>
                          <Table.Summary.Cell><button className="btn btn-secondary" onClick={() => generatePDF(columns, reportData, "Pastor's Detail Record",footerData, true)}>EXPORT</button></Table.Summary.Cell>
                        </Table.Summary.Row>
                       </>
                     )
                   }}
                   />}

                </>
        )}
      </Formik>
      

    )

}

export default PastorDetailReport;