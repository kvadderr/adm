import React, {useState, useEffect } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Button, Col, Row, Statistic, Typography, DatePicker, Space } from 'antd';

import { SpecializationCard } from '../components/card'

const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;

const Specialization: React.FC = () => {

  const [specialization, setSpecialization] = useState([]);

  useEffect(() => {
    fetch("http://65.109.234.249:4000/specialization")
      .then((res) => res.json())
      .then((data) => setSpecialization(data));
  }, []);

  const addItem = () => {
    specialization.push({name: ''})
    setSpecialization([...specialization])
  }

  const removeItem = (index: number) => {
    specialization.splice(index, 1)
    setSpecialization([...specialization])
  }

  return <>

    <Space align="baseline">
        <Title>Специализация</Title>
        <Button style={{marginLeft: 30}} onClick={addItem} type="primary">Добавить пункт</Button>
    </Space>
    {
        specialization.map((datum, index) => {
            return <SpecializationCard remove={removeItem} id={datum.id} index={index} name={datum.name} />
        })
    }
   
    
  </>
};

export default Specialization;