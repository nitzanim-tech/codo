const addWordBefore = (line, targetWord, wordToAdd) => {
  if (line.includes(wordToAdd)) return line;
  const parts = line.split(targetWord);
  if (parts.length <= 2) return parts[0] + `${wordToAdd} ${targetWord}` + parts.slice(1).join(targetWord);

  // targetWord appears more than 1 time in the line
  for (let i = 1; i < parts.length; i++) {
    if (!parts[i].startsWith('_') && !parts[i - 1].endsWith('_')) {
      return parts.slice(0, i).join(targetWord) + `${wordToAdd} ${targetWord}` + parts.slice(i).join(targetWord);
    }
  }
  return line;
};

function findIncludedFunction(lines, index) {
  for (let i = index; i >= 0; i--) {
    if (lines[i].includes(`def `)) {
      const declareWords = lines[i].trim().split('def ')[1].split('(');
      return { name: declareWords[0], index: i };
    }
  }
  return null;
}

function costumIncludes(line, word) {
  if (!line.includes(word)) return false;
  if (![' ', '=', '+', '-'].some((prefix) => line.includes(`${prefix}${word}`)) && !line.indexOf(`${word}`) === 0)
    return false;
  return line.trim().includes(`${word}(`);
}

function findCallerFunction(lines, functionName) {
  const callerFunctions = [];
  for (let i = 0; i < lines.length; i++) {
    if (costumIncludes(lines[i], functionName) && !lines[i].includes('def ')) {
      lines[i] = addWordBefore(lines[i], functionName, 'await');
      const includedFunc = findIncludedFunction(lines, i);
      includedFunc && callerFunctions.push(includedFunc);
    }
  }
  return callerFunctions;
}

function fixAsyncCode(lines, index) {
  const includedFunc = findIncludedFunction(lines, index);
  if (!includedFunc) return;
  lines[includedFunc.index] = addWordBefore(lines[includedFunc.index], 'def', 'async');
  const callerFunctions = findCallerFunction(lines, includedFunc.name);
  for (const func of callerFunctions) {
    addWordBefore(lines[func.index], func.name, 'await');
    if (index != func.index) fixAsyncCode(lines, func.index);
  }
}

export function convertInptToAsync(pythonCode) {
  if (!pythonCode.includes('input')) return pythonCode;
  let lines = pythonCode.split('\n');

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`input(`) && !lines[i].includes(`_input(`)) {
      lines[i] = addWordBefore(lines[i], 'input(', 'await');
      fixAsyncCode(lines, i);
    }
  }
  return lines.join('\n');
}
