/**
* @ngdoc function
* @name falcon.controller.AdminCandidateListCtrl
* @description controller for Root model
* @author Ashish Mishra <ashishjpm@gmail.com>
*/

;
(function() {
 falcon
  .controller('AdminCandidateListCtrl', ['$scope', '$state', 'CommonService', 'AdminService', '$stateParams', '$timeout',
    function($scope, $state, CommonService, AdminService, $stateParams, $timeout) {
    $scope.candidate = {};

    function init(){
    	$scope.root.admin.showAddBtn = false;
        $scope.root.adminSelected = "Job Openings";
        $scope.candidate.list = [];
        $scope.candidate.loader = true;
        $scope.candidate.showSubmit = false;
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
                $timeout(function(){$.material.init();},0);
                $scope.candidate.selected = $scope.candidate.list.map(item => false);
            },
            function(err){
                $scope.candidate.loader = false;
            }
        );
    }

    $scope.candidate.checkboxClick = function() {
        $timeout(function(){
            $scope.candidate.showSubmit = $scope.candidate.selected.reduce((accumulator, currentValue) => (accumulator || currentValue));
        },0);
    }

    $scope.candidate.submitSelected = function() {
        $scope.candidate.selectedList = [];
        for (var i = 0; i < $scope.candidate.list.length; i++) {
            if($scope.candidate.selected[i]) {
                $scope.candidate.selectedList.push($scope.candidate.list[i].id)
            }
        }
        AdminService.submitSelectedCandidate($scope.candidate.selectedList, $stateParams.id).then(function(response){
            $state.go('admin.selectedCandidates', {"id": $stateParams.id});
        },function(err){

        })
    }

    init();

  }]);
}());
