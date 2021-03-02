import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import requestAxios from '../../../../util/requestAxios';
import axios from 'axios';
import R3Card from '../../../../components/Card';
import moment from 'moment';
import { Document } from 'react-pdf';
import { dateFormatList } from '../../../../helpers/dateHelper';
import './ParishMonthlyReportDetail.css';

const ParishMonthlyReportDetail = () => {
    const {id} = useParams();
    const history = useHistory();
    const [remmittance, setRemittance] = useState({});

    useEffect(() => {
        const source = axios.CancelToken.source();
      const getMonetaryDetail = async () => {
        try{
            const {data} = await requestAxios.get(`monetaries/${id}`, {cancelToken:source.token});
            setRemittance(data.body);
        }catch(err){

        }
      }

      getMonetaryDetail();

      return (() => {
          source.cancel();
      })
    }, [])

    console.log(remmittance, id);
    const totalExpectedWithArears = remmittance.expectedRemittance - remmittance.openingBalance;
    return (
        <R3Card>
            <div className="ParishMonthlyReportDetail">
                
                <h2>Transaction Date: {moment(remmittance.createdAt).format(dateFormatList[0])}</h2>
                <h3>Opening Balance: {`€${remmittance?.openingBalance?.toFixed(2)}`}</h3>
                <h3>Expected Remittance: {`€${totalExpectedWithArears?.toFixed(2)}`}</h3>
                <h3>Amount Remitted: {`€${remmittance?.amountRemitted?.toFixed(2)}`}</h3>
                <h3>Closing Balance: {`€${remmittance?.closingBalance?.toFixed(2)}`}</h3>
                <h4>Proofs:</h4>
                {remmittance?.attachments?.map(img => {
                    // return <img key={img._id} src={`${img.url}`} alt="Proof of Payment" /> 
                    // return <Document file={`${img.url}`} />
                    // return <a href={`${img.url}`} download >Download Evidence</a>
                    return (
                        <div key={img._id}>
                            <img src={`${img.url}`} alt="Proof of Payment" />
                            <div className="ParishMonthlyReportDetail-download">
                                <a href={`${img.url}`} download>Download </a>
                            </div>
                        </div>
                    )
                })}
                <div>
                   <input type="button" value="Go Back" className="btn btn-info mt-5 btn-lg" onClick={() => history.goBack()} />

                </div>
            </div>
        </R3Card>
    )
}

export default ParishMonthlyReportDetail