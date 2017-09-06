'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
const graphQLSchema = require('./graphql');
const expressGraphQL = require('express-graphql');

const app = express();

app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({extended: false}));
app.use(middleware.bodyParser.json());

app.use(middleware.auth.session);
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());

app.use('/graphql', expressGraphQL({schema: graphQLSchema, graphiql: true}));

// Serve static files
app.get('*/bundle.js', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../public/dist/bundle.js'));
});
app.get('*/favicon.ico', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/public/favicon.ico'));
});
app.get('*/manifest.json', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/public/manifest.json'));
});
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/public/index.html'));
});

app.use('/', routes.auth);
app.use('/api', routes.api);

module.exports = require('http').Server(app);
