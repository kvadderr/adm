import React, {useState, useEffect } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Button, Col, Row, Statistic, Typography, DatePicker, Space } from 'antd';

import { FAQCard } from '../components/card'

const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;

const FAQ: React.FC = () => {

  const [isLoading, setLoading] = useState(false);
  const [editableStr, setEditableStr] = useState('This is an editable text.');
  const [FAQData, setFAQData] = useState();

  useEffect(() => {
    fetch("http://65.109.234.249:4000/faq")
      .then((res) => res.json())
      .then((data) => setFAQData(data));
  }, []);

  const updateFieldChanged = () => {
  }

  return <>

    <Space align="baseline">
        <Title>FAQ</Title>
        <Button style={{marginLeft: 30}} type="primary">Добавить пункт</Button>
    </Space>
    {
        FAQData?.map((datum, index) => {
            return <FAQCard title={datum.title} detail={datum.detail} />
        })
    }
   
    
  </>
};

export default FAQ;