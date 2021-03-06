/**
* @ngdoc function
* @name falcon.controller.AdminContestCtrl
* @description controller for Root model
* @author Ashish Mishra <ashishjpm@gmail.com>
*/

;
(function() {
 falcon
  .controller('AdminContestCtrl', ['$scope', 'CommonService', 'AdminService',
    function($scope, CommonService, AdminService) {
    $scope.adminContest = {};

    function init(){
    	$scope.root.admin.showAddBtn = true;
        $scope.root.adminSelected = "My Contest";
    	$scope.adminContest.type = ['All', 'Ongoing', 'Finished', 'Draft'];
    	$scope.adminContest.typeSelected = 'All';
        $scope.adminContest.list = [];
        updateAdminContestList();
    }

    function padding(digit, number){
        return (Array(digit+1).join("0")+number).slice(-digit);
    }

    function covertTimeToString(timeInMilliSeconds){
        var minutesInMilli =  60000;
        var hoursInMilli = minutesInMilli * 60;
        var daysInMilli = hoursInMilli * 24;
        var elapsedDays = timeInMilliSeconds / daysInMilli;
        timeInMilliSeconds = timeInMilliSeconds % daysInMilli;

        var elapsedHours = timeInMilliSeconds / hoursInMilli;
        timeInMilliSeconds = timeInMilliSeconds % hoursInMilli;

        var elapsedMinutes = timeInMilliSeconds / minutesInMilli;
        timeInMilliSeconds = timeInMilliSeconds % minutesInMilli;

        return padding(2, elapsedDays) + ":"
        + padding(2, elapsedHours) + ":"
        + padding(2, elapsedMinutes);
    }

    function updateAdminContestList(){
        AdminService.getContestList().then(
            function(response){
                $scope.adminContest.list = [];
                var now = new Date();
                response.data.responseObject.forEach(function(contest){
                    console.log(contest.startDate, contest.endDate);
                    $scope.adminContest.list.push({
                        name : contest.name,
                        status : $scope.adminContest.type[Math.floor(Math.random() * 4)],
                        participants : contest.participantCount,
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

    init();

  }]);
}());
