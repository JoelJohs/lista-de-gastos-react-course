import React from "react";

// Creación del contexto
const AuthContext = React.createContext();

// Creción del provider/componente padre

const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ usuario: true }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
