import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import RatePage from "./pages/RatePage";
import StartPage from "./pages/StartPage/StartPage";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<AuthPage />} />
          {/* <Route path="*" element={<RatePage />} /> */}
          {/* <Route path="*" element={<StartPage />} /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
