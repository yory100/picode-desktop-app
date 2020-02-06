export default function htmlToURL (html) {
  const getBlobURL = (code, type) => {
    const blob = new Blob([code], { type });
    return URL.createObjectURL(blob);
  };

  const source = `<!doctype html>
<html>
  <head>
  <meta http-equiv="Content-type" content="text/html;charset=UTF-8">
  </head>
  <style>body { color: #fff; }</style>
  <body>
    ${html}
  </body>
</html>`;

  return getBlobURL(source, "text/html");
}
