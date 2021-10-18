import React from 'react';
import {useAuth} from '../../../contexts/AuthContext';

const routes = () => {
  const {user} = useAuth();

  let _routes = [
    {
      name: 'Home',
      route: 'Tabs',
      icon: {name: 'home', type: 'AntDesign'},
      active: true,
    },
    {type: 'divider'},

    {
      name: 'Notifications',
      route: 'Notifications',
      icon: {
        type: 'MaterialCommunityIcons',
        name: 'bell-outline',
      },
      active: user !== null ? true : false,
    },
    {type: 'divider'},
    {
      name: 'Account',
      route: 'Profile',
      icon: {
        name: 'account',
        type: 'MaterialCommunityIcons',
      },
      active: user !== null ? true : false,
    },
  ];

  return _routes;
};
export default routes;
