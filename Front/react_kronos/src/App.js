import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './config/routes'; 
import PrivateRoute from './components/privateRoute/privateRoute.jsx'; 
import DirectiveRoute from './components/privateRoute/directiveRoute.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.private ? (
                <PrivateRoute>
                  <route.layout>
                    <route.component />
                  </route.layout>
                </PrivateRoute>
              ) : route.directive ?(
                <DirectiveRoute> 
                  <route.layout>
                    <route.component />
                  </route.layout>
                </DirectiveRoute>
              ) : (
                <route.layout>
                  <route.component />
                </route.layout>
              )
            }
          />
        ))}
      </Routes>
    </Router>
  );
}
