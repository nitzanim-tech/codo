export function cleanTraceback(error) {
  const lines = error.message.split('\n');
  const tracebackHead = lines[0];
  const tracebackBody = lines.slice(10);
  const tracebackBodyCorrectLine = tracebackBody.map((line, index) =>
    index === 0 ? line.replace(/line (\d+)/, (match, p1) => `line ${parseInt(p1) - 1}`) : line,
  );
  const cleanedTracebackBody = tracebackBodyCorrectLine.map((line) => line.replace(', in pythonCodeWrapper', ''));

  return tracebackHead + '\n' + cleanedTracebackBody.join('\n') + '\n';
}

export function cleanTracebackTest(error) {
  const lines = error.message.split('\n');
  return 'שגיאה: '+ lines[lines.length - 2] + '\n';
}
