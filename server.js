var http = require('http');
var app = require('./config/express');

var porta = 3000;

http.createServer(app).listen(porta, function(){
	console.log('Servidor iniciado na porta: ' + porta);
})