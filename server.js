const express = require('express');
const helmet = require('helmet');

const projectRouter = require('./data/helpers/projectRouter')
const actionsRouter = require('./data/helpers/actionsRouter')

const server = express();


server.use(express.json())
server.use(helmet());
server.use(logger)

server.use('/project',projectRouter)
server.use('/actions',actionsRouter)


server.get('/', (req, res) => {
  res.send(`<h2>Lets get ziggs to GOLD</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(req.method, "Original Url:", req.originalUrl, new Date() )
  next();
  }

module.exports = server;
