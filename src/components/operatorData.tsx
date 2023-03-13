import React, { useState, useEffect } from 'react';
import { Col, Row, Space, Divider, InputNumber, Button, Typography, Tag, Select } from 'antd';
const { Paragraph, Text } = Typography;
const { CheckableTag } = Tag;


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

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [tagsData, setTagsData] = useState([]);
    const handleChange = (tag: any, checked: boolean, index: number) => {
        console.log()
        let nextSelectedTags = null
        if (checked) {
            nextSelectedTags = [...selectedTags, tag.name]
            editingOperator.specializations.push({name: tag.name, id: tag.id})
        }
        else {
            nextSelectedTags = selectedTags.filter((t) => t !== tag.name);
            //const index = editingOperator.specializations.indexOf({name: tag});
            editingOperator.specializations = editingOperator.specializations.filter((t) => t.name !== tag.name);
            saveData()
            //console.log('dataSSSSSSS', index)
        } 

        console.log('You are interested in: ', nextSelectedTags);
        saveSpecialization()
        setSelectedTags(nextSelectedTags);
    }
    
    useEffect(() => {
        const tagArr = [];
        let arr = [];
        fetch("http://localhost:4000/specialization")
          .then((res) => res.json())
          .then((data) => {
            data.map(element => {
                tagArr.push({name: element.name, id: element.id})
                console.log(tagArr)
                setTagsData(tagArr)
            })
          })
        
        editingOperator.specializations.map(element => {
            arr.push(element.name)
            console.log('arr', arr)
            
        })
        setSelectedTags(arr)

          
    }, []);

    console.log(editingOperator);
    const [populateBalance, setPopulateBalance] = useState(0);

    const handleChangeStatus = async (value: string) => {
        console.log(`selected ${value}`);
        editingOperator.status = value
        saveData()
        const data = {
            userId: editingOperator.userId,
            status: value
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        await fetch("http://localhost:4000/operator/updateStatus", requestOptions);

      };

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
        const operator = editingOperator
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({operator})
        };
        await fetch("http://localhost:4000/operator", requestOptions);
        saveData()
    };

    const saveSpecialization = async () => {
        const data = [];
        editingOperator.specializations.map( element => {
            data.push({id: element.id})
        })
        const operator = {
            id: editingOperator.id,
            specializations: data
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({operator})
        };
        await fetch("http://localhost:4000/operator", requestOptions);
        saveData()
    }

    

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
          <Col span={24}>
            <DescriptionItem title="Специализация: " />
            <Space size={[0, 8]} wrap>
                {tagsData.map((tag, index) => (
                <CheckableTag
                    key={tag.id}
                    checked={selectedTags.includes(tag.name)}
                    onChange={(checked) => handleChange(tag, checked, index)}
                >
                    {tag.name}
                </CheckableTag>
                ))}
            </Space>
          </Col>
          <Col span={24}>
            <DescriptionItem title="Status: " />
            <Space size={[0, 8]} wrap>
                <Select
                    defaultValue={editingOperator.status}
                    style={{ width: 120 }}
                    onChange={handleChangeStatus}
                    loading
                    options={[{ value: 'Online', label: 'Online'}, { value: 'Busy', label: 'Busy'}, { value: 'Offline', label: 'Offline'} ]}
                />
            </Space>
          </Col>
        </Row>
        </>
    )

} 

export default OperatorData;