import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './config/routes'; // Asegúrate de ajustar la ruta al archivo de rutas
import PrivateRoute from './components/privateRoute/privateRoute.jsx'; // Asegúrate de ajustar la ruta

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
