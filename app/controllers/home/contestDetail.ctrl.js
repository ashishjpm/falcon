/**
* @ngdoc function
* @name falcon.controller.ContestDetailCtrl
* @description controller for Root model
* @author Ashish Mishra <ashishjpm@gmail.com>
*/

;
(function() {
 falcon
    .controller('ContestDetailCtrl', ['$scope', '$state' ,'CommonService', 'UserService', '$stateParams',
    	function($scope, $state ,CommonService, UserService, $stateParams) {
        $scope.root.user.activeContestId = window.localStorage.getItem('contestId');
        $scope.contestDetail = {};
        $scope.contestDetail.isAttempted = window.localStorage.getItem('contestAttempted-'+$scope.root.user.activeContestId) == 'true';
        console.log('attemptContest ', $scope.contestDetail.isAttempted);
        console.log('attemptContest id', $scope.root.user.activeContestId);

        var isfalconUser = true;

    	function init(){
            $scope.root.userSelected = "Contest Details";
            $scope.contestDetail.title = "this is title";
            $scope.contestDetail.details = [];
            isfalconUser = !getParameterByName('squad_user', window.location.href);
            getContestDetail();
    	}

        function getParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        function getContestDetail(){
            if(isfalconUser){
                UserService.getContestDetail(localStorage.getItem('contestId')).then(
                    function(response){
                        $scope.contestDetail.details = response.data.responseObject;
                        $scope.contestDetail.details.startDate = CommonService.tsToDateString($scope.contestDetail.details.startDate);
                        $scope.contestDetail.details.endDate = CommonService.tsToDateString($scope.contestDetail.details.endDate);
                    },
                    function(err){
                        $scope.contestDetail.details = [];
                    }
                );
            }
            else {
                var details = $stateParams.userId;
                UserService.takeTest($stateParams.userId).then(
                    function(response){
                        $scope.contestDetail.details = response.data.responseObject;
                        $scope.contestDetail.details.startDate = CommonService.tsToDateString($scope.contestDetail.details.startDate);
                        $scope.contestDetail.details.endDate = CommonService.tsToDateString($scope.contestDetail.details.endDate);
                        window.localStorage.setItem('candidateId', $scope.contestDetail.details.inviteeDTOs[0].candidateId);
                        window.localStorage.setItem('contestId', $scope.contestDetail.details.id);
                        $scope.contestDetail.isAttempted = $scope.contestDetail.details.attempted;
                    },
                    function(err){
                        console.log(err);
                        swal("Error !!!", 'Unable to handle process request, Please try again later', "error");
                        $scope.contestDetail.details = [];
                        $state.go('home.contestList');
                    }
                );
            }

        }

        $scope.attemptContest = function(){
            UserService.attemptContest($stateParams.userId, window.localStorage.getItem('candidateId') window.localStorage.getItem('contestId').then(function(response){
                $state.go('home.contestAttempt');
            }, function(error){

            });
        }
        init();
    }]);
}());
