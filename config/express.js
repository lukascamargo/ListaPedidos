var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var consign = require('consign');
var jwt = require('jsonwebtoken');

app.set('secret', 'sky.one');

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

consign({cwd: 'app'})
	.include('api')
	.then('routes/usuario.js')
	.then('routes')
	.into(app);

module.exports = app;

