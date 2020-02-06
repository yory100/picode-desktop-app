export default function htmlToURL (html) {
  const getBlobURL = (code, type) => {
    const blob = new Blob([code], { type });
    return URL.createObjectURL(blob);
  };

  const source = `<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html;charset=UTF-8">
    <style>body { color: #fff; }</style>
  </head>
  <body>
    ${html}
  </body>
</html>`;

  return getBlobURL(source, "text/html");
}
