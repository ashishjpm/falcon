/**
* @ngdoc function
* @name falcon.controller.AdminCandidateListCtrl
* @description controller for Root model
* @author Ashish Mishra <ashishjpm@gmail.com>
*/

;
(function() {
 falcon
  .controller('AdminCandidateListCtrl', ['$scope', '$state', 'CommonService', 'AdminService', '$stateParams',
    function($scope, $state, CommonService, AdminService, $stateParams) {
    $scope.candidate = {};

    function init(){
    	$scope.root.admin.showAddBtn = false;
        $scope.root.adminSelected = "Job Openings";
        $scope.candidate.list = [];
        $scope.candidate.loader = true;
        getCandidateList();
    }
    $scope.candidate.backToList = function() {
        $state.go('admin.jdDetail', {"id": $stateParams.id});
    }
    function getCandidateList(){
        AdminService.getCandidateList($stateParams.id).then(
            function(response){
                $scope.candidate.list = response.data.responseObject.candidates;
                $scope.candidate.loader = false;
            },
            function(err){
                $scope.candidate.loader = false;
            }
        );
    }

    init();

  }]);
}());
