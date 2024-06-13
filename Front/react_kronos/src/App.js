import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./config/routes";
export default function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <route.layout>
                <route.component />
              </route.layout>
            }
          />
        ))}
      </Routes>
    </Router>
  );
};


