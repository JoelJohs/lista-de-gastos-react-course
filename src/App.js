import React from "react";
import {
  Header,
  Titulo,
  ContenedorHeader,
  ContenedorBotones,
} from "./elementos/Header";
import Boton from "./elementos/Boton";
import { Helmet } from "react-helmet";
import BotonCerrarSesion from "./elementos/BotonCerrarSesion";
import FormularioGasto from "./components/FormularioGasto";

const App = () => {
  return (
    <>
      <Helmet>
        <title>Agregar Gasto</title>
      </Helmet>
      <Header>
        <ContenedorHeader>
          <Titulo>Agregar Gastos</Titulo>
          <ContenedorBotones>
            <Boton to="/categorias">Categorias</Boton>
            <Boton to="/lista-de-gastos">Lista De Gastos</Boton>
            <BotonCerrarSesion />
          </ContenedorBotones>
        </ContenedorHeader>
      </Header>
      <FormularioGasto />
    </>
  );
};

export default App;
