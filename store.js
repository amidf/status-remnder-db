const fs = require("fs");
const dbFile = "db.json";

const initState = {
  adminUser: null,
  users: {},
};

const readDatabase = () => {
  try {
    const stringContent = fs.readFileSync(dbFile);
    db = JSON.parse(stringContent);
  } catch (e) {
    console.log("No db found, creating %s", dbFile);
  }
};

const saveDatabase = () => {
  console.log("Saving db");

  console.log(db);

  const stringContent = JSON.stringify(db, null, 2);
  fs.writeFileSync(dbFile, stringContent);
};

// Everything is stored here
let db = { ...initState };

readDatabase();

// Accessors
exports.saveAdminUser = ({ userId, token, hub }) => {
  db.adminUser = {
    userId,
    token,
    hub,
    selectedChannels: [],
    ignoredUsers: [],
  };

  saveDatabase();
};

exports.saveSelectedChannels = (channels) => {
  if (!db.adminUser) {
    throw Error("Not found user");
  }

  console.log({ channels });

  db.adminUser.selectedChannels = channels;

  saveDatabase();
};

exports.saveIgnoredUsers = (users) => {
  if (!db.adminUser) {
    throw Error("Not found user");
  }

  db.adminUser.ignoredUsers = users;

  saveDatabase();
};

exports.getAdminUser = () => db.adminUser;

exports.resetDb = () => {
  db = {
    adminUser: null,
    users: {},
  };

  console.log({ db });

  saveDatabase();
};

exports.getDb = () => db;

exports.saveHub = (id) => {
  if (!db.adminUser) {
    throw Error("Not found user");
  }

  db.adminUser.hub = id;

  saveDatabase();
};
exports.saveUserTimezone = (userId, timezone) => {
  db.users[userId] = {
    timezone,
  };

  saveDatabase();
};
