const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

// hämta DB info

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "database",
});

// extensions / dependencies needed

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Checka datan från workbench

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM discussion_table";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

// Checka datan som joinar med fk från workbench

app.get("/api/get/joined", (req, res) => {
  const sqlSelect2 =
    "SELECT * FROM discussion_table INNER JOIN comment_table ON discussion_table.id = comment_table.fk_DTB";
  db.query(sqlSelect2, (err, result) => {
    res.send(result);
  });
});

// Inserta datan vid en post från frontenden till databasen

app.post("/api/insert", (req, res) => {
  const postUsername = req.body.postUsername;
  const postComment = req.body.postComment;
  const postUsernameTwo = req.body.postUsernameTwo;
  const postCommentTwo = req.body.postCommentTwo;

  const sqlInsert = "INSERT INTO discussion_table (user, comment) VALUES (?,?)";
  db.query(sqlInsert, [postUsername, postComment], (err, result) => {
    console.log(result);
  });

  const sqlInsertTwo =
    "INSERT INTO comment_table (username, commentComment) VALUES (?,?)";
  db.query(sqlInsertTwo, [postUsernameTwo, postCommentTwo], (err2, result2) => {
    console.log(err2);
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
