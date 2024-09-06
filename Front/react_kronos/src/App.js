import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './config/routes'; 
import { ConfigProvider } from 'antd';
import PrivateRoute from './components/privateRoute/privateRoute.jsx'; 
import DirectiveRoute from './components/privateRoute/directiveRoute.jsx';

export default function App() {
  const themeTokens = {
    token: {
      colorPrimary: '#1DA57A', // Color principal
      colorBgBase: '#F5F5F5', // Color de fondo
      colorBgContainer: '#fcfcfc', // Color de fondo del contenedor


      colorText: '#333',
      colorTextSecondary: '#5a5a5a',
      colorTextTertiary: '#222',
      fontSize: 14,
      fontSizeSM: 10,
      fontSizeLG: 16,
      fontFamily: 'Alata'    // Color del texto

    },
  };
  return (
    <ConfigProvider theme={themeTokens}>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Component = route.component;

            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <route.layout>
                    {route.private ? (
                      <PrivateRoute>
                        <Component />
                      </PrivateRoute>
                    ) : route.directive ? (
                      <DirectiveRoute> 
                        <Component />
                      </DirectiveRoute>
                    ) : (
                      <Component />
                    )}
                  </route.layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
          </ConfigProvider>
  );
}
