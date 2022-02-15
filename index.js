const express = require("express");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/users");
const app = express();
const port = 3030;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    origin: "*",
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.use(userRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
