module.exports = function(app){

	var api = app.api.index;

	app.route('/server/pedidos/:usid')
		.get(api.listaPedidos);

	app.route('/server/pedidos')
		.post(api.adicionaPedido);

}