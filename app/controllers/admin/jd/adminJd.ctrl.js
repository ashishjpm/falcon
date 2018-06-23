/**
* @ngdoc function
* @name falcon.controller.AdminJdCtrl
* @description controller for Root model
* @author Ashish Mishra <ashishjpm@gmail.com>
*/

;
(function() {
 falcon
  .controller('AdminJdCtrl', ['$scope', '$state', 'CommonService', 'AdminService',
    function($scope, $state, CommonService, AdminService) {
    $scope.jd = {};

    function init(){
    	$scope.root.admin.showAddBtn = true;
        $scope.root.adminSelected = "Job Openings";
    	$scope.jd.type = ['All', 'Product Manager', 'UI Developer', 'Backend Developer', 'Dev-Ops'];
    	$scope.jd.typeSelected = 'All';
        $scope.jd.list = [];
        updateJdList();
    }
    $scope.jd.cardClick = function(id) {
        $state.go('admin.jdDetail', {"id": id});
    }

    function updateJdList(){
        AdminService.getJdList().then(
            function(response){
                $scope.jd.list = response.data.responseObject.content;
            },
            function(err){
                console.log(err);
            }
        );
    }

    init();

  }]);
}());
