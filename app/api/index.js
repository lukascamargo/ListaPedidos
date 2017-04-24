var api = {}

var pedidos = [
				{
					_id: 1,
					usid: 1,
					titulo: 'TV de 50',
					descricao: 'Essa é uma TV da Samsung muito boa',
					url: 'http://www.buyondubai.com/template/images/products/medium/14416860251441686012_50J5500%20samsung%201.jpg'
				},
				{
					_id: 2,
					usid: 1,
					titulo: 'Notebook Dell Latitude',
					descricao: 'Notebook com 8GB de RAM, Processador i7, com HD de 500GB e SSD de 120GB, GEFORE com memória dedicada de 2GB',
					url: 'https://c.mlcdn.com.br//410x308/135234600.jpg'
				},
				{
					_id: 1,
					usid: 2,
					titulo: 'TV de 50',
					descricao: 'Essa é uma TV da Samsung muito boa',
					url: 'http://www.buyondubai.com/template/images/products/medium/14416860251441686012_50J5500%20samsung%201.jpg'
				},
				{
					_id: 2,
					usid: 2,
					titulo: 'Notebook Dell Latitude',
					descricao: 'Notebook com 8GB de RAM, Processador i7, com HD de 500GB e SSD de 120GB, GEFORE com memória dedicada de 2GB',
					url: 'https://c.mlcdn.com.br//410x308/135234600.jpg'
				}];


api.adicionaPedido = function(req, res){
	console.log(req.body);

	if(req.body.titulo == undefined){
		console.log('Não foi possível identificar nenhum dado');
		res.sendStatus(500);
	} else {
		novoId = pedidos.length;
		item = req.body;
		item._id = novoId;
		pedidos.push(item);
		res.json({erro: 'Pedido submetido com sucesso'});
		res.status(200);
	}

};


api.listaPedidos = function(req, res){

	var resultado = [];

	for(i = 0; i < pedidos.length; i++){
		if(pedidos[i].usid == req.params.usid){
			resultado.push(pedidos[i]);
		}
	}

	if(!resultado){
		console.log('Não foi possível encontrar pediddo');
		res.json(404);
	} else {
		res.json(resultado);
		res.status(200);
	}

};

api.mudaPedido = function(req, res){

	var escolhido = {};

	for(i = 0; i < pedidos.length; i++){
		if(pedidos[i]._id == req.params.pedidoid){
			escolhido = pedidos[i];
			pedidos[i] = alterarPedido(req, res, escolhido);
		}
	}

	if(!escolhido){
		console.log('Não foi possível encontrar pedido');
		res.json({erro: 'Não foi possível encontrar pedido'});
		res.status(404);
	}

};

var alterarPedido = function(req, res, escolhido){

	if(!escolhido){
		console.log('Não foi possível encontrar pediddo');
		res.status(404);
	} else {
		escolhido.titulo = req.body.titulo;
		escolhido.url = req.body.url;
		escolhido.descricao = req.body.descricao;
		res.json(escolhido);
		res.status(201);
		return escolhido;
	}


}

api.buscaPedido = function(req, res){
	var resultado = {};

	for(i = 0; i < pedidos.length; i++){
		if(pedidos[i]._id == req.params.pedidoid){
			resultado = pedidos[i];
		}
	}

	if(!resultado){
		console.log('Não foi possível encontrar pediddo');
		res.json(404);
	} else {
		res.json(resultado);
		res.status(200);
	}

};

module.exports = api;