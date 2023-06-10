import { useState} from 'react'
import { Button, Col, Row, Statistic, Typography, DatePicker, Space, Input } from 'antd';

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

export const BonusCard = (item) => {

    const idx = item.index;
    const [amount, setAmount] = useState(item.amount)
    const [bonus, setBonus] = useState(item.bonus)
    const [id, setId] = useState(item.id)
    const remove = async (idx) => {
        item.remove(idx)
        if (item.id != undefined) {
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({id: id})
            };
            await fetch("https://dijo.space:4000/api/bonus", requestOptions);
        }
    }

    const save = async () => {
        console.log(amount, bonus, id);
        const data = {
            amount: amount,
            bonus: bonus,
            id: id
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        await fetch("https://dijo.space:4000/api/bonus", requestOptions);
    }

    return (
        <>
        <Title level={5} ></Title>
        <Input addonBefore="Сумма платежа в $" onChange={(e) =>setAmount(+e.target.value)} placeholder="amount" defaultValue={item.amount} />
        <br/><br/>
        <Input addonBefore="Начисляемый бонус" onChange={(e) =>setBonus(+e.target.value)} placeholder="bonus" defaultValue={item.bonus} />
        <br/><br/>
        <Space align="baseline">
            <Button type="dashed" onClick={save}>Сохранить</Button>
            <Button danger onClick={remove}>Удалить пункт</Button>
        </Space>
        </>
    )

}

export const SpecializationCard = (item) => {

    const idx = item.index;
    const [name, setName] = useState(item.name)
    const [id, setId] = useState(item.id)

    const remove = async (idx) => {
        item.remove(idx)
        if (item.id != undefined) {
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({id: id})
            };
            await fetch("https://dijo.space:4000/api/specialization", requestOptions);
        }
    }

    const save = async () => {
        const data = {
            name: name,
            id: id
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        await fetch("https://dijo.space:4000/api/specialization", requestOptions);
    }

    return (
        <>
        <Title level={5} ></Title>
        <Input addonBefore="Название специализации" onChange={(e) =>setName(e.target.value)} placeholder="amount" defaultValue={item.name} />
        <br/><br/>
        <Space align="baseline">
            <Button type="dashed" onClick={save}>Сохранить</Button>
            <Button danger onClick={remove}>Удалить пункт</Button>
        </Space>
        </>
    )

}