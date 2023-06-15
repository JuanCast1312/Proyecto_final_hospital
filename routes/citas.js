var express = require('express');
var router = express.Router();
const {connection} = require('../database/conexion.js')

/* GET medicos*/
router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM cita_medica', function(error, results) {
    if (error) {
      console.log("Error en la consulta", error)
      res.status(500).send("Error en la consulta");
    }else{
    res.render('citas', { citas: results });
    }
  });
});

router.get('/agregar-cita', (req, res) =>{
  res.sendFile('registro-cita.html', {root: 'public'});
})

router.post('/agregar', (req, res) =>{
  const cedulaDuenio = req.body.cedula;
  const fecha = req.body.fecha;
  const especialidad = req.body.especialidad;

  connection.query(`SELECT cedula FROM medicos WHERE especialidad='${especialidad}';`, function(error, results) {
    if (error) {
      console.log("Error en la consulta", error)
      res.status(500).send("Error en la consulta");
    }
      const cedulaMedico = results[0].cedula;
      connection.query(`INSERT INTO cita_medica (id_mascota, id_medico, fecha) VALUES (${cedulaDuenio}, ${cedulaMedico}, '${fecha}')`, (error, result) => {
        if (error) {
          console.log("Ocurrio un error en la ejecución", error)
          res.status(500).send("Error en la consulta");
        }else{
          res.redirect('/citas');
        }
      });
  });
})

module.exports = router;
