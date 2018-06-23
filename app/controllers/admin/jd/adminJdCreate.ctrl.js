/**
* @ngdoc function
* @name falcon.controller.AdminJdCreateCtrl
* @description controller for Root model
* @author Ashish Mishra <ashishjpm@gmail.com>
*/

;
(function() {
 falcon
  .controller('AdminJdCreateCtrl', ['$scope', '$state' ,'CommonService', 'AdminService',
    function($scope, $state ,CommonService, AdminService) {
    $scope.adminJdCreate = {};

    function init(){
      $scope.root.admin.showAddBtn = false;
      $scope.root.adminSelected = "Jd Create";
      $scope.adminJdCreate.data = {};
      $scope.adminJdCreate.data.skills = [];
      $scope.adminJdCreate.data.tags = [];
      $scope.adminJdCreate.data.noticePeriod = 'Any';
    }
    $scope.adminJdCreate.skillsAdded = function() {
      $scope.adminJdCreate.data.skills.push($scope.adminJdCreate.currentSkill);
      $scope.adminJdCreate.currentSkill = "";
    }
    $scope.adminJdCreate.removeSkill = function(index) {
      $scope.adminJdCreate.data.skills.splice(index, 1);
    }
    $scope.adminJdCreate.submit = function(){
      AdminService.createJdList($scope.adminJdCreate.data).then(
        function(response) {
          swal("Success!", "Job description has been created", "success");
          $state.go('admin.jd');
        },
        function(err) {
          swal("Error!", "Please try again!", "error");
        }
      );
    }        
    $scope.adminJdCreate.backToList = function(){
      $state.go('admin.jd');
    }
    init();
  }]);
}());

