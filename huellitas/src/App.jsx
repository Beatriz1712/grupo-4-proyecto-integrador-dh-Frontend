import { Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import PanelAdmin from "./Routes/PanelAdmin";
import Detalle from "./Routes/Detalle";
import Layout from "./Layouts/Layout";
import "./Styles/index.css";

import ListaProductos from "./Routes/ListaProductos";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/administracion" element={<PanelAdmin />} />
          <Route path="/alojamiento/:id" element={<Detalle />} />
          <Route path="/lista" element={<ListaProductos />} />
          <Route path="*" element={<h1>Error 404 - Page not Found</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
