/**
* @ngdoc function
* @name falcon.controller.QuestionCtrl
* @description controller for Root model
* @author Ashish Mishra <ashishjpm@gmail.com>
*/

;
(function() {
 falcon
    .controller('QuestionCtrl', ['$scope', '$state', 'CommonService', 'AdminService',
        function($scope, $state, CommonService, AdminService) {
        $scope.adminQuestion = {};

        function init(){
        	$scope.root.admin.showAddBtn = true;
        	$scope.root.adminSelected = "My Questions";
        	$scope.adminQuestion.type = ['All', 'MCQ', 'SCQ', 'Coding'];
        	$scope.adminQuestion.typeSelected = 'All';
            $scope.adminQuestion.list = [];
            updateQuestionList();
        }

        function updateQuestionList(){
            $scope.adminQuestion.list = [];
            AdminService.getAllQuestions().then(
                function(response){
                    $scope.adminQuestion.list = response.data.responseObject;
                },
                function(err){ console.log(err); }
            );
        }

        $scope.adminQuestion.getQuestionDetails = function(question){
            localStorage.setItem('questionId', question.id);
            $state.go('admin.questionDetail');
        }

        init();
    }]);
}());
