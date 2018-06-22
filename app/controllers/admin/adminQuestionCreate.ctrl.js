/**
* @ngdoc function
* @name falcon.controller.QuestionCreateCtrl
* @description controller for Root model
* @author Ashish Mishra <ashishjpm@gmail.com>
*/

;
(function() {
 falcon
    .controller('QuestionCreateCtrl', ['$scope', '$state' ,'CommonService',
        function($scope, $state ,CommonService) {
        $scope.adminQuestionCreate = {};

        function init(){
            $scope.root.admin.showAddBtn = false;
            $scope.root.adminSelected = "Question Create";
        }

        $scope.adminQuestionCreate.backToList = function(){
            $state.go('admin.question');
        }

        init();
    }]);
}());

