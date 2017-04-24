angular
	.module('pedidos')
	.controller('UsuarioController', function($scope, getUsuario, $http, $routeParams){
		$scope.usuario = getUsuario.usuario;
		$scope.mensagem = '';
		$scope.filtro = '';
		$scope.enderecos = $scope.usuario.enderecos;

		
	});