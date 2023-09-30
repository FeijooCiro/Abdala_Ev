const http = require('http');
const fs = require('fs');

const servidor = http.createServer((pedido, respuesta) => {
  if (pedido.method === 'POST' && pedido.url === '/traducir') {
    let datos = '';
    pedido.on('data', (chunk) => {
      datos += chunk;
    });

    pedido.on('end', () => {
      const formulario = new URLSearchParams(datos);
      const textoOriginal = formulario.get('texto');
      const textoTraducido = traducirAP(textoOriginal);

      respuesta.writeHead(200, { 'Content-Type': 'text/html' });
      respuesta.write('<!DOCTYPE html><html><head><title>Traductor de Español a Idioma P</title></head><body>');
      respuesta.write('<h1>Traducción a Idioma P</h1>');
      respuesta.write('<h3>Texto original:</h3>');
      respuesta.write(`<p>${textoOriginal}</p>`);
      respuesta.write('<h3>Texto traducido:</h3>');
      respuesta.write(`<p>${textoTraducido}</p>`);
      respuesta.write('<a href="/">Volver</a>');
      respuesta.write('</body></html>');
      respuesta.end();
    });
  } else {
    // Mostrar el formulario si no se ha enviado un POST
    const formularioHTML = fs.readFileSync('public/index.html', 'utf-8');
    respuesta.writeHead(200, { 'Content-Type': 'text/html' });
    respuesta.write(formularioHTML);
    respuesta.end();
  }
});

function traducirAP(texto) {
  const vocales = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
  let textoTraducido = '';

  for (let letra of texto) {
    if (vocales.includes(letra)) {
      textoTraducido += `p${letra.toLowerCase()}p`;
    } else {
      textoTraducido += letra;
    }
  }

  return textoTraducido;
}

// const PORT = process.env.PORT || 3000;
// servidor.listen(PORT, () => {
//     console.log(`Servidor Web iniciado en el puerto ${PORT}`);
// });