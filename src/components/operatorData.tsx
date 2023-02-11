import React, { useState } from 'react';
import { Col, Row, Space, Divider, InputNumber, Button, Typography } from 'antd';
const { Paragraph, Text } = Typography;

const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
        <Space>
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
        </Space>
    </div>
);

type Props = {
    setEditingOperator: void,
    editingOperator: {},
    saveData: void
}

const OperatorData = ({
    editingOperator,
    setEditingOperator,
    saveData
}: Props )  => {
    
    console.log(editingOperator);
    const [populateBalance, setPopulateBalance] = useState(0);

    const onChangePercent = (value: number) => {
        setEditingOperator((pre) => {
            console.log(pre);
            return {...pre, percent: value}
        });
    };

    const onChangePrice = (value: number) => {
        setEditingOperator((pre) => {
            console.log(pre);
            return {...pre, price: value}
        });
    };

    const dataFetch = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({editingOperator})
        };
        await fetch("http://82.202.194.12:4000/operator", requestOptions);
        saveData()
    };

    

    return (
        <>
        <Row>
          
          <Col span={12}>
            <DescriptionItem title="Процент" content={<InputNumber min={1} max={100} value={editingOperator?.percent} onChange={onChangePercent}/>} /> 
            <DescriptionItem title="Стоимость 1 минуты" content={ <InputNumber min={1} max={100} value={editingOperator?.price} onChange={onChangePrice} /> } />
            <Button type="dashed" onClick={dataFetch}>Сохранить</Button>
          </Col>
         
          <Col span={12}>
            <DescriptionItem title="Текущий баланс"  content={editingOperator?.user?.balance + '$'}/>
          </Col>
          <Col span={24}>
            <DescriptionItem title="Специалист о себе: " />
            <Paragraph>
                {editingOperator?.brief}
            </Paragraph>
          </Col>
        </Row>
        </>
    )

} 

export default OperatorData;