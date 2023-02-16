import React, {useState, useEffect} from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Button, Col, Row, Statistic, Typography, DatePicker, Space } from 'antd';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const Analytics: React.FC = () => {

  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [startDay, setStartDay] = useState();
  const [endDay, setEndDay] = useState();

  useEffect(() => {
    setLoading(true);    
  }, []); 

  const dataFetch = async () => {
    setLoading(true);
    const data = await(
      await fetch("https://kuku12875.ru/:4000/analytics/example/"+startDay+"/"+endDay)
    ).json();
    setData(data)
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

  const convers = Math.floor(data?.convers1 * 100 / data?.convers2);
  const retent = data?.retentTwo * 100 / data?.retentOne;
  const traffic = data?.traff;
  const payUser = traffic * convers;
  const avgCheck = Math.floor(data?.avgCheck);
  const LTV = avgCheck * retent;
  const GMV = LTV * payUser;
  const talkTime = data?.talkTime; 
  const avgTalkTime = data?.avgTalkTime; 
  const profit = data?.profit; 


    
  return <>
  <Title>Аналитика</Title>
  <Title level={5}>{isLoading ? 'Выберите даты' : 'Данные c ' + startDay + ' до ' + endDay}</Title>
  <Row gutter={[16, 36]} style={{ marginTop: 16 }}>

    <Col span={8}>
      <Statistic title="Conversion rate" value={convers + '%'}loading={isLoading}/>
      <Statistic title="Traffic" value={traffic} loading={isLoading}/>
      <Statistic title="Retention" value={retent + '%'} loading={isLoading}/>
    </Col>

    <Col span={8}>
      <Statistic title="Paying users" value={payUser +'%'} loading={isLoading}/>
      <Statistic title="Average order value" value={avgCheck +'$'} loading={isLoading}/>
      <Statistic title="Gross merchandise volume" value={GMV} loading={isLoading}/>
    </Col>

    <Col span={8}>
      <Statistic title="Life time value" value={LTV} loading={isLoading}/>
      <Statistic title="Talk time" value={talkTime} loading={isLoading}/>
      <Statistic title="Talk time (Average) " value={avgTalkTime} loading={isLoading}/>
    </Col>
     
    <Col span={8}>
      <Statistic title="Revenue" value={profit + '$'} loading={isLoading}/>
    </Col>
  </Row>

  <Space style={{marginTop: 40}} >
  <RangePicker placement="topRight" onChange={onRangeChange}/>
  <Button type="primary" onClick={() => dataFetch()}>
    Применить
  </Button>
  </Space>
</>
};

export default Analytics;