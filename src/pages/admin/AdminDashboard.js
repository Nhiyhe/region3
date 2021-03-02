import React, { useEffect, useState, useContext } from 'react';
import R3Card from '../../components/Card';
import { FaChurch } from 'react-icons/fa';
import {BiWorld} from 'react-icons/bi';
import { AiFillAppstore } from 'react-icons/ai';
import {AiOutlineMail} from 'react-icons/ai';
import requestAxios from '../../util/requestAxios';
import Tile from '../../components/Tile';
import {AuthContext} from '../../context/AuthContext';
import Loading from '../../components/Loading';
import R3List from '../../components/R3List';
import { List, Space, Table, Tag } from 'antd';
import './AdminDashboard.css';
import { Link } from 'react-router-dom';
import axios from 'axios';


const AdminDashboard = () => {
    const {userInfo} = useContext(AuthContext);
    const [provinces, setProvinces] = useState([]);
    const [zones, setZones] = useState(0);
    const [countries, setCountries] = useState([]);
    const [parishes, setParishes] = useState(0);
    const [pastor, setPastor] = useState({});
    const [welfares, setWelfares] = useState([]);
    const [testimonies, setTestimonies] = useState([]);
    const [top10SoulsWinner, setTop10SoulsWinner] = useState([]);

    const requestToken = axios.CancelToken.source();

    const getProvincePastor = async() => {
        try{
            const {data} = await requestAxios.get(`/pastors/${userInfo.id}`,{cancelToken:requestToken.token});
            setPastor(data.body);
        }catch(err){
            if(axios.isCancel(err)){
                return;
              }else{
                console.error("There was a problem");
              }
        }
    }
    
    const getProvinces = async () => {
        try{
            const {data} = await requestAxios.get('/provinces',{cancelToken:requestToken.token});
            setProvinces(data.body);
        }catch(err){
            if(axios.isCancel(err)){
                return;
              }else{
                console.error("There was a problem");
              }
        }
    }

    const getZones = async () => {
        try{
            const {data} = await requestAxios.get('/zones',{cancelToken:requestToken.token});
            setZones(data.total);
        }catch(err){
            if(axios.isCancel(err)){
                return;
              }else{
                console.error("There was a problem");
              }
        }
    }

    const getCountries = async () => {
        try{
            const {data} = await requestAxios.get('/countries',{cancelToken:requestToken.token});
            setCountries(data.body);
        }catch(err){
            if(axios.isCancel(err)){
                return;
              }else{
                console.error("There was a problem");
              }
        }
    }

    const getTop10SoulsWinner = async () => {
        try{
            const {data} = await requestAxios.get('/attendances/top10SoulsWinner',{cancelToken:requestToken.token});
            setTop10SoulsWinner(data.body);
        }catch(err){
            if(axios.isCancel(err)){
                return;
              }else{
                console.error("There was a problem");
              }
        }
    }

    const getParishes = async () => {
        try{
            const {data} = await requestAxios.get('/parishes',{cancelToken:requestToken.token});
            setParishes(data.total);
        }catch(err){
            if(axios.isCancel(err)){
                return;
              }else{
                console.error("There was a problem");
              }
        }
    }

    const getWelfareCheck = async () => {
        try{
            const {data} = await requestAxios.get('/welfares',{cancelToken:requestToken.token});
            setWelfares(data.body);
        }catch(err){
            if(axios.isCancel(err)){
                return;
              }else{
                console.error("There was a problem");
              }
        }
    }

    const getTestimonies = async () => {
        try{
            const {data} = await requestAxios.get('/testimonies',{cancelToken:requestToken.token});
            setTestimonies(data.body);
        }catch(err){
            if(axios.isCancel(err)){
                return;
              }else{
                console.error("There was a problem");
              }
        }
    }


    useEffect(() => {
        getProvinces();
        getZones();
        getCountries();
        getParishes();
        getWelfareCheck();
        getTop10SoulsWinner();
        getTestimonies();

        return (() => {
            requestToken.cancel();
          })

    }, [])

    useEffect(() => {
        getProvincePastor();
       
        return (() => {
            requestToken.cancel();
          })

    },[userInfo.id]);

    const columns = [
        {
            title: '',
            dataIndex: 'province',
            key: 'province',
            render : (text, record) => (
                <div>
                    <Space size="small">
                        <Tag color="green">NEW</Tag>
                        <Tag color="red">URGENT</Tag>
                        <Link className="btn btn-info" to={`non-financial/reports/${record._id}/read`}>READ</Link>
                    </Space>
                </div>
            )
          },
        {
        title: 'Pastor Name',
        dataIndex: 'pastorName',
        key: 'pastorName',
        render: pName => (
          <>
            {pName}
          </>
      )
      },
      {
        title: 'Parish',
        dataIndex: 'parishName',
        key: 'parishName'
      },
      {
        title: 'Country',
        dataIndex: 'countryName',
        key: 'countryName'
      },
      {
        title: 'Zone',
        dataIndex: 'zoneName',
        key: 'zoneName'
      },
      {
        title: 'Province',
        dataIndex: 'provinceName',
        key: 'provinceName'
      },    
    
    ]

    const testimonyColumns = [
        {
            title: '',
            dataIndex: 'province',
            key: 'province',
            render : (text, record) => (
                <div>
                    <Space size="small">
                        <Tag color="green">NEW</Tag>
                        <Link className="btn btn-info" to={`non-financial/reports/${record._id}/testimony/read`}>READ</Link>
                    </Space>
                </div>
            )
          },
          {
            title: 'Parish',
            dataIndex: 'parishName',
            key: 'parishName'
          },
          {
            title: 'Country',
            dataIndex: 'countryName',
            key: 'countryName'
          },
          {
            title: 'Zone',
            dataIndex: 'zoneName',
            key: 'zoneName'
          },
          {
            title: 'Province',
            dataIndex: 'provinceName',
            key: 'provinceName'
          },    
    ]


    if(!provinces.length) return <Loading />
    return(
        <div className="AdminDashboard">
            <div className="container">
                <h1 className="AdminDashboard-name">Hello, {pastor.firstName} {pastor.lastName}{userInfo.isAdmin ? ' (Administrator)' : ' (Province Pastor)'}.</h1>
                     <R3Card>
                            <div className="row AdminDashboard-container">
                                <Tile name="Provinces" count={ userInfo.isAdmin ? provinces.length : (provinces.filter(prov => prov.pastor?.id === userInfo.id)).length} color="orange"> <BiWorld /> </Tile>
                                <Tile name="Zones" count={ zones} color="#1BC5BD"><AiFillAppstore /> </Tile>
                                <Tile name="Countries" count={ userInfo.isAdmin ? countries?.length : (countries.filter(country => country.pastor?.id === userInfo.id)).length} color="#8950FC"><AiFillAppstore /> </Tile>
                                <Tile name="Parishes" count={ parishes} color="#17a2b8"><FaChurch/> </Tile>
                                <Tile name="Unread Messages" count={(welfares.filter(wel => !wel.read)).length} color="red"> <AiOutlineMail /> </Tile>

                            </div>
                     </R3Card>

                        <div className="row">
                            <div className="col-8">

                            <R3Card>
                                   <Table rowKey={record => record._id} title={() => <h4>NEW WELFARE CHECK MESSAGES</h4>} dataSource={welfares.filter(welfare => !welfare.read)} columns={columns} pagination={false} size="small" />
                            </R3Card>

                            <R3Card>
                                   <Table rowKey={record => record._id} title={() => <h4>NEW TESTIMONY BOARD</h4>} dataSource={testimonies.filter(test => !test.read)} columns={testimonyColumns} pagination={false} size="small" />
                            </R3Card>

                            </div>
                            <div className="col-4">
                                <R3Card>
                                    <R3List title="Provinces" data={provinces} size="small" renderItem={
                                        province => (                                                
                                                    <List.Item>
                                                        <List.Item.Meta title={province?.name} />

                                                        <div><Tag color="processing">{province?.zones?.length} zones</Tag></div>
                                                    </List.Item>
                                          )
                                    } />
                                </R3Card>

                                <R3Card>
                                    <R3List title="Top 5 Countries" data={countries.map(ctry => { return {name : ctry.countryName, parishes:ctry.parishes.length}}).sort(function(a,b){return b.parishes - a.parishes}).slice(0,5)} size="small" renderItem={
                                            country => (                                                
                                                        <List.Item>
                                                            <List.Item.Meta 
                                                            title={country.name} />

                                                            <div><Tag color="processing">{country.parishes} parishes</Tag></div>
                                                        </List.Item>
                                            )
                                        } />
                                </R3Card>

                                <R3Card>
                                    <R3List title="Top 10 Souls Winner" data={top10SoulsWinner.map(data => {return {parishName:data._id, totalSouls:data.totalSouls}})} size="small" renderItem={
                                            result => (                                                
                                                        <List.Item>
                                                            <List.Item.Meta 
                                                            title={result.parishName} 
                                                            />

                                                            <div><Tag color="processing">{result.totalSouls} Souls</Tag></div>
                                                        </List.Item>
                                            )
                                        } />
                                </R3Card>

                            </div>
                        </div>
            </div>
        </div>    
    )
}

export default AdminDashboard;