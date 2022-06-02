import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import RatePage from "./pages/RatePage";
import StartPage from "./pages/StartPage/StartPage";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <CookiesProvider>
        {/* <BrowserRouter> */}
        <HashRouter>
          <Routes>
            <Route path="*" element={<AuthPage />} />
            {/* <Route path="*" element={<RatePage />} /> */}
            <Route path="/excursion" element={<StartPage />} />
          </Routes>
        </HashRouter>
        {/* </BrowserRouter> */}
      </CookiesProvider>
    </Provider>
  );
};

export default App;
