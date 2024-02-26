import React, { useState, useContext, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

// Creación del contexto
const AuthContext = React.createContext();

// Hook para acceder al contexto
const useAuth = () => {
  return useContext(AuthContext);
};

// Creción del provider/componente padre
const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState();

  // Creamos un state para saber cuando termina de cargar la comprobacion
  // de onAuthStateChanged
  const [cargando, setCargando] = useState(true);

  // Efecto para comprobar una sola vez la ejecucion
  useEffect(() => {
    //Comprobamos si hay un usuario
    const cancelarSuscripcion = onAuthStateChanged(
      auth,
      (usuario) => {
        setUsuario(usuario);
        setCargando(false);
      },
      []
    );

    return cancelarSuscripcion;
  });

  return (
    <AuthContext.Provider value={{ usuario: usuario }}>
      {/*
      Solamente retornamos los elementos hijos cuando no este cargando.
      De esta forma nos asegurams de no cargar el resto de la aplicacion hasta que el usuario haya sido establecido

      Si no hacemos esto, al refrescar la pagina, el componente children intenta cargar inmediatamente
      antes de haber comprobado que existe un usuario. Esto puede causar errores en la aplicacion
      */}
      {!cargando && children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext, useAuth };
