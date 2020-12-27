import React,{useState, useEffect, useContext} from 'react';
import { ParishContext } from '../../context/ParishContext';
import requestAxios from '../../util/requestAxios';

const AttendanceList = () => {

    const [attendances, setAttendances] = useState([]);
    const {parishId} = useContext(ParishContext);

    
    useEffect(() => {
        const getParishAttendances  = async() => {
            try{
                const {data} = await requestAxios.get(`/parishes/${parishId}/attendances`);
                setAttendances(data.body);
                console.log(data);
            }catch(err){
                console.error(err.message);
            }
        }

        getParishAttendances();

    },[parishId])


    return (
        <section>            
            <div>
                <h2>Attendances</h2>
                <ul>
                   {attendances?.map((attendance) => {
                       return <li key={attendance.id}>{attendance.men}</li>
                   })}
                </ul>
            </div>


        </section>
    )
}

export default AttendanceList;