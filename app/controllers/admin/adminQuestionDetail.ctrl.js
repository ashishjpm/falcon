/**
* @ngdoc function
* @name falcon.controller.QuestionDetailCtrl
* @description controller for Root model
* @author Ashish Mishra <ashishjpm@gmail.com>
*/

;
(function() {
 falcon
    .controller('QuestionDetailCtrl', ['$scope', '$state' ,'CommonService', 'AdminService',
        function($scope, $state ,CommonService, AdminService) {
        $scope.adminQuestionDetails = {};

        function init(){
            $scope.root.admin.showAddBtn = true;
            $scope.root.adminSelected = "Question Details";
            $scope.adminQuestionDetails.typeList = ['SCQ','MCQ','Coding'];
            $scope.adminQuestionDetails.type = 'Coding';
            $scope.adminQuestionDetails.value = {}; 
            getQuestionDetails();           
        }

        function getQuestionDetails(){
            $scope.adminQuestionDetails.value = {};
            AdminService.getQuestionDetails(localStorage.getItem('questionId')).then(
                function(response){
                    $scope.adminQuestionDetails.value = response;
                },
                function(err){console.log(err);}
            );
        }

        $scope.adminQuestionDetails.backToList = function(){
            $state.go('admin.question');
        }

        init();
    }]);
}());
