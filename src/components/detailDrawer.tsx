import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, List, Input, Row, Select, Space, Divider, Popconfirm } from 'antd';

import OperatorData from './operatorData';
import ClientData from './clientData';

const { Option } = Select;

const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
);

type Props = {
    onClose: void, 
    open: Boolean,
    setEditingOperator: void,
    saveData: void,
    editingOperator: {}
}

const DetailDrawer = ({
    onClose,
    open,
    editingOperator,
    setEditingOperator,
    saveData
}: Props ) => {
    
    if (!editingOperator){
      return;
    }
    const singleUser = editingOperator.user;
    
    const dataFetch = async () => {
      singleUser.isBanned = !singleUser.isBanned;
      let b = 0;
      if (singleUser.isBanned) b = 1;
      if (!singleUser.isBanned) b = 0;
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: singleUser.id, isBanned: b, banCause: "Заблокирован главным администратором" })
      };
      await fetch("https://dijo.space:4000/api/user/ban/", requestOptions);
      
      setEditingOperator((pre) => {
        console.log(pre);
        return {...pre, user: singleUser}
      });
    };

    return(
        <Drawer title="Данные пользователя" width={640} placement="right" closable={false} onClose={onClose} open={open}>
        <p className="site-description-item-profile-p">Общие</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Логин" content= { singleUser.login } />
            <DescriptionItem title="ФИО" content= { singleUser.nickname } />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Пароль" content= { singleUser.password } />
            <Button type="dashed" onClick={dataFetch}>{singleUser.isBanned ? 'Разблокировать' : 'Забанить'} </Button>
          </Col>
          <Col span={24}>
            {singleUser.isBanned ? 
            <DescriptionItem title="Причина бана"content= "Заблокирован главным администратором"/> 
            : 
            null }
          </Col>
        </Row>
        
        <Row>
         
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">Специфичные данные</p>
        {
          singleUser.role === 'OPERATOR'?
          <OperatorData editingOperator={editingOperator} setEditingOperator={setEditingOperator} saveData={saveData}/>
          :
          <ClientData singleData={editingOperator} />
        }
         
        <Divider />
      </Drawer>
    )
}


export default DetailDrawer;