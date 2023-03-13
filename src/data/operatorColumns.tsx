import { Badge, Avatar } from 'antd';

export const operatorColumns = [
    {
      title: '',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar) => <Avatar
        size={{ xs: 24 }}
        src={avatar}
      />
    },
    {
      title: 'ФИО',
      dataIndex: 'nickname',
      key: 'nickname',
      width: '20%',
    },
    {
      title: 'Логин',
      dataIndex: 'login',
      key: 'login',
      width: '15%',
    },
    {
      title: 'Баланс',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: 'Аналитика',
      dataIndex: 'operatorId',
      key: 'operatorId',
      render: (operatorId) => <a>Отчет</a>
    },
    {
      title: 'Подробнее',
      dataIndex: 'singleData',
      key: 'singleData',
      render: (singleData) => <a>Подробнее</a>
    },
    {
      title: 'Отзывы',
      dataIndex: 'detail',
      key: 'detail',
      render: () => <a onClick={showDrawer}>Отзывы</a>
    },
  ]; 