import React, { useEffect, useState } from 'react';
import R3Card from '../../../../components/Card';
import axios from 'axios';
import { useAlert } from 'react-alert';
import { useHistory, useParams } from 'react-router-dom';
import requestAxios from '../../../../util/requestAxios';
import moment from 'moment';
import { dateFormatList } from '../../../../helpers/dateHelper';
import Loading from '../../../../components/Loading';
import './MonetaryDetail.css';

const MonetaryDetail  = () =>{
    const [monetary, setMonetary] = useState({});
    const alert = useAlert();
    const {id} = useParams();
    const history = useHistory();

    useEffect(() => {
        const source = axios.CancelToken.source();

        const getMonetaryDetail = async () => {
            try{
                const {data} = await requestAxios.get(`/monetaries/${id}`, {cancelToken:source.token});
                setMonetary(data.body);

            }catch(err){
                if(err.response && err.response.data){
                    alert.error(err.response.data.message);
                  }else{
                  alert.error("An unexpected error occured.");
                  }
            }
        }

        getMonetaryDetail();

        return (() =>{
            source.cancel();
        })
    }, []);
    console.log(monetary);
    if(!monetary.tithe) return <Loading />
    const totalExpectedWithArrears = monetary.expectedRemittance - monetary.openingBalance;
    return(
            <R3Card>
               <div className="MonetaryDetail">
                    <h1 className="MonetaryDetail-date">Transaction Date: {moment(monetary.createdAt).format(dateFormatList[0])}</h1>
                    <h3 className="MonetaryDetail-tithe">Tithe: €{monetary.tithe?.toFixed(2)}</h3>
                    <h3>Offering: €{monetary.offering?.toFixed(2)}</h3>
                    <h3>Expected Amount: €{monetary.expectedRemittance?.toFixed(2)}</h3>
                    <h3>Opening Balance: €{monetary.openingBalance?.toFixed(2)}</h3>
                    <h3>Total Amount Expected With Arrears: €{totalExpectedWithArrears.toFixed(2)}</h3>
                    <h3>Amount Remitted: {monetary.amountRemitted ? `€${monetary.amountRemitted?.toFixed(2)}` : 'Not Available'}</h3>
                    <h3>Closing Balance: {monetary.closingBalance ? `€${monetary.closingBalance?.toFixed(2)}` : 'Not Available'}</h3>
                    <br/>
                    <div>
                        <button className="btn btn-info btn-lg" onClick={() => history.goBack() }>Go Back</button>
                    </div>
               </div>
            </R3Card>
    )
}

export default MonetaryDetail;