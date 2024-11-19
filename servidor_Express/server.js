// const express = require('express')
// const app = express()

// // respond with "hello world" when a GET request is made to the homepage
// app.get('/', (req, res) => {
//   res.send('hello world')

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname)));
// Configurar Express para procesar datos enviados por formularios
app.use(express.urlencoded({ extended: true }));

// Ruta para servir el formulario HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'formulario.html'));
});

// Ruta para procesar el formulario
app.post('/registro', (req, res) => {
    const { nombre, edad, email, curso } = req.body;

    // Validaciones básicas
    const errores = [];
    if (!nombre.trim()) errores.push('El campo "Nombre" es obligatorio.');
    if (!edad || isNaN(edad) || edad <= 0) errores.push('El campo "Edad" debe ser un número positivo.');
    if (!email || !/\S+@\S+\.\S+/.test(email)) errores.push('El campo "Email" debe tener un formato válido.');
    if (!curso || !['JavaScript', 'Node.js', 'HTML y CSS'].includes(curso)) {
        errores.push('Debe seleccionar un curso válido.');
    }

    // Si hay errores, mostrar la página con mensajes
    if (errores.length > 0) {
        return res.send(`
            <h1>Errores en el Registro</h1>
            <ul>
                ${errores.map(error => `<li>${error}</li>`).join('')}
            </ul>
            <a href="/">Volver al formulario</a>
        `);
    }
  // Imprimir los datos en la terminal
  console.log("Nuevo registro:");
  console.log(`Nombre: ${nombre}`);
  console.log(`Edad: ${edad}`);
  console.log(`Email: ${email}`);
  console.log(`Curso: ${curso}`);
    // Si no hay errores, mostrar la confirmación
    res.send(`
        <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Registro Exitoso</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <div class="confirmation">
      <h1>Registro Exitoso</h1>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Edad:</strong> ${edad}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Curso:</strong> ${curso}</p>
      <a href="/">Registrar otro estudiante</a>
    </div>
    
    <!-- Autor del formulario fuera del cuadro de confirmación -->
    <footer style="font-size: 10px; text-align: center; margin-top: 20px;">
      <p>Formulario creado por: Miguel Ángel Ruiz Urmendis</p>
    </footer>
  </body>
  </html>
    `);
    
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});


// Creado por miguel angel ruiz urmendis