import { Button, Col, Row, Statistic, Typography, DatePicker, Space } from 'antd';

const { Title, Paragraph } = Typography;


export const FAQCard = (props) => {

    return (
        <>
        <Title level={3} editable={{ onChange: props.onChange }}>{props.title}</Title>
        <Paragraph editable={{ onChange: props.onChange }}>{props.detail}</Paragraph>
        
        <Space align="baseline">
            <Button type="dashed">Сохранить</Button>
            <Button danger>Удалить пункт</Button>
        </Space>
        </>
    )

}