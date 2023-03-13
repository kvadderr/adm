import React, {useState, useEffect } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Button, Col, Row, Statistic, Typography, DatePicker, Space } from 'antd';

import { BonusCard } from '../components/card'

const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;

const Bonus: React.FC = () => {

  const [bonus, setBonus] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/bonus")
      .then((res) => res.json())
      .then((data) => setBonus(data));
  }, []);

  const addItem = () => {
    let newArr = bonus;
    bonus.push({amount: 0, bonus: 0})
    setBonus([...bonus])
    console.log(bonus)
  }

  const removeItem = (index: number) => {
    bonus.splice(index, 1)
    setBonus([...bonus])
  }

  return <>

    <Space align="baseline">
        <Title>Система бонусов</Title>
        <Button style={{marginLeft: 30}} onClick={addItem} type="primary">Добавить пункт</Button>
    </Space>
    {
        bonus.map((datum, index) => {
            return <BonusCard remove={removeItem} id={datum.id} index={index} amount={datum.amount} bonus={datum.bonus} />
        })
    }
   
    
  </>
};

export default Bonus;