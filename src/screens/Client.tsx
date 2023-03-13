import React, { useState, useRef, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Table, Input, Space, notification, Button, Tag, Avatar } from 'antd'
import { AntDesignOutlined } from '@ant-design/icons';

import DetailDrawer from '../components/detailDrawer'
import CallDrawerClient from '../components/callDrawerClient'

const Client = () => {

  const [dataSource, setDataSource] = useState([]);
  const [editingOperator, setEditingOperator] = useState(null);
  const [open, setOpen] = useState(false);
  const [openCall, setOpenCall] = useState(false);
  const [operatorId, setOperatorId] = useState(1);

  useEffect(() => {
    fetch("http://localhost:4000/client")
      .then((res) => res.json())
      .then((data) => setDataSource(data));
  }, []);

  const data = [];
  for (let i = 0; i < dataSource.length; i++ ){
    data.push({
      key: i,
      login: dataSource[i].user.login,
      nickname: dataSource[i].user.nickname,
      balance: dataSource[i].user.balance + ' $',
      bonus: dataSource[i].user.bonus + 'B',
      singleData: dataSource[i],
      avatar: dataSource[i].user.avatar,
      tags: ['ASMR', 'Психолог'],
      operatorId: dataSource[i].userId,
    })
  }

  const columns = [
    {
      title: '',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar) => <Avatar
        size={{ xs: 24 }}
        src={avatar}
      />
    },
    {
      title: 'ФИО',
      dataIndex: 'nickname',
      key: 'nickname',
      width: '20%',
    },
    {
      title: 'Логин',
      dataIndex: 'login',
      key: 'login',
      width: '15%',
    },
    {
      title: 'Баланс',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: 'Бонусов',
      dataIndex: 'bonus',
      key: 'bonus',
    },
    {
      title: 'История звонков',
      dataIndex: 'operatorId',
      key: 'operatorId',
      render: (operatorId) => <a onClick={() => onOpenCall(operatorId)}>Отчет</a>
    },
    {
      title: 'Подробнее',
      dataIndex: 'singleData',
      key: 'singleData',
      render: (record) => <a onClick={() => onEditOperator(record)}>Подробнее</a>
    },
  ];

  const onOpenCall = (data) => {
    setOperatorId(data);
    console.log('operatorId', data)
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
      <Table columns={columns} dataSource={data} />
      <DetailDrawer open={open} onClose={resetEditing} editingOperator={editingOperator} setEditingOperator={setEditingOperator} saveData={saveData}/>
      <CallDrawerClient open={openCall} onClose={onCloseCall} operatorId={operatorId} urls={'client'}/>
    </>
  )
};

export default Client;