module.exports = function(app){

	var api = {}
	var jwt = require("jsonwebtoken");

	var usuarios = [{
						_id: 1,
						nome: 'Lukas',
						sobrenome: 'Camargo',
						email: 'lukas.fialho@gmail.com',
						senha: '1234',
						cpf: 'XXX-XXX-XXX-XX',
						rg: 'XX-XXX-XXX-X',
						enderecos : [{
							rua : 'Av. Chucri Zaidan, 1240',
							cidade: 'Sao Paulo',
							estado: 'SP',
							pais: 'Brasil'
						},
						{
							rua: 'Praia do Sul, 15',
							cidade: 'Sao Paulo',
							estado: 'SP',
							pais: 'Brasil'
						},
						{
							rua: 'Iacanga, 80',
							cidade: 'Cajamar',
							estado: 'SP',
							pais: 'Brasil'
						}]
					},
					{
						_id: 2,
						nome: 'Bart',
						sobrenome: 'Simpson',
						email: 'bart.simpson@gmail.com',
						senha: '12345',
						cpf: 'XXX-XXX-XXX-XX',
						rg: 'XX-XXX-XXX-X',
						enderecos : [{
							rua: 'Av. Santo Amaro, 2000',
							cidade: 'Springfield',
							estado: 'Oregon',
							pais: 'Estados Unidos da America'
						},
						{
							rua : 'Av. Chucri Zaidan, 1240',
							cidade: 'Sao Paulo',
							estado: 'SP',
							pais: 'Brasil'
						},
						{
							rua: 'Praia do Sul, 15',
							cidade: 'Sao Paulo',
							estado: 'SP',
							pais: 'Brasil'
						}]
					}];

	api.listaEnderecos = function(req, res){

		var result = {}

		for(i = 0;i < usuarios.length; i++){
			if(req.params.usid == usuarios[i]._id){
				result = usuarios[i];
				i = usuarios.length + 1;
			} else {
				console.log('Usuario não encontrado');
			}
		}

		if(!result){
			console.log('Não foi possivel encontrar o usuario');
			res.status(400);
		} else {
			res.status(200);
			res.json(result.enderecos);
		}
	};

	api.listaUsuario = function(req, res){

		var result = {}

		for(i = 0;i < usuarios.length; i++){
			if(req.params.usid == usuarios[i]._id){
				result = usuarios[i];
				i = usuarios.length + 1;
			} else {
				console.log('Usuario não encontrado');
			}
		}

		if(!result){
			console.log('Não foi possivel encontrar o usuario');
			res.status(400);
		} else {
			res.status(200);
			res.json(result);
		}
	};

	api.auth = function(req, res){

		var result = {};
		console.log('Procurando ' + req.body.email);
		for(i = 0; i < usuarios.length; i++){
			if(req.body.email == usuarios[i].email && req.body.senha == usuarios[i].senha){
				result = usuarios[i];
				disponibilizaToken(req, res, result);
				i = usuarios.length + 1;
			} 
		}

		if(!result){
			console.log('Usuario não encontrado');
			res.status(404);
		}


	};

	var disponibilizaToken = function(req, res, result){
		if(!result){
			console.log('Não foi possivel encontrar o usuario');
			res.status(400);
		} else {
			res.status(200);
			var userToken = jwt.sign(result, app.get('secret'), {expiresIn:28800});
			res.set('x-access-token', userToken);
			res.json({type: true, data: result});
			res.end();
		}
	};

	api.me = function (req, res, next) {
		var token = req.headers['x-access-token'];
			if(token){
				jwt.verify(token, app.set('secret'), function(err, decoded){
					if(err){
						console.log('Token rejeitado');
						res.status(401);
					} 
					req.usuario = decoded;
					next();
				});
			} else {
				res.status(401);
			}
	};

	return api;


}