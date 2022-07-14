import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugins";
import { fetchPlugin } from "./plugins/fetch-plugin";

let service: boolean;

const bundle = async (rawCode: string) => {
  if (!service) {
    await esbuild.initialize({
      worker: true,
      // wasmURL: "/esbuild.wasm",
      wasmURL: "https://unpkg.com/esbuild-wasm@0.14.39/esbuild.wasm",
    });
    service = true;
  }

  try {
    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
      jsxFactory: "_React.createElement",
      jsxFragment: "_React.Fragment",
    });
    return { code: result.outputFiles[0].text, err: "" };
  } catch (err: any) {
    return {
      code: "",
      err: err.message,
    };
  }
};

export default bundle;
