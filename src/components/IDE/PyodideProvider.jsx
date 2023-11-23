import React, { createContext, useContext, useState, useEffect } from "react";

const PyodideContext = createContext(null);

export function PyodideProvider({ children }) {
  const [pyodide, setPyodide] = useState(null);

useEffect(() => {
  (async () => {
    try {
      const pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/",
      });
      setPyodide(pyodide);
    } catch (error) {
      console.log(error);
    }
  })();
}, []);

  return (
    <PyodideContext.Provider value={pyodide}>
      {children}
    </PyodideContext.Provider>
  );
}

export function usePyodide() {
  return useContext(PyodideContext);
}
