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
            $scope.adminQuestion.types = {"All":"All","SINGLE_CORRECT":"Single Choice Question","MULTIPLE_CORRECT":'Multiple Choice Question','CODING':'Programming Question'};
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
            $state.go('admin.questionDetail',{'id': question.questionId});
        }

        init();
    }]);
}());
