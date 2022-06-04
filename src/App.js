import { CookiesProvider } from "react-cookie";
import { connect, Provider } from "react-redux";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Message from "./components/Message";
import AuthPage from "./pages/AuthPage";

import Preloader from "./pages/Preloader/Preloader";
import RatePage from "./pages/RatePage";
import StartPage from "./pages/StartPage/StartPage";
import Stream from "./pages/Stream";
import { setMessage } from "./redux/actions";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <CookiesProvider>
        {/* <BrowserRouter> */}
        <HashRouter>
          <Inner />
        </HashRouter>
        {/* </BrowserRouter> */}
      </CookiesProvider>
    </Provider>
  );
};

const InnerApp = ({ message, setMessage }) => {
  return (
    <>
      {message.messageText && (
        <Message message={message} resolve={setMessage} />
      )}
      <Routes>
        <Route path="*" element={<AuthPage />} />
        {/* <Route path="*" element={<RatePage />} /> */}
        <Route path="/excursion" element={<StartPage />} />
        {/* <Route path="/excursion" element={<Preloader />} /> */}
        <Route path="/stream" element={<Stream />} />
      </Routes>
    </>
  );
};

const mapStateToProps = (state) => ({
  message: state.auth.message,
});

const Inner = connect(mapStateToProps, { setMessage })(InnerApp);

export default App;
