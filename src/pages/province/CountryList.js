import { Table } from 'formik-antd';
import React, {useEffect, useState} from 'react';
import requestAxios from '../../util/requestAxios';

const CountryList = () => {

    const [countries, setCountries] = useState([]);

    useEffect( ()=> {

        const getCountries = async() => {
            try{
                const {data} = await requestAxios.get('/countries');
                 setCountries(data.body);
            }catch(err){
                console.error(err.message);
            }
        }

        getCountries();
    },[])

    const columns = [
        {
          title: 'Country Name',
          dataIndex: 'countryName',
          key: 'countryName',
        },
        {
          title: 'Country Capital',
          dataIndex: 'countryCapital',
          key: 'countryCapital',
        },
      ];
    return (
        <ul>
            {/* {countries.map(c => {
                return <li key={c.id}>{c.countryName} {c.countryCapital}</li>
            })} */}

            <Table dataSource={countries} columns={columns} />
        </ul>
    )
}


export default CountryList;