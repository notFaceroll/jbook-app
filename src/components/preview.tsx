import { useEffect, useRef } from "react";
import "./preview.css";

interface PreviewProps {
  code: string;
  err: string;
}

// Creating an element to receive the script tag
// and avoid escaped code, passing it to the iframe
const html = `
    <html>
      <head>
        <style>html { overflow: hidden; } </style>
      </head>
      <body>
       <div id="root"></div>
       <script>
       const handleError = (err) => {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
          console.error(err);
       };

       window.addEventListener('error', (event) => {
          event.preventDefault();
          handleError(event.error);
       });

       window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (err) {
          handleError(err);
        }
       }, false);
       </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;

    // this will give enought time for the browser
    // to update the srcDoc and setup the event listener
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        srcDoc={html}
        sandbox="allow-scripts"
      />
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default Preview;
