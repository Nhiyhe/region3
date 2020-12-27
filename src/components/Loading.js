import Reat from 'react';
import './Loading.css';
import {Spin} from 'antd';

const Loading = () => {
    return (
        <div className="Loading">
            <Spin size="large" />
        </div>
    )
}

export default Loading;