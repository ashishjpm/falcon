/**
* @ngdoc function
* @name falcon.controller.AdminJdDetailCtrl
* @description controller for Root model
* @author Ashish Mishra <ashishjpm@gmail.com>
*/

;
(function() {
 falcon
  .controller('AdminJdDetailCtrl', ['$scope', '$state', '$stateParams', 'CommonService', 'AdminService',
    function($scope, $state, $stateParams, CommonService, AdminService) {
    $scope.adminJdDetail = {};

    function init(){
      $scope.root.admin.showAddBtn = false;
      $scope.root.adminSelected = "Jd Detail";
      $scope.adminJdDetail.data = {};
      getJdDetails()
    }

    function getJdDetails() {
      AdminService.getJdDetail($stateParams.id).then(
        function(response) {
          $scope.adminJdDetail.data = response.data.responseObject;
        }, 
        function(err) {})
    }

    $scope.adminJdDetail.backToList = function() {
      $state.go('admin.jd');
    }

    init();
  }]);
}());

