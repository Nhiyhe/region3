import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import R3Card from '../../../../components/Card';
import requestAxios from '../../../../util/requestAxios';
import axios from 'axios';
import { useAlert } from 'react-alert';
import moment from 'moment';
import { dateFormatList } from '../../../../helpers/dateHelper';
import './OutrechDetailReport.css';

const OutrechDetailReport = () => {
    const {id} = useParams();
    const history = useHistory();
    const [outreach, setOutreach] = useState({});
    const alert = useAlert();

    useEffect(() => {
        const source = axios.CancelToken.source();
        const getOutreach = async () => {

            try{
                const {data} = await requestAxios.get(`/outreaches/${id}`,{cancelToken:source.token});
                console.log(data.body);
                setOutreach(data.body);

            }catch(err){
                if(err.response && err.response.data){
                    alert.error(err.response.data.message);
                  }else{
                  alert.error("An unexpected error occured.");
                  }
            }
        }

        getOutreach();

        return (() =>{
            source.cancel();
        })
    },[]);

    console.log(outreach);
    return(
        <div>
            <div className="col-8 offset-2">
                <R3Card>
                    <div className="form-group">
                        <label className="form-label">Date</label>
                        <p>{moment(outreach.createdAt).format(dateFormatList[0])}</p>
                    </div>

                    <div className="form-group">
                        <label className="form-label">New Nation</label>
                        <p>{outreach.newNation}</p>
                    </div>

                    <div className="form-group">
                        <label className="form-label">New Parish</label>
                        <p>{outreach.newParish}</p>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Church Dedication</label>
                        <p>{outreach.churchDedication}</p>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Notes</label>
                        <p>{outreach.notes}</p>
                    </div>
                    {outreach.images ? <><div>
                        {outreach?.images.map(img => {
                            return <img key={img._id} src={`${img.url}`} alt="Oureach Image" className="OutrechDetailReport-img" />
                        })}
                    </div> </> : <p>No Images Provided</p>}

                    <div className="form-group mt-5">
                        <button className="btn btn-info btn-lg" onClick={() => history.goBack()}>Go Back</button>
                    </div>
                </R3Card>
            </div>
        </div>
    )
}

export default OutrechDetailReport;