function recuperar(pedido, respuesta) {
    let info = ''
    pedido.on('data', datosparciales => {
      info += datosparciales
    })
    pedido.on('end', () => {
      const formulario = new URLSearchParams(info)
      console.log(formulario)
  
      // Obtén el nombre y la clave del formulario
      const nombre = formulario.get('nombre')
      const clave = formulario.get('clave')
  
      // Función para traducir una palabra al Idioma P
      function traducirAP(word) {
        const vocales = ['a', 'e', 'i', 'o', 'u']
        let palabraTraducida = ''
        for (let letra of word) {
          if (vocales.includes(letra.toLowerCase())) {
            palabraTraducida += `p${letra.toLowerCase()}p`
          } else {
            palabraTraducida += letra
          }
        }
        return palabraTraducida
      }
  
      // Traducir el nombre y la clave al Idioma P
      const nombreTraducido = traducirAP(nombre)
      const claveTraducida = traducirAP(clave)
  
      respuesta.writeHead(200, { 'Content-Type': 'text/html' })
      const pagina =
        `<!doctype html><html><head></head><body>
       Nombre de usuario en Idioma P: ${nombreTraducido}<br>
       Clave en Idioma P: ${claveTraducida}<br>
       <a href="index.html">Retornar</a>
       </body></html>`
      respuesta.end(pagina)
    })
  }
  