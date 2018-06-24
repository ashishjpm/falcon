/**
* @ngdoc function
* @name falcon.controller.QuestionCreateCtrl
* @description controller for Root model
* @author Ashish Mishra <ashishjpm@gmail.com>
*/

;
(function() {
 falcon
  .controller('QuestionCreateCtrl', ['$scope', '$state' ,'CommonService', 'AdminService',
    function($scope, $state ,CommonService, AdminService) {
    $scope.adminQuestionCreate = {};

    function init(){
      $scope.root.admin.showAddBtn = false;
      $scope.root.adminSelected = "Question Create";
      $scope.adminQuestionCreate.data = {};
      $scope.adminQuestionCreate.tc = {}
      $scope.adminQuestionCreate.tc.sample = false;
      $scope.adminQuestionCreate.testCaseDtos = [];
      $scope.adminQuestionCreate.categories = [];
      $scope.adminQuestionCreate.optionsInput = [];
      $scope.adminQuestionCreate.optionSelection = [false,false,false,false];
    }

    $scope.adminQuestionCreate.backToList = function(){
      $state.go('admin.question');
    }
    $scope.adminQuestionCreate.addTestCase = function(){
      $scope.adminQuestionCreate.testCaseDtos.push({
        "input": $scope.adminQuestionCreate.tc.input,
        "marks": $scope.adminQuestionCreate.tc.marks,
        "output": $scope.adminQuestionCreate.tc.output,
        "sample": $scope.adminQuestionCreate.tc.sample
      });
    } 
    $scope.adminQuestionCreate.submit = function(){ 
      $scope.adminQuestionCreate.data.customerId = 1001;
      $scope.adminQuestionCreate.data.categoryDtos = [];
      $scope.adminQuestionCreate.data.categoryDtos = $scope.adminQuestionCreate.categories.map((item) => ({"name": item}));  
      if($scope.adminQuestionCreate.data.type != 'CODING') {
       $scope.adminQuestionCreate.data.options = [];
       for(var i=0; i<4; i++) {
          $scope.adminQuestionCreate.data.options.push({
            "isCorrect": $scope.adminQuestionCreate.optionSelection == i,
            "order": i,
            "value": $scope.adminQuestionCreate.optionsInput[i]
          });
        }
      } else {
        $scope.adminQuestionCreate.data.testCaseDtos = $scope.adminQuestionCreate.testCaseDtos;
      }
      console.log("question ", $scope.adminQuestionCreate.data);
      // AdminService.createQuestion($scope.adminQuestionCreate.data).then(function(response){
      //   $state.go('admin.question');
      // }, function(err){})
    }
    $scope.adminQuestionCreate.categoryAdded = function() {
      $scope.adminQuestionCreate.categories.push($scope.adminQuestionCreate.currentCategory);
      $scope.adminQuestionCreate.currentCategory = "";
    }
    $scope.adminQuestionCreate.removeCategory = function(index) {
      $scope.adminQuestionCreate.categories.splice(index, 1);
    }

    init();
  }]);
}());

