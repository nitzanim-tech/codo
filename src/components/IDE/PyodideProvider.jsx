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
      const pyodideWrapper = {
        prepInfiniteWatchdog: function() {
            pyodide.runPython(`
                infinite_loop_watchdog_counts = {}
                def infinite_loop_watchdog(loop_id):
                    if loop_id not in infinite_loop_watchdog_counts:
                        infinite_loop_watchdog_counts[loop_id] = 0
                    elif infinite_loop_watchdog_counts[loop_id] >= 5000:
                        raise Exception("Infinite loop")

                    infinite_loop_watchdog_counts[loop_id] += 1

                    return True
            `)
        },
        preprocessCode: function(code) {
            return (
                code
                .split('\n')
                .map((line) => {
                    if (line.includes('while ')) {
                        return line.replace('while ', 'while infinite_loop_watchdog("' + crypto.randomUUID() + '") and ');
                    }
                    return line;
                })
                .join('\n')
            );
        },
        runPython: function(code) {
            this.prepInfiniteWatchdog();
            return pyodide.runPython(this.preprocessCode(String(code)));
        },
        runPythonAsync: function(code) {
            this.prepInfiniteWatchdog();
            return pyodide.runPythonAsync(this.preprocessCode(String(code)));
        }
      };
      Object.keys(pyodide).forEach(prop => {
        if (!pyodideWrapper.hasOwnProperty(prop)) {
            pyodideWrapper[prop] = pyodide[prop];
        }
      });

      setPyodide(pyodideWrapper);
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
