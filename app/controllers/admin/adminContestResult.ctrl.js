/**
* @ngdoc function
* @name falcon.controller.ContestResultCtrl
* @description controller for Root model
* @author Ashish Mishra <ashishjpm@gmail.com>
*/

;
(function() {
 falcon
    .controller('ContestResultCtrl', ['$scope', '$state' ,'CommonService', 'AdminService',
        function($scope, $state ,CommonService, AdminService) {
        $scope.contestResult = {};

        function init(){
            $scope.root.admin.showAddBtn = false;
            $scope.root.adminSelected = "Contest Result";
            $scope.contestResult.data = {};
            getContestResult();           
        }

        function getContestResult(){
            $scope.contestResult.data = {};
            AdminService.getContestResult(localStorage.getItem('contestId')).then(
                function(response){
                    $scope.contestResult.data = response;
                },
                function(err){console.log(err);}
            );
        }

        init();
    }]);
}());
