angular
	.module('pedidos')
	.controller('PedidosController', function($scope, meusServicos, $http){
		$scope.usuario = meusServicos.usuario;
		$scope.mensagem = '';
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


		$scope.submeter = function(){
			if($scope.formulario.$valid){
				$http.post('/server/pedidos', $scope.pedido)
					.success(function(){
						$scope.mensagem = 'Pedido submetido com sucesso. Clique em voltar para visualizar na lista';
					})
					.error(function(error){
						console.log({erro: error});
						console.log('Conforme erro acima, não foi possível submeter pedido');
						$scope.mensagem = 'Não foi possível submeter pedido';
					})
			}
		}
	});