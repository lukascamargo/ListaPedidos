angular
	.module('pedidos', ['ngRoute'])
	.config(function($routeProvider, $locationProvider){

		$locationProvider.html5Mode(true);

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
			.when('/pedidos/novo', {
				templateUrl: 'partials/novoPedido.html',
				controller: 'PedidosController'
			})
			.when('/dadosUsuario/:usid', {
				templateUrl: 'partials/dadosUsuario.html',
				controller: 'UsuarioController'
			});

	});