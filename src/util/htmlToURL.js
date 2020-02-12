export default function htmlToURL (html) {
  const source = `<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html;charset=UTF-8">
    <style>body { color: #fff; }::-webkit-scrollbar {width: 7px;}
    ::-webkit-scrollbar-thumb {background: #555;}
    ::-webkit-scrollbar-thumb:hover {background: #363636;}</style>
  </head>
  <body>
    ${html}
  </body>
</html>`;

  return getBlobURL(source, "text/html");
}

function getBlobURL (code, type) {
  const blob = new Blob([code], { type });
  return URL.createObjectURL(blob);
};