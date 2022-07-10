import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Body1 from "./components/body";
import Header from "./components/header";
import { Route, Routes } from "react-router-dom";
import Checkout from "./components/checkout/checkout";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Body1 />}/>
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App;
