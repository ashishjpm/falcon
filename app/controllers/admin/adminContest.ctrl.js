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
    	$scope.adminContest.type = ['All', 'ACTIVE', 'COMPLETED', 'DRAFT'];
    	$scope.adminContest.typeSelected = 'All';
        $scope.adminContest.list = [];
        updateAdminContestList();
    }

    function padding(digit, number){
        return (Array(digit+1).join("0")+number).slice(-digit);
    }

    function covertTimeToString(state, start, end, now){
        console.log(new Date(start), new Date(end), new Date(now));
        var timeInMilliSeconds = 0;
        if('start' == state && start > now) {
            timeInMilliSeconds = start - now;
        }
        
        if('end' == 'state' && end > now && start < end){
            timeInMilliSeconds = end - now;
        }
        console.log(timeInMilliSeconds); 
        if(timeInMilliSeconds > 0){
            var minutesInMilli =  60000;
            var hoursInMilli = minutesInMilli * 60;
            var daysInMilli = hoursInMilli * 24;
            var elapsedDays = timeInMilliSeconds / daysInMilli;
            timeInMilliSeconds = timeInMilliSeconds % daysInMilli;

            var elapsedHours = timeInMilliSeconds / hoursInMilli;
            timeInMilliSeconds = timeInMilliSeconds % hoursInMilli;

            var elapsedMinutes = timeInMilliSeconds / minutesInMilli;
            timeInMilliSeconds = timeInMilliSeconds % minutesInMilli;

            return padding(2, elapsedDays) + " : "
            + padding(2, elapsedHours) + " : "
            + padding(2, elapsedMinutes);
        }
        return '';
    }

    function updateAdminContestList(){
        AdminService.getContestList().then(
            function(response){
                $scope.adminContest.list = [];
                var now = new Date();
                response.data.responseObject.forEach(function(contest){
                    $scope.adminContest.list.push({
                        name : contest.name,
                        participants : contest.participantCount,
                        status : (now.getTime() > contest.endDate) ? 'COMPLETED' : contest.status,
                        isActive : now.getTime() > contest.startDate && now.getTime() < contest.endDate,
                        startIn: covertTimeToString('start', contest.startDate, contest.endDate, now.getTime()),
                        endsIn : covertTimeToString('end', contest.endDate, contest.endDate, now.getTime())
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
