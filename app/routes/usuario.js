module.exports = function(app){

	var api = app.api.usuario;

	app.route('/server/auth')
		.post(api.auth);


	app.use('/*', api.me); //TODAS as rotas serão verificadas pelo api.me, menos a api.auth que está acima dela.

	app.get('/server/enderecos/:usid', api.listaEnderecos);

	app.get('/server/usuario/:usid', api.listaUsuario);

}