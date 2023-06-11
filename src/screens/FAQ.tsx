import React, {useState, useEffect } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Button, Col, Row, Statistic, Typography, DatePicker, Space } from 'antd';

import { FAQCard } from '../components/card'

const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;

const FAQ: React.FC = () => {

  const [isLoading, setLoading] = useState(false);
  const [FAQData, setFAQData] = useState();

  useEffect(() => {
    fetch("https://dijo.space:4000/api/faq")
      .then((res) => res.json())
      .then((data) => setFAQData(data));
  }, []);

  const addItem = () => {
    let newArr = FAQData;
    FAQData.push({amount: 0, bonus: 0})
    setFAQData([...FAQData])
    console.log(FAQData)
  }

  const removeItem = (index: number) => {
    FAQData.splice(index, 1)
    setFAQData([...FAQData])
  }

  return <>

    <Space align="baseline">
        <Title>FAQ</Title>
        <Button style={{marginLeft: 30}} onClick={addItem} type="primary">Добавить пункт</Button>
    </Space>
    {
        FAQData?.map((datum, index) => {
            return <FAQCard remove={removeItem} id={datum.id} index={index} title={datum.title} detail={datum.detail} />
        })
    }
   
    
  </>
};

export default FAQ;