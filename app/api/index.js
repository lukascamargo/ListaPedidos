var api = {}

var pedidos = [
				{
					_id: 1,
					usid: 1,
					nome: 'TV de 50',
					descricao: 'Essa é uma TV da Samsung muito boa'
				},
				{
					_id: 2,
					usid: 1,
					nome: 'Notebook Dell Latitude',
					descricao: 'Notebook com 8GB de RAM, Processador i7, com HD de 500GB e SSD de 120GB, GEFORE com memória dedicada de 2GB'
				}];


api.adicionaPedido = function(req, res){

	if(!req.body){
		console.log('Não foi possível identificar nenhum dado');
	} else {
		pedidos.push(req.body);
	}

};


api.listaPedidos = function(req, res){

	res.json(pedidos);

};

module.exports = api;