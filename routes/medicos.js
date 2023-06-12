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

/* GET medicos*/
router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM medicos', function(error, results, fields) {
    if (error) {
      console.log("Error en la consulta", error)
      res.status(500).send("Error en la consulta");
    }else{
    res.render('medicos', { medicos: results });
    }
  });
});

router.get('/agregar-medico', (req, res) =>{
  res.sendFile('registro-medico.html', {root: 'public'});
})

router.post('/agregar', (req, res) =>{
  const cedula = req.body.cedula;
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const correo = req.body.correo;
  const consultorio = req.body.consultorio;
  const especialidad = req.body.especialidad;
  connection.query(`INSERT INTO medicos (cedula, nombres, apellidos, especialidad,consultorio, correo) VALUES (${cedula},'${nombre}', '${apellido}', '${especialidad}', '${consultorio}', '${correo}')`, (error, result) => {
    if (error) {
      console.log("Ocurrio un error en la ejecución", error)
      res.status(500).send("Error en la consulta");
    }else{
      res.redirect('/medicos');
    }
  });
})

module.exports = router;
