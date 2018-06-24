/**
* @ngdoc function
* @name falcon.controller.LoginCtrl
* @description controller for Root model
* @author Ashish Mishra <ashishjpm@gmail.com>
*/

;
(function() {
 falcon
    .controller('LoginCtrl', ['$scope', '$state', 'CommonService', 'LoginService',
        function($scope, $state, CommonService, LoginService) {
        $scope.login = {};
        $scope.user
        function init(){
        	$scope.login.username = '';
        	$scope.login.password = '';
        	$scope.login.err = {};
        }

        $scope.login.submit = function(){
        	// LoginService.postLogin($scope.login.username, $scope.login.password);
//        	.then(
//        		function(response){
//        			if(response.success){
//        				$state.go("home.contestList");
//        			}
//        		},
//        		function(err){
//        			console.log(err);
//        		}
//    		);
            myStorage = window.localStorage;
            if ($scope.login.username === 'admin') {
                myStorage.setItem('userId', '5');
                $scope.root.activeUser = '5';
                $state.go('admin.contest');
            } else {
                myStorage.setItem('userId', '1');
                $scope.root.activeUser = '1';
                $state.go('home.contestList');
            }
        }

        init();
    }]);
}());
