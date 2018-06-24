/**
* @ngdoc function
* @name falcon.controller.AdminCandidateDetailCtrl
* @description controller for Root model
* @author Ashish Mishra <ashishjpm@gmail.com>
*/

;
(function() {
 falcon
  .controller('AdminCandidateDetailCtrl', ['$scope', '$state', 'CommonService', 'AdminService', '$stateParams', '$timeout',
    function($scope, $state, CommonService, AdminService, $stateParams, $timeout) {
    $scope.candidateDetail = {};

    function init(){
    	$scope.root.admin.showAddBtn = false;
        $scope.root.adminSelected = "Candidate Details";
        $scope.candidateDetail.showDetail = false;
        $scope.candidateDetail.type = ['Naukri', 'Github', 'Linkedin'];
        $scope.candidateDetail.typeSelected = 'Naukri';
        $scope.candidateDetail.data = [];
        $scope.candidateDetail.loader = false;
        getCandidateDetails();
    }
    function getCandidateDetails() {
        AdminService.getCandidateDetails($stateParams.id).then(
            function(response){
                $scope.candidateDetail.data = response.data;
                $scope.candidateDetail.data.naukriProfileDto.skills = $scope.candidateDetail.data.naukriProfileDto.skills.split(',');
                $scope.candidateDetail.loader = false;
            },
            function(err){
                $scope.candidateDetail.loader = false;
            }
        );
    }

    init();

  }]);
}());
