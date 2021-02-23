import { Formik, Field, Form } from 'formik';
import React, { useContext, useState, useEffect } from 'react';
import {Table, Space, Modal,Button, Input, Tag} from 'antd';
import {AuthContext} from '../../../../context/AuthContext';
import axios from 'axios';
import requestAxios from '../../../../util/requestAxios';
import R3Card from '../../../../components/Card';
import { useAlert } from 'react-alert';
import moment from 'moment';
import { dateFormatList } from '../../../../helpers/dateHelper';
import Loading from '../../../../components/Loading';
import {Link, useHistory} from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './PastorDetailReport';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const PastorDetailReport = () => {

    const alert = useAlert();
    const history = useHistory();
    const {userInfo, isAdmin} = useContext(AuthContext);
    const [provinces, setProvinces] = useState([]);
    const [zones, setZones] = useState([]);
    const [countries, setCountries] = useState([]);
    const [parishes, setParishes] = useState([]);
    const [parish, setParish] = useState([]);
    const [provinceId, setProvinceId] = useState("5fc5d6236c07300004aea00c");
    const [parishId, setParishId] = useState("5fc5d6236c07300004aea00c");
    const [zoneId, setZoneId] = useState("5fc5d6236c07300004aea00c");
    const [countryId, setCountryId] = useState("5fc5d6236c07300004aea00c");
    const [disableZoneDropdownList, setDisableZoneDropdownList] = useState(true);
    const [disableCountryDropdownList, setDisableCountryDropdownList] = useState(true);
    const [pagination, setPagination] = useState({page:1, limit:10});
    const { confirm } = Modal;
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");

    useEffect(() => {
      const source = axios.CancelToken.source();
      const getParishes = async () => {
        try{
          const { data } = await requestAxios.get("/parishes",{cancelToken:source.token});
          setParishes(data.body);
        }catch(err){
          if(err.response && err.response.data){
            alert.error(err.response.data.message);
          }else{
          alert.error("An unexpected error occured.");
          }
        }
      };
        getParishes();

        return (() => {
          source.cancel();
        })
   
    }, []);

    const getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
                // this.setState({
                //   searchText: selectedKeys[0],
                //   searchedColumn: dataIndex,
                // });
              }}
            >
              Filter
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : '',
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => this.searchInput.select(), 100);
        }
      },
      render: text =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
      // this.setState({
      //   searchText: selectedKeys[0],
      //   searchedColumn: dataIndex,
      // });
    };
  
    const handleReset = clearFilters => {
      clearFilters();
      setSearchText('');
      // this.setState({ searchText: '' });
    };


    const columns =[
        {
            'title':'Parish Name',
            'dataIndex':'parish',
            'key':'parish',
            ...getColumnSearchProps('parish')
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

    return (
        <Formik
        initialValues={{startDate: new Date().toISOString(),endDate: new Date().toISOString()}}
        onSubmit={ async (values) => {
          try{
            const {data} = await requestAxios.get(`/parishes/${parishId}/outreaches`);
            // setOutreaches(data.body);
        }catch(err){
        }
        }}
        
        >
            {() => (
                <div className="ParishReport">
                  <h1 className="ParishReport-heading">Pastor Detail Report</h1>
{/* 
                 <div className="col-6 offset-3">
                 <R3Card>                
                    <Form>
                   <div className="container">
                         <div className="">
                         <div className="form-group">
                             <label className="form-label" htmlFor="province">Province</label>
                             <Field as="select" name="province" className="form-control form-control-lg" id="province" onChange={(e) => {
                               if(e.target.value)
                                 setProvinceId(e.target.value);
                                 // getProvincePastor(e.target.value);
                                 setZones([]);
                                 setDisableZoneDropdownList(false);
                                 setCountries([]);
                                 setDisableCountryDropdownList(true);
                             }}>
                               <option value="">Select Province</option>
                               {isAdmin() && provinces.map((province) => {
                               return <option key={province.id} value={province.id}>{province.name}</option>;
                               })}
                               { !isAdmin() && provinces.filter((prov => prov.pastor.id === userInfo.id)).map((province) => {
                               return <option key={province.id} value={province.id}>{province.name}</option>;
                               })}
                             </Field>
                         </div>
         
                         <div className="form-group">
                           <label>Zone</label>
                           <Field as="select" name="zone" className="form-control form-control-lg" onChange={(e) => {
                             if (e.target.value)
                               setZoneId(e.target.value);
                               setDisableCountryDropdownList(false);
                           }} disabled={disableZoneDropdownList}>
                             <option value="">Select Zone</option>
                             {zones.map((zone) => {
                                 return <option key={zone.id} value={zone.id}>{zone.name}</option>
                             })}
                           </Field>
                         </div>
         
                       <div className="form-group">
                         <label>Country</label>
                         <Field as="select" name="country" className="form-control form-control-lg" onChange={(e) => {
                             if(e.target.value){
                                 setCountryId(e.target.value);
                             }
                         }} disabled = {disableCountryDropdownList}>
                           <option value="">Select Country</option>
                           {countries.map((country) => {
                               return <option key={country.id} value={country.id}>{country.countryName}</option>
                           })}
                         </Field>
                       </div> 
 
                        <input type="submit" value="Search" className="btn btn-primary btn-block btn-lg mt-5" />
                     </div>
                   </div>
                   </Form>
                 </R3Card>
               </div>
                */}
                
                {parishes && <Table rowKey ={record => record.id} columns={columns} dataSource={parishes.map(p => ({id: p._id, parish:p.name, pastorsName: `${p.parishPastor?.firstName} ${p.parishPastor?.middleName ? p.parishPastor?.middleName : ''} ${p.parishPastor?.lastName}`, email:p.parishPastor?.email, pastorDOB:p.parishPastor?.dateOfBirth, spouseName:`${p.parishPastor?.spouseFirstName} ${p.parishPastor?.spouseLastName}`, spouseDOB:p.parishPastor?.spouseDateOfBirth, memorableOccassion:p.parishPastor.memorableOccassion, dateOfMemorableOccassion:p.parishPastor?.dateOfMemorableOccassion}))} />}
                </div>
            )}
        </Formik>
    )
}

export default PastorDetailReport;