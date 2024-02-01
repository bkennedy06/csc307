import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

  const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const addUser = (user) => {

  users["users_list"].push(user);
  return user; // Return the added user
};

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const index = users.users_list.findIndex(user => user.id === id);

  if (index === -1) {
      res.status(404).send("User not found.");
  } else {
      users.users_list.splice(index, 1);
      res.status(204).send(); // 204 No Content
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;

  const userId = Math.random().toString(36).substr(2, 9);
  userToAdd.id = userId;

  users.users_list.push(userToAdd);

  res.status(201).send(userToAdd);
});

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});