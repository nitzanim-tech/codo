import React, { useState } from "react";
import "./Terminal.css";

const Terminal = ({ output, onInput, waitingForInput }) => {
  const [input, setInput] = useState("");

  const handleInput = (event) => {
    if (event.key === "Enter") {
      onInput(input);
      setInput("");
    }
  };

  return (
    <div className="p-terminal">
      <div className="p-terminal-content">
        {output? output.split("\n").map((line, index) => (
          <div key={index} >
            {line}
          </div>
        )): ""}
      </div>
      {waitingForInput && (
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleInput}
        />
      )}
    </div>
  );
};

export default Terminal;
