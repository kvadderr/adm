import React, { useState, useRef, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Table, Input, InputNumber, Space, notification, Button, Tag, Badge, Avatar, Modal } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';

const Withdrawal = () => {
  
  const [operatorData, setOperatorData] = useState([]);
  const [editingOperator, setEditingOperator] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  
  const onChangeBalance = (value: number) => {
    setBalance(value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetch("http://82.202.194.12:4000/withdrawals/actual")
      .then((res) => res.json())
      .then((data) => setOperatorData(data));
  }, []);

  const data = [];
  for (let i = 0; i < operatorData.length; i++ ){
    data.push({
      key: i,
      fio: operatorData[i].user.FIO,
      login: operatorData[i].user.login,
      avatar: operatorData[i].user.avatar,
      balance: operatorData[i].user.balance,
      singleData: operatorData[i]
    })
  }

  const onEditOperator = (record) => {
    setEditingOperator(null);
    showModal(true);
    setEditingOperator({...record});
    console.log(record);
  };

  const resetEditing = () => {
    setOpen(false);
    setEditingOperator(null);
  };

  const dataFetch = async (status) => {
    console.log(editingOperator);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingOperator.id, status: status, balance: balance })
    };
    await fetch("http://82.202.194.12:4000/withdrawals", requestOptions);
    onDeleteRow();
    handleCancel();
  };

  const onDeleteRow = () => {
    setOperatorData((pre) => {
      return pre.filter((operator) => operator.id !== editingOperator.id);
    });
  };

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
      dataIndex: 'fio',
      key: 'fio',
      width: '20%',
    },
    {
      title: 'Login',
      dataIndex: 'login',
      key: 'login',
    },
    {
      title: 'Подробности',
      dataIndex: 'singleData',
      key: 'singleData',
      render: (record) => <a onClick={() => onEditOperator(record)}>Действия</a>
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} />
      <Modal title={'Перевод средств ' + editingOperator?.user?.login} open={isModalOpen} onCancel={handleCancel}>
        <Space style={{marginTop: 40}} >
          <InputNumber  onChange={onChangeBalance}/>
          <Button type="primary" onClick={() => dataFetch('SUCCESS')}>
            Средства отправлены
          </Button>
          <Button danger onClick={() => dataFetch('FAILED')}>
            Отменить запрос
          </Button>
        </Space>
      </Modal>
    </>
  )
};

export default Withdrawal;