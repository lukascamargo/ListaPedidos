angular
	.module('pedidos')
		.service('getUsuario', function($window, jwtHelper){
			var usuario = {};
			if($window.localStorage.token){
				var token = $window.localStorage.token;
				var user = jwtHelper.decodeToken(token);
				usuario = result._doc;

				return {
					usuario : usuario
				};
			}
		})