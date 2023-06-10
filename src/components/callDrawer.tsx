import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, DatePicker, Drawer, Form, List, Input, Row, Select, Space, Divider, Popconfirm } from 'antd';
import OperatorData from './OperatorData';
import ClientData from './ClientData';
const { Option } = Select;

type Props = {
    onClose: void, 
    open: Boolean,
    operatorId: number,
    urls: string 
}

const ReviewDrawer = ({
    onClose,
    open,
    operatorId,
    urls
}: Props ) => {
    
    const [callHistory, setCallHistory] = useState([]);
    console.log('operatorId', operatorId)
    useEffect(() => {
        fetch("https://dijo.space:4000/api/call/"+urls+"/"+operatorId)
          .then((res) => res.json())
          .then((data) => setCallHistory(data));
      }, [open]);

      console.log('callHistory', callHistory)
    return(

        <Drawer width={640} placement="right" closable={false} onClose={onClose} open={open}>
        <p
          className="site-description-item-profile-p"
          style={{
            marginBottom: 24,
          }}
        >
          Звонки оператора
        </p>
          
        <List
            itemLayout="horizontal"
            dataSource={callHistory}
            renderItem={(item) => (
            <List.Item>
                <List.Item.Meta
                avatar={<Avatar src={item.client.avatar} />}
                title={<a href="https://ant.design">{item.client.nickname}</a>}
                description= { 'Продолжительность разговора: ' + item.duration + ' секунд'}
                />
            </List.Item>
            )}
        />
        
      </Drawer>
    )
}


export default ReviewDrawer;