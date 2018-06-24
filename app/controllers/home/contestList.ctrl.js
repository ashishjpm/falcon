/**
* @ngdoc function
* @name falcon.controller.contestList
* @description controller for Root model
* @author Ashish Mishra <ashishjpm@gmail.com>
*/

;
(function() {
 falcon
    .controller('ContestListCtrl', ['$scope', '$state', 'CommonService', 'UserService',
    	function($scope, $state, CommonService, UserService) {
        $scope.root.activeUser = window.localStorage.getItem('userId');
    	$scope.contestList = {};

    	function init(){
    		$scope.root.userSelected = "My Contests";
            $scope.contestList.type = ['All', 'ACTIVE', 'COMPLETED'];
    		$scope.contestList.typeSelected = 'All';
    		$scope.contestList.list = [];
            updateUserContestList();
    	}

        function padding(digit, number){
            return (Array(digit+1).join("0")+number).slice(-digit);
        }

        function covertTimeToString(millis){
            var date = new Date(millis);
            return padding(2, Math.floor(date.getHours()/24)) + ":"
            + padding(2, Math.floor(date.getHours()%24)) + ":"
            + padding(2, Math.floor(date.getMinutes()));
        }

        function updateUserContestList(){
            UserService.getUserContestList($scope.root.activeUser).then(
                function(response){
                    $scope.contestList.list = [];
                    response.data.responseObject.forEach(function(contest){
                        var now = new Date();
                        $scope.contestList.list.push({
                            id : contest.id,
                            name : contest.name,
                            status : $scope.contestList.type[Math.floor(Math.random() * 4)],
                            description : contest.description,
                            isActive : now.getTime() > contest.startDate,
                            startIn: covertTimeToString(contest.startDate - now.getTime()),
                            endsIn : covertTimeToString(contest.endDate - now.getTime())
                        });
                    });
                },
                function(err){
                    console.log(err);
                }
            );
        }

        $scope.contestList.getDetails = function(item){
            $scope.root.user.activeContest = item;
            $scope.root.user.activeContestId = $scope.root.user.activeContest.id;
            window.localStorage.setItem('contestId', $scope.root.user.activeContestId);
            $state.go('home.contestDetail');
        }
      init();
    }]);
}());
