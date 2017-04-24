angular
	.module('pedidos')
	.controller('PedidosController', function($scope, getUsuario, $http, $routeParams){
		$scope.usuario = getUsuario.usuario;
		$scope.mensagem = '';
		$scope.filtro = '';
		$scope.pedidos = [];

		$http.get('/server/pedidos/' + $routeParams.usid)
			.success(function(pedidos){
				if(!pedidos){
					console.log('Não foi possível encontrar pedidos');
					$scope.mensagem = 'Não foi possível encontrar pedidos';
				} else {
					$scope.pedidos = pedidos;
				}
			}).error(function(erro){
				console.log({erro: erro});
				console.log('Conforme erro, não foi possivel encontrar os pedidos');
				$scope.mensagem = 'Não foi possível encontrar pedidos';
			})

	});