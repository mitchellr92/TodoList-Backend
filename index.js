const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const knex = require("knex");
const dbConfig = require("./knexfile.js");
const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(cors());
server.use(morgan());

const PORT = 1234;

server.post("/api/todos", (req, res) => {
  const newTodo = req.body;

  if (newTodo.title) {
    db("todos")
      .insert(newTodo)
      .then(itemId => {
        res.status(200).json(itemId);
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to create new todo" });
      });
  } else {
    res.status(500).json({ message: "Missing title" });
  }
});

server.get("/api/todos", (req, res) => {
  db("todos")
    .then(todos => {
      res.status(200).json(todos);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get todos" });
    });
});

server.get("/api/todos/:id", (req, res) => {
  const { id } = req.params;

  db("todos")
    .where({ id })
    .then(todo => {
      res.status(200).json(todo);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get todo" });
    });
});

server.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;

  db("todos")
    .where({ id })
    .del()
    .then(todo => {
      res.status(200).json("Item has been deleted");
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete item" });
    });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
