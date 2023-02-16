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

    const populate = async () => {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({id: singleData.user.id, balance: populateBalance})
      };
      await fetch("https://kuku12875.ru:4000/user/populate", requestOptions);
      openNotification();
    };
    
    return (
        <Row>
          <Col span={12}>
            <DescriptionItem title="Текущий баланс" content={singleData.user.balance + "$"} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Сумма" content={<InputNumber onChange={setNewBalance}/>} /> 
            <Button type="dashed" onClick={populate}>Пополнить баланс</Button>
          </Col>
        </Row>
    )

} 

export default ClientData;