angular
	.module('pedidos')
	.controller('PedidoController', function($scope, getUsuario, $http, $routeParams){
		$scope.usuario = getUsuario.usuario;
		$scope.mensagem = '';
		$scope.filtro = '';
		$scope.pedido = [];


		if($routeParams.pedidoid){
			$http.get('/server/pedido/' + $routeParams.pedidoid)
				.success(function(resultado){
					$scope.pedido = resultado;
				}).error(function(error){
					console.log(error);
					console.log('Conforme erro acima, não foi possível encontrar o Pedido');
					$scope.mensagem = 'Não foi possivel encontrar o pedido';
				})
		}

		$scope.submeterPedido = function(){
			if($scope.formulario.$valid){
				if($routeParams.pedidoid){

					$http.put('/server/pedido/' + $routeParams.pedidoid, $scope.pedido)
						.success(function(){
							$scope.mensagem = 'Pedido alterado. Volte para analisar';
						})
						.error(function(error){
							console.log(error);
							console.log('Conforme erro acima, não foi possível alterar o pedido');
							$scope.mensagem = 'Não foi possível alteraro  pedido';
						})

				} else {

					$scope.pedido.usid = $scope.usuario._id;
					var item = $scope.pedido
					console.log(item)
					$http.post('/server/pedidos', item)
						.success(function() {
							$scope.mensagem = 'Pedido submetido com sucesso. Clique em voltar para visualizar na lista';
							$scope.pedido = {};
						})
						.error(function(error){
							console.log(error);
							console.log('Conforme erro acima, não foi possível submeter pedido');
							$scope.mensagem = 'Não foi possível submeter pedido. ' + error;
						})

				}
				
			}
		}
	});