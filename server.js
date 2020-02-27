// Imports
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const KnexStore = require("connect-session-knex")(session);
const knex = require("./data/dbConfig")

const userRouter = require("./users/user-router");
const server = express();


const sessionsConfig = {
    name: "Zelda",
    secret: "Keep it secret, keep it safe",
    
    cookie: {
        maxAge: 1000 * 30,
        secure: false,
        httpOnly: true
    },
    store: new KnexStore({
        knex: knex,
        tablename: "sessions",
        createtable: true,
        sidfieldname: "sid",
        clearInterval: 1000 * 60 * 15,
    }),
    resave: false,
    saveUninitialized: true,
};

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionsConfig));

server.use("/api/users", userRouter);

module.exports = server;