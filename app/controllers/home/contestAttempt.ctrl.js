/**
* @ngdoc function
* @name falcon.controller.ContestAttemptCtrl
* @description controller for Root model
* @author Ashish Mishra <ashishjpm@gmail.com>
*/

;
(function() {
 falcon
    .controller('ContestAttemptCtrl', ['$scope', '$state' ,'$timeout','CommonService', 'UserService',
    	function($scope, $state, $timeout, CommonService, UserService) {
        $scope.root.activeUser = window.localStorage.getItem('userId');
        $scope.root.candidateUser = window.localStorage.getItem('candidateId');
        $scope.root.activeContestId = window.localStorage.getItem('contestId');
        $scope.contestAttempt = {};

        function init(){
            $scope.root.userSelected = "Ongoing Contest";
            $scope.contestAttempt.loader = false;
            $scope.contestAttempt.langData = [];
            $scope.contestAttempt.testCaseResults=[];
            $scope.contestAttempt.activeQuestion = {
            	'inProgress' : false,
            	'attempted' : false,
            	'unAttempted' : true
            }
            $scope.contestAttempt.langData = [];
            $scope.contestAttempt.currentQue = {};
            getLang();
            getQueDetails();
            $timeout(function() {
                $(document).ready(function(){
                    $.material.init();
                });
            }, 0);
    	}

        function getLang(){
            UserService.getLanguage().then(
                function(response){
                    $scope.contestAttempt.langData = response.data.responseObject;
                },
                function(err){console.log(err);}
            );
        }

        function getQueDetails(){
            UserService.getContestQuestions($scope.root.activeContestId).then(
                function(response){
                    $scope.contestAttempt.queDetails = response.data.responseObject.contestQuestionDTOs;
                    $scope.contestAttempt.currentIndex = 0;
                    $scope.contestAttempt.currentQue = $scope.contestAttempt.queDetails[$scope.contestAttempt.currentIndex];
                    $timeout(function() {
                        $(document).ready(function(){
                            $.material.init();
                        });
                    }, 0);
                    updateQuestionStatus($scope.contestAttempt.currentQue, 'inProgress');
                },
                function(err){console.log(err);}
            );
        }

        $scope.contestAttempt.updateQue = function(question, index){
            console.log(question);
            $scope.contestAttempt.currentQue = question;
            $scope.contestAttempt.currentIndex = index;
            $timeout(function() {
                $(document).ready(function(){
                    $.material.init();
                });
                updateQuestionStatus($scope.contestAttempt.currentQue, 'inProgress');
            }, 0);
        }

    	function getOngoingAttemptList(){
    		$scope.contestAttempt.list = [];
    		UserService.getContestDetail($scope.root.user.activeContestId).then(
    			function(response){
    				$scope.contestAttempt.list = response.data.responseObject.contestQuestionDTOs;
    			},
    			function(err){
                    console.log(err);
    			}
    		);
    	}

        $scope.contestAttempt.finishTest=function(){
            UserService.finishContest(localStorage.getItem('userId'), localStorage.getItem('candidateId'), localStorage.getItem('contestId')).then(
                function(response){},
                function(err){console.log(err);}
            );
            $state.go('home.contestList');
        }

        $scope.contestAttempt.attempt = function(){
            UserService.attemptContest(localStorage.getItem('userId'), localStorage.getItem('candidateId'), localStorage.getItem('contestId')).then(
                function(response){},
                function(err){console.log(err);}
            );
        };

        $scope.testCode = function(){
            $scope.contestAttempt.loader = true;
            var code = myCodeMirror.getValue();
            var language = $scope.contestAttempt.language;
            var questionId = $scope.contestAttempt.currentQue.questionId;
            $scope.contestAttempt.testCaseResults=[];
            UserService.testCode(language, questionId, code).then(function (response) {
                $scope.contestAttempt.loader = false;
                $scope.contestAttempt.testCaseResults = response.data.responseObject;
            },function(err){$scope.contestAttempt.loader = false;})
        };

        $scope.submitCode = function(){
            var userId = $scope.root.activeUser;
            var candidateId = $scope.root.candidateUser;
            var code = myCodeMirror.getValue();
            var language = $scope.contestAttempt.language;
            var questionId = $scope.contestAttempt.currentQue.questionId;
            var contestId = $scope.contestAttempt.currentQue.contestId;
            $scope.contestAttempt.loader = true;
            UserService.submitCode(userId, candidateId, contestId, language, questionId, code).then(
                function (response) {
                    updateQuestionStatus($scope.contestAttempt.currentQue, 'attempted');
                    if($scope.contestAttempt.queDetails.length > $scope.contestAttempt.currentIndex + 1){
                        $scope.contestAttempt.currentIndex = $scope.contestAttempt.currentIndex + 1;
                        $scope.contestAttempt.currentQue = $scope.contestAttempt.queDetails[$scope.contestAttempt.currentIndex];
                        updateQuestionStatus($scope.contestAttempt.currentQue, 'inProgress');
                    }
                    $scope.contestAttempt.loader = false;
                },
                function(err){
                    $scope.contestAttempt.loader = false;
                }
            )
        };
        
        var updateQuestionStatus = function (currentQue, stage){
            if(currentQue){
                $scope.contestAttempt.queDetails.forEach(function(question){
                    if(stage == 'inProgress' && question.inProgress){
                        question.inProgress = false;
                    }
                });
                $scope.contestAttempt.queDetails.forEach(function(question){
                    if(question.id == currentQue.id && !question.attempted){
                        question.inProgress = false;
                        question[stage]=true;
                    }
                });
            }
        };

        $scope.submitOptions = function(){            
            if(!$scope.contestAttempt.selectedQuestion){
                return;
            }
            var options = [];
            var data = $scope.contestAttempt.selectedQuestion[$scope.contestAttempt.currentQue.questionId];
            Object.keys(data).forEach(function(key,index) {
                if($scope.contestAttempt.currentQue.questionType == 'MULTIPLE_CORRECT'){
                    if(data[key]){
                        options.push(parseInt(key));
                    }
                } else {
                    options.push(parseInt(data[key]));
                }
            });
            
            var reqBody = [{
                "userId" :  $scope.root.activeUser,
                "candidateId" : $scope.root.candidateUser,
                "contestId": $scope.root.activeContestId,
                "answerGiven": options,
                "questionId": $scope.contestAttempt.currentQue.questionId,
                "timeTaken": 0,
                "marks": $scope.contestAttempt.currentQue.points,
                "negativeMarks": $scope.contestAttempt.currentQue.negativePoints,
                "questionType": $scope.contestAttempt.currentQue.type
            }];
            UserService.submitOptions(reqBody,$scope.contestAttempt.currentQue.questionId).then(
                function(response){
                    updateQuestionStatus($scope.contestAttempt.currentQue, 'attempted');

                    if($scope.contestAttempt.queDetails.length > $scope.contestAttempt.currentIndex + 1){
                        $scope.contestAttempt.currentIndex = $scope.contestAttempt.currentIndex + 1;
                        $scope.contestAttempt.currentQue = $scope.contestAttempt.queDetails[$scope.contestAttempt.currentIndex];
                        updateQuestionStatus($scope.contestAttempt.currentQue, 'inProgress');
                    }
                },
                function(err){
                    console.log(err);
                }
            );
        }

        init();
    }]);
}());
