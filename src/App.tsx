import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import MapLoader from "./components/MapLoader";

function App() {
  return (
        <MapLoader>
          <BrowserRouter>
            <Routes>
              <Route path={"/"} element={<DashboardPage />} />
            </Routes>
          </BrowserRouter>
        </MapLoader>
  );
}

export default App;
