import { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js'
import { Chart } from 'react-chartjs-2'
import { DatePicker, Space, Button } from 'antd';
  
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const Traffic = () => {

    const [operatorTraffic, setOperatorTraffic] = useState([]);
    const [clientTraffic, setClientTraffic] = useState([]);
    const [startDay, setStartDay] = useState('2023-02-02');

    const dataFetch = async () => {

        const data = await(
          await fetch("http://82.202.194.12:4000/analytics/traffic/operator/"+startDay)
        ).json();
        setOperatorTraffic(data)

        const data2 = await(
            await fetch("http://82.202.194.12:4000/analytics/traffic/client/"+startDay)
          ).json();
        setClientTraffic(data2);
        setUserData(userData);
    };

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        setStartDay(dateString);
    };

    var userData = {
        labels: operatorTraffic?.map((data) => data.tim),
        datasets: [
          {
            label: "Операторы",
            data: operatorTraffic?.map((data) => data.alluser),
            backgroundColor: [
              "#f3ba2f",
            ],
            borderColor: "#f3ba2f",
            borderWidth: 2,
          },
          {
            label: "Клиенты",
            data: clientTraffic?.map((data) => data.alluser),
            backgroundColor: [
              "#50AF95",
            ],
            borderColor: "#50AF95",
            borderWidth: 2,
          },
        ],
      }

    return (
        <>
        <Space style={{marginTop: 20, marginBottom: 20}} >
            <DatePicker onChange={onChange} />
            <Button type="primary" onClick={() => dataFetch()}>
                Применить
            </Button>
        </Space>
       <Line data ={userData} />
       </>
    )
}

export default Traffic;