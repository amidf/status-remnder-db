const express = require("express");
const bodyParser = require("body-parser");

const store = require("./store");

const app = express();

app.use(express.json());
app.use(express.urlencoded());

const PORT = process.env.PORT || 1337;

app.get("/db", (req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.status(200);
    res.json(store.getDb());
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});

app.get("/reset", (req, res) => {
  try {
    store.resetDb();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200);
    res.send("Database was successful reset");
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});

app.get("/install", (req, res) => {
  try {
    const { userId, token, hub } = req.query;

    store.saveAdminUser({ userId, token, hub });

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200);
    res.json(store.getAdminUser());
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});

app.post("/savechannels", (req, res) => {
  try {
    const { body } = req;

    console.log({ body });

    store.saveSelectedChannels(body.channels);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200);
    res.send("Channels were saved");
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});

app.post("/saveusers", (req, res) => {
  try {
    const { body } = req;

    store.saveIgnoredUsers(body);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200);
    res.send("Users were saved");
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});

app.get("/savetimezone", (req, res) => {
  try {
    const { userId, utc } = req.query;

    store.saveUserTimezone(userId, utc);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200);
    res.json(store.getDb());
  } catch (error) {
    res.status(400);
    res.json(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT} port`);
});
