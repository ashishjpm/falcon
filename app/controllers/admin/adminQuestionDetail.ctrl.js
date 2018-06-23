/**
* @ngdoc function
* @name falcon.controller.QuestionDetailCtrl
* @description controller for Root model
* @author Ashish Mishra <ashishjpm@gmail.com>
*/

;
(function() {
 falcon
    .controller('QuestionDetailCtrl', ['$scope', '$state' ,'CommonService', 'AdminService', '$stateParams',
        function($scope, $state ,CommonService, AdminService, $stateParams) {
        
        $scope.adminQuestion = {};

        function init(){
            $scope.root.admin.showAddBtn = true;
            $scope.root.adminSelected = "Question Details";
            $scope.questionTypes = {"All":"All","SINGLE_CORRECT":"Single Choice Question","MULTIPLE_CORRECT":'Multiple Choice Question','CODING':'Programming Question'};
            getQuestionDetails();           
        }

        function getQuestionDetails(){
            AdminService.getQuestionDetails($stateParams.id).then(
                function(response){
                    $scope.adminQuestion.data = response.data.responseObject;
                },
                function(err){
                    console.log(err);   
                }
            );
        }

        $scope.adminQuestion.backToList = function(){
            $state.go('admin.question');
        }

        init();
    }]);
}());
