
import { Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import PanelAdmin from "./Routes/PanelAdmin";
import Detalle from "./Routes/Detalle";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import "./Styles/index.css";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detalle" element={<Detalle />} />
        <Route path="/admin" element={<PanelAdmin />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
 

