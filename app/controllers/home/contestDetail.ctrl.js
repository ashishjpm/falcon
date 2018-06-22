/**
* @ngdoc function
* @name falcon.controller.ContestDetailCtrl
* @description controller for Root model
* @author Ashish Mishra <ashishjpm@gmail.com>
*/

;
(function() {
 falcon
    .controller('ContestDetailCtrl', ['$scope', '$state' ,'CommonService', 'UserService',
    	function($scope, $state ,CommonService, UserService) {
        $scope.root.user.activeContestId = window.localStorage.getItem('contestId');
        $scope.contestDetail = {};

    	function init(){
            $scope.root.userSelected = "Contest Details";
            $scope.contestDetail.title = "this is title";
            $scope.contestDetail.details = [];
            getContestDetail();
    	}

        function getContestDetail(){
            UserService.getContestDetail(localStorage.getItem('contestId')).then(
                function(response){
                    $scope.contestDetail.details = response.data.responseObject;
                    $scope.contestDetail.details.startDate = CommonService.tsToDateString($scope.contestDetail.details.startDate);
                    $scope.contestDetail.details.endDate = CommonService.tsToDateString($scope.contestDetail.details.endDate);
                },
                function(err){
                    $scope.contestDetail.details = [];
                }
            );
        }

        $scope.attemptContest = function(){
            $state.go('home.contestAttempt');
        }
        init();
    }]);
}());
