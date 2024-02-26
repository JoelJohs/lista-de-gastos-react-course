import React, { useState } from "react";
import {
  ContenedorFiltros,
  Formulario,
  Input,
  InputGrande,
  ContenedorBoton,
} from "../elementos/ElementosDeFormulario";
import Boton from "../elementos/Boton";
import { ReactComponent as IconoPlus } from "../img/plus.svg";
import SelectCategorias from "./SelectCategorias";

// Componente para agregar gastos
const FormularioGasto = () => {
  // UseState para el formulario
  const [inputDescripcion, cambiarInputDescripcion] = useState("");
  const [inputValor, cambiarInputValor] = useState("");

  // Constante para cambiar categoría
  const [categoria, cambiarCategoria] = useState("hogar");

  const handleChange = (e) => {
    if (e.target.name === "Descripcion") {
      cambiarInputDescripcion(e.target.value);
    } else if (e.target.name === "valor") {
      cambiarInputValor(e.target.value.replace(/[^0-9.]/g, ""));
    }
  };

  // Estado para el formulario
  return (
    <Formulario>
      <ContenedorFiltros>
        <SelectCategorias
          categoria={categoria}
          cambiarCategoria={cambiarCategoria}
        />
      </ContenedorFiltros>
      <div>
        <Input
          type="text"
          name="Descripcion"
          id="descripcion"
          placeholder="Descripción del gasto"
          value={inputDescripcion}
          onChange={handleChange}
        />
        <InputGrande
          type="text"
          name="valor"
          id="valor"
          placeholder="$0.00"
          value={inputValor}
          onChange={handleChange}
        />
      </div>
      <ContenedorBoton>
        <Boton as="button" primario conIcono type="submit">
          Agregar Gasto <IconoPlus />
        </Boton>
      </ContenedorBoton>
    </Formulario>
  );
};

export default FormularioGasto;
