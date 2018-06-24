/**
* @ngdoc function
* @name falcon.controller.AdminselectedCandidatesCtrl
* @description controller for Root model
* @author Ashish Mishra <ashishjpm@gmail.com>
*/

;
(function() {
 falcon
  .controller('AdminselectedCandidatesCtrl', ['$scope', '$state', 'CommonService', 'AdminService', '$stateParams', '$timeout',
    function($scope, $state, CommonService, AdminService, $stateParams, $timeout) {
    $scope.selectedCandidate = {};

    function init(){
    	$scope.root.admin.showAddBtn = false;
        $scope.root.adminSelected = "Selected Candidates";
        $scope.selectedCandidate.list = [];
        $scope.selectedCandidate.loader = true;
        getSelectedCandidateList();
        $scope.selectedCandidate.stageMap = {
            "TEST_SENT": "Test Sent",
            "INTERVIEW": "Interview",
            "INIT": "No action taken",
            "EVALUATION": "Evaluation"
        }
        $scope.selectedCandidate.statusMap = {
            "INVITED": "Invited",
            "PARTICIPATED": "Patticipated"
        }
    }
    $scope.selectedCandidate.backToList = function() {
        $state.go('admin.jdDetail', {"id": $stateParams.id});
    }
    function getSelectedCandidateList(){
        AdminService.getSelectedCandidateList($stateParams.id).then(
            function(response){
                $scope.selectedCandidate.list = response.data.responseObject.candidates;
                $scope.selectedCandidate.loader = false;
            },
            function(err){
                $scope.selectedCandidate.loader = false;
            }
        );
    }
    $scope.selectedCandidate.reject = function(candidateId) {
        $scope.selectedCandidate.loader = true;
        AdminService.rejectCandidate($stateParams.id, candidateId).then(
            function(response){
                getSelectedCandidateList();
            }, function(err){});
    }
    $scope.selectedCandidate.action = function(candidateId, actionName) {
        $scope.selectedCandidate.loader = true;
        AdminService.candidateAction($stateParams.id, candidateId, actionName).then(
            function(response){
                getSelectedCandidateList();
            }, function(err){});
    }
    $scope.selectedCandidate.detail = function(id) {
        $state.go('admin.candidateDetail',{"id": id});
    }

    init();

  }]);
}());
