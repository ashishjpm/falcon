/**
* @ngdoc function
* @name falcon.controller.ContestResultCtrl
* @description controller for Root model
* @author Ashish Mishra <ashishjpm@gmail.com>
*/

;
(function() {
 falcon
    .controller('ContestResultCtrl', ['$scope', 'CommonService',
    	function($scope, CommonService) {
    	$scope.contestResult = {};

    	function init(){
            $scope.root.userSelected = "Contest Result";
            getContestResult();
    	}

        function getContestResult(){
            //send api via $scope.root.user.currentContestDetail;
        }

        init();
    }]);
}());
