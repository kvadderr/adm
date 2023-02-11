import type { MenuProps } from 'antd';
import {
    AppstoreOutlined,
    UserSwitchOutlined,
    DotChartOutlined,
    LogoutOutlined,
  } from '@ant-design/icons';

import { Link } from 'react-router-dom'

function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  
export const menuItems: MenuProps['items'] = [
  
    getItem('Приложение', 'sub1', <AppstoreOutlined />, [
        getItem(<Link to="/FAQ">FAQ</Link>, '3'),
        getItem(<Link to="/withdrawal">Заявки на вывод средств</Link>, '13'),
    ]),
  
    getItem('Пользователи', 'sub2', <UserSwitchOutlined />, [
        getItem( <Link to="/operator">Операторы</Link>, '4'),
        getItem( <Link to="/client">Клиенты</Link>, '5'),
        getItem( <Link to="/manager">Менеджеры</Link>,'6'),
    ]),
  
    getItem('Аналитика', 'sub3', <DotChartOutlined />, [
        getItem(<Link to="/analytics">Главная</Link>, '7'),
        getItem(<Link to="/clientAnal">По клиентам</Link>, '8'),
        getItem(<Link to="/operatorAnal">По операторам</Link>, '9'),
        getItem(<Link to="/traffic">Посещаемость</Link>, '16'),
    ]),
  
    getItem(<Link to="/support">Support</Link>, '14', <LogoutOutlined />),
    getItem('Выход', '11', <LogoutOutlined />),
    
  ];