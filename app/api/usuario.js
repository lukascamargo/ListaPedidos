module.exports = function(app){

	var api = {}
	var jwt = require("jsonwebtoken");

	var usuarios = [{
						_id: 1,
						nome: 'Lukas',
						sobrenome: 'Camargo',
						email: 'lukas.fialho@gmail.com',
						senha: '1234',
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
						}]
					},
					{
						_id: 2,
						nome: 'Bart',
						sobrenome: 'Simpson',
						email: 'bart.simpson@gmail.com',
						senha: '12345',
						enderecos : [{
							rua: 'Av. Santo Amaro, 2000',
							cidade: 'Springfield',
							estado: 'Oregon',
							pais: 'Estados Unidos da America'
						}]
					}];

	api.listaEnderecos = function(req, res){

		var result = usuarios.filter(function(user){
			return user.id == req.params.usid;
		})

		if(!result){
			console.log('Não foi possivel encontrar o usuario');
			res.status(400);
		} else {
			res.status(200);
			res.json(result.enderecos);
		}
	};

	api.listaUsuario = function(req, res){

		var result = usuarios.filter(function(user){
			return user.id == req.params.usid;
		})

		if(!result){
			console.log('Não foi possivel encontrar o usuario');
			res.status(400);
		} else {
			res.status(200);
			res.json(result);
		}
	};

	api.auth = function(req, res){

		var result = usuarios.filter(function(user){
			return user.id == req.body.email && user.senha == req.body.senha;
		})

		if(!result){
			console.log('Não foi possivel encontrar o usuario');
			res.status(400);
		} else {
			res.status(200);
			console.log(result);
			var userToken = jwt.sign(result, app.get('secret'), {expiresIn:28800});
			res.set('x-access-token', userToken);
			res.json({type: true, data: result});
			res.end();
		}


	};

	api.me = function (req, res) {
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
				console.log('Token não foi enviado');
				res.sendStatus(401);
			}
	};

	return api;


}