import React, { useState, useRef, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Table, Input, DatePicker, Space,Typography, notification, Button, Tag, Avatar } from 'antd'
import { AntDesignOutlined } from '@ant-design/icons';
import { format } from 'date-fns'
import DetailDrawer from '../components/detailDrawer'
import CallDrawerClient from '../components/callDrawerClient'


const { Title } = Typography;
const { RangePicker } = DatePicker;

const OperatorAnal = () => {

  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [startDay, setStartDay] = useState();
  const [endDay, setEndDay] = useState();

  useEffect(() => {
    setLoading(true);    
  }, []); 

  const dataFetch = async () => {
    setLoading(true);
    const data = await(
      await fetch("https://dijo.space:4000/api/analytics/operator/"+startDay+"/"+endDay)
    ).json();
    setDataSource(data)
    setLoading(false);
  };

  const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
    if (dates) {
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
      setStartDay(dateStrings[0]);
      setEndDay(dateStrings[1]);
    } else {
      console.log('Clear');
    }
  };

  const data = [];
  for (let i = 0; i < dataSource.length; i++ ){
    data.push({
      key: i,
      login: dataSource[i].login,
      nickname: dataSource[i].nickname,
      balance: dataSource[i].balance + ' $',
      createdAt: dataSource[i].createdAt,
      max: dataSource[i].max,
      talkcount: dataSource[i].callcount,
      total: dataSource[i].profitcompany,
      fav: dataSource[i].favcount,
    })
  }

  const columns = [
    {
      title: 'nickname',
      dataIndex: 'nickname',
      key: 'nickname',
      fixed: 'left',
    },
    {
      title: 'Логин',
      dataIndex: 'login',
      key: 'login',
      width: '20%',
    },
    {
      title: 'Был в онлайне',
      dataIndex: 'max',
      key: 'max',
    },
    {
      title: 'Баланс',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: 'Звонков',
      dataIndex: 'talkcount',
      key: 'talkcount',
    },
    {
      title: 'Принес прибыли',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Кол-во избранных',
      dataIndex: 'fav',
      key: 'fav',
    },
  ];

  return (
    <>
      <Title>Аналитика по операторам</Title>
      
      <Title level={5}>{isLoading ? 'Выберите даты' : 'Данные c ' + startDay + ' до ' + endDay}</Title>
      <Space style={{marginTop: 20, marginBottom: 20}} >
        <RangePicker placement="topRight" onChange={onRangeChange}/>
        <Button type="primary" onClick={() => dataFetch()}>
          Применить
        </Button>
      </Space>
      <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
    </>
  )
};

export default OperatorAnal;