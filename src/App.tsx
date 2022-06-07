import * as esbuild from "esbuild-wasm";
import React, { useEffect, useState } from "react";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugins";
import { fetchPlugin } from "./plugins/fetch-plugin";

function App() {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const startService = async () => {
    try {
      const service = await esbuild.initialize({
        worker: true,
        wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
      });
      console.log(service);
    } catch (err) {}
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    try {
      // const res = await esbuild.transform(input, {
      //   loader: "jsx",
      //   target: "es2015",
      // });
      const res = await esbuild.build({
        entryPoints: ["index.js"],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin(), fetchPlugin(input)],
        define: {
          "process.env.NODE_ENV": '"production"',
          global: "window",
        },
      });
      console.log(res);
      setCode(res.outputFiles[0].text);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setInput(e.target.value);
        }}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
}

export default App;
