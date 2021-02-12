import React from 'react';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Playlists',
    path: '/playlists',
    icon: <IoIcons.IoMdHeadset />,
    cName: 'nav-text'
  },
  {
    title: 'Statistics',
    path: '/statistics',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'About Us',
    path: '/about us',
    icon: <IoIcons.IoIosPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <IoIcons.IoMdSettings />,
    cName: 'nav-text'
  },
  {
    title: 'Log Out',
    path: '/log out',
    icon: <IoIcons.IoIosLogOut />,
    cName: 'nav-text'
  }
];
