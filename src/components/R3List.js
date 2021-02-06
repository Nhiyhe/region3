import React from 'react';
import { List } from 'antd';

const R3List = ({ data, renderItem, size, title}) => {
    return(
        <>
            <List
            size={size}
            header={<h2>{title?.toUpperCase()}</h2>}
            bordered
            dataSource={data}
            renderItem={renderItem}
            />
      </>
    )
};

export default R3List;