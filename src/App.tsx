import "bulmaswatch/superhero/bulmaswatch.min.css";
import * as esbuild from "esbuild-wasm";
import React, { useEffect, useRef, useState } from "react";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugins";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./components/code-editor";

function App() {
  const [input, setInput] = useState("");
  const iframe = useRef<any>();

  const startService = async () => {
    try {
      const service = await esbuild.initialize({
        worker: true,
        // wasmURL: "/esbuild.wasm",
        wasmURL: "https://unpkg.com/esbuild-wasm@0.14.39/esbuild.wasm",
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
      iframe.current.srcdoc = html;

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
      iframe.current.contentWindow.postMessage(res.outputFiles[0].text, "*");
    } catch (err) {
      console.error(err);
    }
  };

  // Creating an element to receive the script tag
  // and avoid escaped code, passing it to the iframe
  const html = `
    <html>
      <head></head>
      <body>
       <div id="root"></div>
       <script>
       window.addEventListener('message', (event) => {
        try {

          eval(event.data);
        } catch (err) {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
          console.error(err);
        }
       }, false);
       </script>
      </body>
    </html>
  `;

  return (
    <div>
      <CodeEditor
        initialValue="const hey = 'hello world';"
        onChange={(value) => {
          setInput(value);
        }}
      />
      <textarea
        value={input}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setInput(e.target.value);
        }}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe
        title="preview"
        ref={iframe}
        srcDoc={html}
        sandbox="allow-scripts"
      />
    </div>
  );
}

export default App;
