import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import WebFont from "webfontloader";
import Contenedor from "./elementos/Contenedor";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditarGasto from "./components/EditarGasto";
import GastosPorCategoria from "./components/GastosPorCategoria";
import InicioSesion from "./components/InicioSesion";
import ListaDeGastos from "./components/ListaDeGastos";
import RegistroUsuarios from "./components/RegistroUsuarios";
import { Helmet } from "react-helmet";
import favicon from "./img/logo.png";
import Fondo from "./elementos/Fondo";

WebFont.load({
  google: {
    // Work+Sans:wght@100..900
    families: ["Work Sans:400,500,700", "Sans-Serif"],
  },
});

const Index = () => {
  return (
    // Uso de React.StrictMode para detectar problemas potenciales
    <React.StrictMode>
      {/* Todo lo que va en la app */}
      <>
        <Helmet>
          <link rel="shortcut icon" href={favicon} type="image/x-icon" />
        </Helmet>
        <BrowserRouter>
          <Contenedor>
            <Routes>
              <Route path="/iniciar-sesion" element={<InicioSesion />} />
              <Route path="/crear-cuenta" element={<RegistroUsuarios />} />
              <Route path="/categorias" element={<GastosPorCategoria />} />
              <Route path="/lista-de-gastos" element={<ListaDeGastos />} />
              <Route path="/editar-gasto/:id" element={<EditarGasto />} />
              <Route path="/" element={<App />} />
            </Routes>
          </Contenedor>
        </BrowserRouter>

        <Fondo />
      </>
      {/* Fin de la app */}
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index />);
