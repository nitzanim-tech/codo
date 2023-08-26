const pyodide = await loadPyodide({
  indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/",
});

async function runPython(pythonCode, input) {
  pyodide.runPython("import io, sys");
  pyodide.runPython('sys.stdin = io.StringIO("' + input + '")');
  pyodide.runPython("sys.stdout = io.StringIO()");
  pyodide.runPython(`def input(prompt=None):
    import builtins
    if prompt:
        print(prompt)
    return builtins.input()
  `);

  pyodide.runPython(pythonCode);
  let output = pyodide.runPython("sys.stdout.getvalue()");
  return output;
}

export default async function runTest({ code, inputList, testsOutputs }) {
  testsOutputs = [];
  for (const input of inputList) {
    const output = await runPython(code, input.replace(/\n/g, "\\n"));
    testsOutputs.push({ input, output });
  }
}
