import React, { useState, useRef, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Table, Input, Space, notification, Button, Tag, Badge, Avatar } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';

const Support = () => {
  
  const [operatorData, setOperatorData] = useState([]);
  const [singleOperatorData, setSingleOperatorData] = useState({}); 

  useEffect(() => {
    fetch("http://95.213.216.132:4000/support")
      .then((res) => res.json())
      .then((data) => setOperatorData(data));
  }, []);

  const data = [];
  for (let i = 0; i < operatorData.length; i++ ){
    data.push({
      key: i,
      nickname: operatorData[i].user.nickname,
      message: operatorData[i].message,
      avatar: operatorData[i].user.avatar
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
      title: 'Сообщение',
      dataIndex: 'message',
      key: 'message',
      width: '45%',
    },
    {
      title: 'Подробности',
      dataIndex: 'detail',
      key: 'detail',
      render: () => <a>Подробнее</a>
    },
  ];

  const [open, setOpen] = useState(false);

  function clickDetail(params) {
    setSingleOperatorData(params);
    showDrawer();
  } 

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  )
};

export default Support;