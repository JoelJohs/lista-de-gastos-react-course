import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Header, Titulo, ContenedorHeader } from "./../elementos/Header";
import Boton from "./../elementos/Boton";
//prettier-ignore
import { Formulario, Input, ContenedorBoton} from "./../elementos/ElementosDeFormulario";
import { ReactComponent as SvgLogin } from "./../img/login.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { auth } from "./../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Alerta from "./../elementos/Alerta";

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 12.5rem; /* 200px */
  margin-bottom: 1.25rem; /* 20px */
`;

const InicioSesion = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setCorreo(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    cambiarEstadoAlerta(false);
    cambiarAlerta({});

    // Comprobamos que el correo sea valido desde el lado del cliente
    const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

    if (!expresionRegular.test(correo)) {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Por favor ingrese un correo electrónico válido.",
      });
      return;
    }

    if (correo === "" || password === "") {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Por favor rellene todos los datos",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, correo, password);
      navigate("/");
    } catch (error) {
      cambiarEstadoAlerta(true);
      let mensaje;
      switch (error.code) {
        case "auth/wrong-password":
          mensaje = "La contraseña no es válida.";
          break;
        case "auth/user-not-found":
          mensaje =
            "No se encontró ninguna cuenta con este correo electrónico.";
          break;
        default:
          mensaje = "Hubo un error al intentar iniciar sesión.";
          break;
      }

      cambiarAlerta({
        tipo: "error",
        mensaje: mensaje,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Inicio de Sesion</title>
      </Helmet>
      <Header>
        <ContenedorHeader>
          <Titulo>Inicio de Sesion</Titulo>
          <div>
            <Boton to="/crear-cuenta">Crear Cuenta</Boton>
          </div>
        </ContenedorHeader>
      </Header>
      <Formulario onSubmit={handleSubmit}>
        <Svg />
        <Input
          type="email"
          name="email"
          placeholder="Correo Electronico"
          value={correo}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={handleChange}
        />
        <ContenedorBoton>
          <Boton as="button" primario="true" type="submit">
            Iniciar sesion
          </Boton>
        </ContenedorBoton>
      </Formulario>

      <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        cambiarEstadoAlerta={cambiarEstadoAlerta}
      />
    </>
  );
};

export default InicioSesion;
