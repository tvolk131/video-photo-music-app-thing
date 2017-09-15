'use strict';
require('dotenv').config();
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

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use('/', routes.auth);
app.use('/api', routes.api);

//temporary location for s3 upload route, refactor soon
app.use('/s3', require('react-dropzone-s3-uploader/s3router')({
  bucket: 'qraft-uploads',
  ACL: 'public-read'
}));

app.use('/graphql', expressGraphQL((request, response, graphQLParams) => ({schema: graphQLSchema, graphiql: !(process.env.NODE_ENV === 'production')})));

// Serve static files
app.get('*/bundle.js', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../public/dist/bundle.js'));
});
app.get('*/favicon.ico', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../public/dist/favicon.ico'));
});
app.get('*/manifest.json', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../public/dist/manifest.json'));
});
app.get('/*', (req, res) => {
  res.render('index', {user: req.user ? JSON.stringify(req.user) : JSON.stringify(null)});
});


module.exports = require('http').Server(app);