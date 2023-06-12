var express = require('express');
var router = express.Router();

// Inicio conexion a la base de datos

// Configuración de la base de datos
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'veterinaria'
});

// Conexión a la base de datos
connection.connect(function(err) {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

// Fin conexion a la base de datos

/* GET mascotas*/
router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM mascotas', function(error, results, fields) {
    if (error) {
      console.log("Error en la consulta", error)
      res.status(500).send("Error en la consulta");
    }else{
    res.render('mascotas', { mascotas: results });
    }
  });
});

router.get('/agregar-mascota', (req, res) =>{
  res.sendFile('registro-mascotas.html', {root: 'public'});
})

router.post('/agregar', (req, res) =>{
  const cedula = req.body.cedula;
  const nombre = req.body.mascota;
  const nombre_duenio = req.body.duenio;
  const edad = req.body.edad;
  const telefono = req.body.telefono;
  connection.query(`INSERT INTO mascotas (cedula_duenio, nombre, nombre_duenio, edad, telefono_duenio) VALUES (${cedula},'${nombre}', '${nombre_duenio}', ${edad}, '${telefono}')`, (error, result) => {
    if (error) {
      console.log("Ocurrio un error en la ejecución", error)
      res.status(500).send("Error en la consulta");
    }else{
      res.redirect('/mascotas');
    }
  });
})

module.exports = router;
