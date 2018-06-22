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
                email : ''
            }]
        };

        $scope.contestCreate.fixedQueMeta = [
            {
                category: null,
                level: "",
                number: "",
            }
        ];

        $scope.contestCreate.selectedQuestions=[];
    }

    $scope.createContest = function(){
        $scope.contestCreate.stepOne.startDate = new Date($scope.contestCreate.stepOne.startDate).toISOString();
        $scope.contestCreate.stepOne.endDate = new Date($scope.contestCreate.stepOne.endDate).toISOString();
        AdminService.completeFirstStep($scope.contestCreate.stepOne).then(
        function(response){
            $scope.contestCreate.currentState += 1;
            $scope.contestCreate.contestId = response.data.responseObject.id;
        });
    }

    $scope.fetchQuestions = function(){
        AdminService.fetchContestQuestions().then(function(response){
                $scope.contestCreate.selectedQuestions = response.data.responseObject;
                console.log($scope.contestCreate.selectedQuestions);
                if($scope.contestCreate.selectedQuestions.length > 0){
                    var questions = [];
                    $scope.contestCreate.selectedQuestions.forEach(function(question){
                        question.contestId = $scope.contestCreate.contestId;
                        questions.push({
                            "contestId": $scope.contestCreate.contestId,
                            "negativePoints": question.negativePoints || 0,
                            "points": question.marks || 1,
                            "questionId": question.questionId,
                            "questionTitle": question.title
                        });
                    });
                    AdminService.completeSecondStep($scope.contestCreate.contestId, questions).then(function(response){
                        console.log(response);
                        $scope.contestCreate.currentState += 1;
                    });
                }
            },
            function(err){

            }
        );
    }

    $scope.finalizeConfigurations = function(){
        AdminService.saveContestConfigration($scope.contestCreate.contestId, $scope.contestCreate.stepThree).then(
            function(response){
                $scope.contestCreate.currentState += 1;
                $scope.contestCreate.backToList();
            },
            function(err){

            }
        );
    }
    $scope.fetchCategories = function(){
        AdminService.getCategories().then(
            function(response){
                $scope.contestCreate.categoryList = response.data.responseObject;
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
            category: null,
            level: "",
            number: "",
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
