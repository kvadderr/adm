import React, { useState, useRef, useEffect } from 'react';
import { Table, Input, Space, notification, Button, Tag, Badge, Avatar } from 'antd';


import DetailDrawer from '../components/detailDrawer'
import CallDrawer from '../components/callDrawer'

const Operator = () => {

  const [dataSource, setDataSource] = useState([]);
  const [editingOperator, setEditingOperator] = useState(null);
  const [open, setOpen] = useState(false);
  const [openCall, setOpenCall] = useState(false);
  const [operatorId, setOperatorId] = useState(1);

  useEffect(() => {
    fetch("https://kuku12875.ru:4000/operator")
      .then((res) => res.json())
      .then((data) => setDataSource(data));
  }, []);

  const data = [];
  for (let i = 0; i < dataSource.length; i++ ){
    data.push({
      key: i,
      login: dataSource[i].user.login,
      fio: dataSource[i].user.isBanned ? <Badge status="error" text={dataSource[i].user.FIO} /> : dataSource[i].user.FIO,
      balance: dataSource[i].user.balance + ' $',
      singleData: dataSource[i],
      tags: ['ASMR', 'Психолог'],
      avatar: dataSource[i].user.avatar,
      operatorId: dataSource[i].id,
    })
  }

  const operatorColumns = [
    {title: '', dataIndex: 'avatar', key: 'avatar',
        render: (avatar) => <Avatar
            size={{ xs: 24 }}
            src={avatar}
      />
    },
    {title: 'ФИО', dataIndex: 'fio', key: 'fio', width: '20%'},
    {title: 'Логин', dataIndex: 'login', key: 'login', width: '15%'},
    {title: 'Баланс', dataIndex: 'balance', key: 'balance'},
    {title: 'История звонков', dataIndex: 'operatorId', key: 'operatorId', 
        render: (operatorId) => <a onClick={() => onOpenCall(operatorId)}>Отчет</a>},
    {title: 'Подробнее', dataIndex: 'singleData', key: 'singleData', 
        render: (record) => <a onClick={() => onEditOperator(record)}>Подробнее</a>},
    {title: 'Отзывы', dataIndex: 'detail', key: 'detail', 
        render: () => <a>Отзывы</a>},
  ]; 

  const onOpenCall = (data) => {
    setOperatorId(data);
    setOpenCall(true)
  }

  const onCloseCall = () => {
    setOpenCall(false);
  }

  const onEditOperator = (record) => {
    setEditingOperator(null);
    setOpen(true);
    setEditingOperator({...record});
  };

  const resetEditing = () => {
    setOpen(false);
    console.log('editingOperator', editingOperator);
    setEditingOperator(null);
  };

  const saveData = () => {
    setDataSource((pre) => {
      return pre.map((theOperator) => {
        if (theOperator.id === editingOperator.id) {
          return editingOperator;
        } else {
          return theOperator;
        }
      });
    });
  }

 
  return (
    <>
      <Table columns={operatorColumns} dataSource={data} />
      <DetailDrawer open={open} onClose={resetEditing} editingOperator={editingOperator} setEditingOperator={setEditingOperator} saveData={saveData}/>
      <CallDrawer open={openCall} onClose={onCloseCall} operatorId={operatorId} urls={'operator'}/>
    </>
  )
};

export default Operator;