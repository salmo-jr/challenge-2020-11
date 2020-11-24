import React from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import Routes from './src/routes';

export default function App() {
  return (
    <MenuProvider>
      <Routes />
    </MenuProvider>
  );
}