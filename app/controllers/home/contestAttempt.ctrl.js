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
        $scope.root.activeContestId = window.localStorage.getItem('contestId');
        $scope.contestAttempt = {};

        function init(){
            $scope.root.userSelected = "Ongoing Contest";
            $scope.contestAttempt.loader = false;
            $scope.contestAttempt.langData = [];
            $scope.contestAttempt.testCaseResults=[];
            $scope.contestAttempt.activeQuestion = {
            	'inProgress' : true,
            	'completed' : false,
            	'unAttempted' : false
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
                },
                function(err){console.log(err);}
            );
        }

        $scope.contestAttempt.updateQue = function(question, index){
            $scope.contestAttempt.currentQue = question;
            $scope.contestAttempt.currentIndex = index;
            $timeout(function() {
                $(document).ready(function(){
                    $.material.init();
                });
            }, 0);
        }

    	function getOngoingAttemptList(){
    		$scope.contestAttempt.list = [];
            console.log("contestId", $scope.root.user.activeContestId);
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
            UserService.finishContest(localStorage.getItem('userId'),localStorage.getItem('contestId')).then(
                function(response){},
                function(err){console.log(err);}
            );
            $state.go('home.contestList');
        }

        $scope.testCode = function(){
            $scope.contestAttempt.loader = true;
            console.log('userid', $scope.root.activeUser);
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
            var code = myCodeMirror.getValue();
            var language = $scope.contestAttempt.language;
            var questionId = $scope.contestAttempt.currentQue.questionId;
            var contestId = $scope.contestAttempt.currentQue.contestId;
            UserService.submitCode(userId, contestId, language, questionId, code).then(
                function (response) {
                    console.log(response);
                },
                function(err){
                    $scope.contestAttempt.loader = false;
                }
            )
        };

        $scope.submitOptions = function(){
            var reqBody = [{
                "contestId": 10001,
                "answerGiven": [$scope.contestAttempt.selectedSCQ[$scope.contestAttempt.currentQue.questionId]],
                "questionId": $scope.contestAttempt.currentQue.questionId,
                "timeTaken": 0,
                "marks": $scope.contestAttempt.currentQue.points,
                "negativeMarks": $scope.contestAttempt.currentQue.negativePoints,
                "questionType": "SINGLE_CORRECT"
            }]
            UserService.submitOptions(reqBody,$scope.contestAttempt.currentQue.questionId).then(
                function(response){
                    console.log("success");
                    $scope.contestAttempt.currentIndex = $scope.contestAttempt.currentIndex + 1;
                    $scope.contestAttempt.currentQue = $scope.contestAttempt.queDetails[$scope.contestAttempt.currentIndex];
                },
                function(err){

                }
            );
        }

        init();
    }]);
}());
