import { useState } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import bundle from "../bundler";

function CodeCell() {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async () => {
    try {
      const output = await bundle(input);
      setCode(output);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <CodeEditor
        initialValue="const hey = 'hello world';"
        onChange={(value) => {
          setInput(value);
        }}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
}

export default CodeCell;
