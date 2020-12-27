import React, {useState, useEffect, useContext} from 'react';
import Card from '../../components/Card';
import { ParishContext } from '../../context/ParishContext';
import requestAxios from '../../util/requestAxios';
import DataTable from 'react-data-table-component';
import './MonetaryList.css';

const MonetaryList = () => {
    const [parishMonetaryRecords, setParishMonetaryRecords] = useState([]);
    const {parishId} = useContext(ParishContext);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(3);

    useEffect(() => {
        const getParishMonetaryRecords  = async() => {
            try{
                const {data} = await requestAxios.get(`/parishes/${parishId}/monetaryrecords?page=${page}&limit=${limit}`);
                setParishMonetaryRecords(data.body);
            }catch(err){
                console.error(err.message);
            }
        }

        getParishMonetaryRecords();
    }, [parishId, page, limit])

    const columns = [
        {
          name: 'Tithe',
          selector: 'tithe',
          sortable: true,
        },
        {
          name: 'Offering',
          selector: 'offering',
          sortable: true,
        },
        {
            name: 'Thanks Giving',
            selector: 'thanksgiving',
            sortable: true,
          },
          {
            name: 'Other Offering',
            selector: 'otherOfferings',
            sortable: true,
          },
          {
            name: 'Income',
            selector: 'income',
            sortable: true,
          }
      ];

    return (
       <section className="MonetaryList">
           <div>
               <Card>
                   <DataTable title="Monetary Lists" columns={columns} data={parishMonetaryRecords} pagination paginationServer/>                  
               </Card>
           </div>
       </section>
    )
}

export default MonetaryList;