/**
* @ngdoc function
* @name falcon.controller.AdminContestCreateCtrl
* @description controller for Root model
* @author Ashish Mishra <ashishjpm@gmail.com>
*/

;
(function() {
 falcon
  .controller('AdminContestCreateCtrl', ['$scope', '$state', '$timeout' ,'CommonService', 'AdminService',
    function($scope, $state,$timeout ,CommonService, AdminService) {
    $scope.contestCreate = {};

    function init(){
        $scope.root.admin.showAddBtn = false;
        $scope.contestCreate.currentState = 1;
        $scope.contestCreate.contestId = $scope.contestCreate.contestId;

        $scope.contestCreate.stepOne = {
            name: "",
            description: "",
            startDate: "",
            endDate: "",
            openContest: true,
            isTeamContest: false,
            status: "DRAFT",
            duration: 3600,
            type: "FIXED",
            maxTeamSize: 1
        };

        $scope.contestCreate.stepThree = {
            contestId : '',
            isRandomOrder: false,
            activateContest: false,
            invites : [{
                email : '1',
                contestId: '$scope.contestCreate.contestId'
            }]
        };

        $scope.contestCreate.fixedQueMeta = [
            {
                categoryName: null,
                difficultyLevel: "",
                type: "",
                questionCount: ""
            }
        ];

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        $scope.format = 'dd-MMMM-yyyy';
        
        $scope.contestCreate.selectedQuestions=[];
    }

    $scope.createContest = function(){
        $scope.contestCreate.stepOne.startDate = new Date($scope.contestCreate.stepOne.startDate).toISOString();
        $scope.contestCreate.stepOne.endDate = new Date($scope.contestCreate.stepOne.endDate).toISOString();
        $scope.contestCreate.stepOne.inviteeDTOs = [];
        $scope.contestCreate.stepOne.contestQuestionDTOs = [];
        AdminService.completeFirstStep($scope.contestCreate.stepOne).then(
        function(response){
            $scope.contestCreate.currentState += 1;
            $scope.contestCreate.contestId = response.data.responseObject.id;
        });
    }

    $scope.fetchQuestions = function(){
        var reqData = {
          "totalQuestions": 0,
          "questionCriteriaDTOs": []
        }
        $scope.contestCreate.fixedQueMeta.forEach(function(meta){
            if(meta.categoryName != null){
                reqData.totalQuestions += parseInt(meta.questionCount);
                reqData.questionCriteriaDTOs.push(meta);
            }
        });
        
        AdminService.fetchSelectedQuestions(reqData).then(
            function(response){
                $scope.contestCreate.selectedQuestions = response.data.responseObject;
                if($scope.contestCreate.selectedQuestions.length > 0){
                    var questions = [];
                    $scope.contestCreate.selectedQuestions.forEach(function(questions){
                        questions.forEach(function(question){
                            questions.push({
                                "contestId": $scope.contestCreate.contestId,
                                "negativePoints": question.negativePoints || 0,
                                "points": question.marks || 2,
                                "questionId": question.questionId,
                                "questionTitle": question.title
                            });
                        });
                    });
                    AdminService.completeSecondStep($scope.contestCreate.contestId, questions).then(function(response){
                        $scope.contestCreate.currentState += 1;
                    });
                }
            },
            function(err){

            }
        );
    }

    $scope.finalizeConfigurations = function(){
        AdminService.activateContest($scope.contestCreate.contestId).then(function(response){},function(err){})
        AdminService.saveContestConfigration($scope.contestCreate.contestId, $scope.contestCreate.stepThree).then(
            function(response){
                $scope.contestCreate.currentState += 1;
                $scope.contestCreate.backToList();
            },
            function(err){}
        );
    }
    $scope.fetchCategories = function(){
        AdminService.getCategories().then(
            function(response){
                $scope.contestCreate.categoryList = response.data.responseObject.map(function(item){return item.name});
            },
            function(err){

            }
        )
    }
    $scope.fetchCategories();
    $scope.submit = function(){
        console.log($scope.contestCreate.currentState);
        if($scope.contestCreate.currentState == 1){
            $scope.createContest();
        } else if($scope.contestCreate.currentState == 2){
            $scope.fetchQuestions();
        } else if($scope.contestCreate.currentState == 3){
            $scope.finalizeConfigurations();
        }
    }

    $scope.addCategory = function(){
        $scope.contestCreate.fixedQueMeta.push({
            categoryName: null,
            difficultyLevel: "",
            type: "",
            questionCount: ""
        });
    }

    $scope.removeCategory = function(index){
        $scope.contestCreate.fixedQueMeta.splice(index, 1);
    }

    $scope.addInvitee = function(){
        $scope.contestCreate.stepThree.inviteeDTOs.push({
            "contestId": $scope.contestCreate.contestId,
            email : ""
        });
    }

    $scope.removeInvitee = function(index){
        $scope.contestCreate.stepThree.inviteeDTOs.splice(index, 1);
    }


    $scope.contestCreate.backToList = function(){
    	$state.go('admin.contest');
    }

    init();
  }]);
}());
