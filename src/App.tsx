import React from "react";
import { rrfProps, store } from "./redux/store";
import { Provider } from "react-redux";
import LanguageProvider from "./components/LanguageProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from "react-redux-firebase";
import MapPage from "@/pages/MapPage";

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <LanguageProvider>
          <BrowserRouter>
            <Routes>
              <Route path={"/"} element={<MapPage />} />
            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </ReactReduxFirebaseProvider>
    </Provider>

    // </ConfigProvider>
  );
}

export default App;
