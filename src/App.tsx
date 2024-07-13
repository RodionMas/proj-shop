import "./App.css";
import Wrapper from "./components/Wrapper/Wrapper";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Wrapper />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
