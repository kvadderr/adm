import React, { useState } from 'react';
import { Col, Row, Space, Divider, InputNumber, Button, notification } from 'antd';

const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
);

const ClientData = (
    {singleData}
) => {

  const [populateBalance, setPopulateBalance] = useState(0);
  const [populateBonus, setPopulateBonus] = useState(0);
  const [payment, setPayment] = useState(0);

  const openNotification = () => {
    notification.open({
      message: 'Balance populate',
      description:
        'Succesfully populate data',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  const setNewBalance = (value: number) => {
    setPopulateBalance(value);
};

  const setNewBonus =(value: number) => {
    setPopulateBonus(value);
};

const setNewPayment = (value: number) => {
  setPayment(value)
}

    const populate = async () => {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({id: singleData.user.id, balance: populateBalance})
      };
      await fetch("http://localhost:4000/user/populate", requestOptions);
      openNotification();
    };

    const populateBonusUser = async () => {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({id: singleData.user.id, bonus: populateBonus})
      };
      await fetch("http://localhost:4000/user/populateBonus", requestOptions);
      openNotification();
    };

    const payUser = async () => {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({id: singleData.user.id, amount: payment})
      };
      await fetch("http://localhost:4000/user/payment", requestOptions);
      openNotification();
    };
    
    return (
        <Row>
          <Col span={12}>
            <DescriptionItem title="Текущий баланс" content={singleData.user.balance + "$"} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Сумма" content={<InputNumber onChange={setNewBalance}/>} /> 
            <Button type="dashed" onClick={populate}>Пополнить основной баланс</Button>
          </Col>
          <Col span={12}>
            <DescriptionItem title="Сумма" content={<InputNumber onChange={setNewBonus}/>} /> 
            <Button type="dashed" onClick={populateBonusUser}>Пополнить бонусами</Button>
          </Col>
          <Col span={12}>
            <DescriptionItem title="Сумма" content={<InputNumber onChange={setNewPayment}/>} /> 
            <Button type="dashed" onClick={payUser}>Симулятор оплаты</Button>
          </Col>
        </Row>
    )

} 

export default ClientData;