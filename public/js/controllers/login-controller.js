angular
	.module('pedidos')
	.controller('LoginController', function($scope, $http, $location, $window){
		$scope.user = {};
		$scope.usuario = {};
		$scope.mensagem = '';


		$scope.autenticar = function(){
			var user = $scope.user;
			$scope.mensagem = 'Localizando usuario...';

			$http.post('/server/auth', {email: user.email, senha: user.senha})
				.success(function(retorno){
					$scope.usuario = retorno;
					$location.path('/pedidos/' + $scope.usuario._id);
					$window.location.reload();
				}, function(err){
					$scope.mensagem = 'Não foi possível realizar o login. Verifique email e senha';
					$scope.user = {};
					console.log(err);
				})
		}
	})
