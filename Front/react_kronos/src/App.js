import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './config/routes'; 
import { Spin } from 'antd';
import PrivateRoute from './components/privateRoute/privateRoute.jsx'; 
import DirectiveRoute from './components/privateRoute/directiveRoute.jsx';

export default function App() {
  return (
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
  );
}
