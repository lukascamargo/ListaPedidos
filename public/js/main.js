angular
	.module('pedidos', ['ngRoute','angular-jwt'])
	.config(function($routeProvider, $locationProvider, $httpProvider, jwtOptionsProvider){

		$httpProvider.interceptors.push('tokenInterceptor');

		$routeProvider
			.when('/', {
				templateUrl: 'partials/login.html',
				controller: 'LoginController'
			})
			.when('/enderecos/:usid', {
				templateUrl: 'partials/enderecos.html',
				controller: 'UsuarioController'
			})
			.when('/pedidos/:usid', {
				templateUrl: 'partials/pedidos.html',
				controller: 'PedidosController'
			})
			.when('/pedido/novo', {
				templateUrl: 'partials/novoPedido.html',
				controller: 'PedidoController'
			})
			.when('/pedido/editar/:pedidoid',{
				templateUrl: 'partials/novoPedido.html',
				controller: 'PedidoController'
			})
			.when('/dadosUsuario/:usid', {
				templateUrl: 'partials/dadosUsuario.html',
				controller: 'UsuarioController'
			});

	});