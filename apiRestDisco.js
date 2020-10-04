const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 1100;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// CONEXION A MI BASE DE DATOS

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: null,
    database: "Angular"
  });

  connection.connect(function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log("conexión correcta!");
    }
  });

  // *************************** DISCOS **************************** //

// GET DE TODOS LOS DISCOS

app.get("/discos", (req, res) => {
  let sql = "SELECT * FROM discos";
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("Lista de discos...");
      res.send(result);
      console.log(result);
    }
  });
});

// GET BY ID DISCOS

app.get("/discos/:id", (req, res) => {
  let params = req.params.id;
  let sql = "SELECT  titulo, interprete, anyoPublicacion FROM discos WHERE id = ?";
  connection.query(sql, params, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("Lista de discos por su id...");
      res.send(result);
      console.log(result);
    }
  });
});


// POST DISCOS

app.post("/discos", (req, res) => {
  let params = [
    req.body.titulo,
    req.body.interprete,
    req.body.anyoPublicacion
  ];
  let sql =
    "INSERT INTO discos (titulo, interprete, anyoPublicacion) VALUES (?,?,?)";
  connection.query(sql, params, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("Disco creado correctamente!");
      res.send(result);
      console.log(result);
    }
  });
});

// PUT DISCOS

app.put("/discos", (req, res) => {
  let params = [
    req.body.titulo,
    req.body.interprete,
    req.body.anyoPublicacion,
    req.body.id
  ];
  let sql =
    "UPDATE discos SET titulo = ?,  interprete = ?, anyoPublicacion = ? WHERE  id = ? ";
  connection.query(sql, params, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("Disco Actualizado correctamente!");
      res.send(result);
      console.log(result);
    }
  });
});

// DELETE DISCOS

app.delete("/discos", (req, res) => {
  let params = [req.body.id];
  let sql = "DELETE discos FROM discos WHERE id = ?";
  connection.query(sql, params, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("Disco Borrado Correctamente!");
      // res.send(
      //   `Los datos del disco con id ${req.body.id} han sido borrados!`
      // );
      res.send(result)
      console.log(result);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en puerto: ${port}`);
});