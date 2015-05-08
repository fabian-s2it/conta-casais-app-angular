 var module = angular.module('app', ['onsen']);

    module.controller('TransactionsCtrl', function($scope, $http){

      $scope.page_title = "Transações";


      var API_LOCAL = 'http://127.0.0.1:2323/transactions/1';
      var API_REMOTE = 'http://104.131.60.142/transactions/1';

      console.log("Authorization Basic " + window.localStorage.getItem('token'));

      $http.get(
          API_REMOTE, {
            headers: {"Authorization": "Basic " + window.localStorage.getItem('token')}
        }).
        success(function(data, status, headers, config) {
          // this callback will be called asynchronously
          // when the response is available
          console.log('sucesso na transação');
          $scope.qty = data.length;
          $scope.transactions = data;
        }).
        error(function(data, status, headers, config) {
          console.log('Falha na transação');
          console.log(status);
          // called asynchronously if an error occurs
          // or server returns response with an error status.
      });

    });

    module.controller('BalanceCtrl', function($scope, $window){
      $scope.page_title = "Balanço";

    });

    module.controller('RegisterCtrl', function($scope, $http, $window){
      $scope.page_title = "Registro";

      $scope.username = '';
      $scope.password = '';
      $scope.email = '';


      $scope.register = function() {

        var API_USER_REGISTER_LOCAL = 'http://127.0.0.1:2323/user/';
        var API_USER_REGISTER_REMOTE = 'http://104.131.60.142/user/';

        $http.post(
            API_USER_REGISTER_REMOTE,
            {
              username: $scope.username,
              password: $scope.password,
              email: $scope.email
            }
          ).
          success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            console.log(data);
            var options = {
              animation: 'slide', // What animation to use
              onTransitionEnd: function() {},  // Called when finishing transition animation,
              username: $scope.username
            };
            window.localStorage.setItem("token", data.token);

            $scope.app_navigator.pushPage('page-register-success.html', options);
          }).
          error(function(data, status, headers, config) {
            console.log('Falha no registro');
            console.log(status);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
      }


    });    


    module.controller('RegisterSuccessCtrl', function($scope, $http){
      
      $scope.username = $scope.app_navigator.getCurrentPage().options.username;

      $scope.register_success = function() {
        $scope.app_navigator.pushPage('page-main.html');
      }

    }); 

    module.controller('MainCtrl', function($scope){
      $scope.page_title = "DINHEIRAMA";

      $scope.vibrar = function(ms) {
        console.log('vibrar');
        navigator.notification.vibrate(ms);  
      }

      $scope.notificar = function() {
        alert('Notificando!');
      }

      $scope.push = function() {
        $scope.app_navigator.pushPage('page-balance.html');
      }

      
    });

    module.controller('LoginCtrl', function($scope){
      $scope.page_title = "DINHEIRAMA";

      $scope.vibrar = function(ms) {
        console.log('vibrar');
        navigator.notification.vibrate(ms);  
      }

      $scope.notificar = function() {
        alert('Notificando!');
      }

      $scope.push = function() {
        $scope.app_navigator.pushPage('page-balance.html');
      }

      
    });

